import puppeteer from "puppeteer";
import { ScrapeResult } from "../types";
import { getFallbackData } from "../utils/datas";

export async function scrapeTokopediaProduct(
  url: string,
): Promise<ScrapeResult> {
  const targetUrl = normalizeToReviewUrl(url);

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1366,768",
      ],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    );
    await page.setViewport({ width: 1366, height: 768 });

    console.log(`🚀 Scraping URL: ${url}`);

    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 150;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= 2500) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    await new Promise((r) => setTimeout(r, 3000));

    const scrapedData = await page.evaluate(() => {
      const titleEl = document.querySelector(
        '[data-testid="lblPDPDetailProductName"]',
      );
      let rawName = titleEl ? titleEl.textContent || "" : document.title;

      const cleanProductName = (name: string) => {
        let cleaned = name
          .replace(
            /^(Review|Jual|Promo|Flash Sale|Hot Item|Baru|PROMO)\s+/i,
            "",
          )
          .replace(/^Laptop\s+/i, "")
          .replace(/\(.*?\)/g, "")
          .replace(/\[.*?\]/g, "")
          .trim();

        const specWallRegex =
          /\b(i[3579]\b|ryzen|celeron|athlon|atom|intel|amd|n\d{4}|z\d{4}|4gb|8gb|12gb|16gb|24gb|32gb|64gb|128gb|256gb|512gb|1tb|2tb|ssd|hdd|emmc|w10|w11|win10|win11|windows|dos|no os|linux|ubuntu|11"|13"|14"|14\.0|15"|15\.6|16"|fhd|hd|qhd|uhd|4k|oled|ips|tn|hz|resmi|garansi|murah)\b/i;

        const splitName = cleaned.split(specWallRegex);

        let finalName = splitName[0].trim();

        finalName = finalName.replace(/[-|,|\/]+\s*$/, "").trim();

        return finalName;
      };

      const productName = cleanProductName(rawName);

      const elements = document.querySelectorAll("div, span, p");
      const uniqueReviews = new Set<string>();

      elements.forEach((el) => {
        const text = el.textContent || "";

        if (text.length > 40 && text.length < 1000) {
          if (el.children.length === 0) {
            const cleanText = text.trim().replace(/\n/g, " ");

            const isJunk =
              cleanText.includes("Lihat Balasan") ||
              cleanText.includes("Membantu") ||
              cleanText.includes("Laporkan") ||
              cleanText.includes("Tokopedia") ||
              cleanText.includes("Promo") ||
              cleanText.includes("Diskusi");

            if (!isJunk) {
              uniqueReviews.add(cleanText);
            }
          }
        }
      });

      return {
        productName,
        reviews: Array.from(uniqueReviews).slice(0, 15),
      };
    });

    await browser.close();

    if (scrapedData.reviews.length === 0) {
      console.warn("⚠️ Tidak ada ulasan terdeteksi. Menggunakan Fallback.");
      return getFallbackData(url);
    }

    return {
      name: scrapedData.productName,
      url: url,
      reviews: scrapedData.reviews,
    };
  } catch (error: any) {
    if (browser) await browser.close();
    return getFallbackData(url);
  }
}

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
