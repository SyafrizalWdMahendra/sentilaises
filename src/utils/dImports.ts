import dynamic from "next/dynamic";

const TrendChart = dynamic(
  () =>
    import("../components/dashboards/TrendChart").then((mod) => ({
      default: mod.TrendChart,
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

export { TrendChart, SentimentChart };
