import dynamic from "next/dynamic";

const TrendChart = dynamic(
  () =>
    import("../components/dashboards/TrendChart").then((mod) => ({
      default: mod.TrendChart,
    })),
  { ssr: false },
);
const WordCloud = dynamic(
  () =>
    import("../components/dashboards/WordCloud").then((mod) => ({
      default: mod.WordCloud,
    })),
  { ssr: false },
);
const SentimentChart = dynamic(
  () =>
    import("../components/dashboards/SentimentChart").then((mod) => ({
      default: mod.SentimentChart,
    })),
  { ssr: false },
);

export { TrendChart, WordCloud, SentimentChart };
