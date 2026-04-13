import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { ScrapeResult } from "../types";
import { getFallbackData } from "../utils/datas";
import { chromiumUrl } from "../utils/const";

function normalizeToReviewUrl(rawUrl: string): string {
  try {
    const urlObj = new URL(rawUrl);

    let cleanPath = urlObj.pathname;

    if (cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    if (!cleanPath.endsWith("/review")) {
      cleanPath += "/review";
    }

    return `https://www.tokopedia.com${cleanPath}`;
  } catch (e) {
    return rawUrl;
  }
}

export async function scrapeTokopediaProduct(
  url: string,
): Promise<ScrapeResult> {
  const targetUrl = normalizeToReviewUrl(url);
  let browser;

  try {
    const isLocal =
      process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
      executablePath: isLocal
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : await chromium.executablePath(chromiumUrl),
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    );

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "font", "media"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    let allReviews: string[] = [];
    let rawProductName = "";
    const maxPages = 5;

    for (let i = 1; i <= maxPages; i++) {
      console.log(`📄 Scraping Halaman ${i}...`);

      await page
        .waitForSelector('[data-testid="lblItemUlasan"]', { timeout: 8000 })
        .catch(() => null);

      const pageData = await page.evaluate(() => {
        const titleEl = document.querySelector(
          '[data-testid="lblPDPDetailProductName"]',
        );
        const name = titleEl?.textContent || document.title;

        const reviewElements = document.querySelectorAll(
          '[data-testid="lblItemUlasan"]',
        );
        const reviews: string[] = [];

        reviewElements.forEach((el) => {
          const text = el.textContent?.trim();
          if (text && text.length > 15) {
            reviews.push(text.replace(/\n/g, " "));
          }
        });

        return { name, reviews };
      });

      if (i === 1) rawProductName = pageData.name;

      allReviews.push(...pageData.reviews);

      const nextBtn = await page.$('button[aria-label^="Laman berikutnya"]');
      if (nextBtn && i < maxPages) {
        await nextBtn.click();
        await new Promise((r) => setTimeout(r, 2000));
      } else {
        break;
      }
    }

    await browser.close();

    if (allReviews.length === 0) return getFallbackData(url);

    const finalName = cleanProductNameLogic(rawProductName);

    return {
      name: finalName,
      url: url,
      reviews: Array.from(new Set(allReviews)).slice(0, 50),
    };
  } catch (error) {
    if (browser) await browser.close();
    console.error("Scraping Error:", error);
    return getFallbackData(url);
  }
}

function cleanProductNameLogic(name: string): string {
  if (!name) return "Unknown Product";
  let cleaned = name
    .replace(
      /^(Review|Jual|Promo|Flash Sale|Hot Item|Baru|PROMO|READY|TERLARIS)\s+/i,
      "",
    )
    .replace(/^Laptop\s+/i, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .trim();

  const specWallRegex =
    /\b(i[3579]\b|ryzen|celeron|athlon|intel|amd|4gb|8gb|16gb|32gb|512gb|1tb|ssd|rtx|gtx|oled|fhd|w10|w11)\b/i;
  const splitName = cleaned.split(specWallRegex);
  let finalName = splitName[0].trim().replace(/[-|,|\/]+\s*$/, "");

  return finalName.length < 5 ? cleaned.substring(0, 35) : finalName;
}
