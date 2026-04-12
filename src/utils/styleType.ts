const variantStyles = {
  default: "bg-card border-border",
  positive: "bg-sentiment-positive-light border-sentiment-positive/20",
  negative: "bg-sentiment-negative-light border-sentiment-negative/20",
  neutral: "bg-sentiment-neutral-light border-sentiment-neutral/20",
};

const iconStyles = (isDark: boolean) => {
  return {
    default: `bg-primary/10 text-primary ${isDark ? "text-white" : "text-neutral"} ${isDark ? "bg-gray-900" : "bg-primary/10"}`,
    positive: "bg-sentiment-positive/10 text-sentiment-positive",
    negative: "bg-sentiment-negative/10 text-sentiment-negative",
    neutral: "bg-sentiment-neutral/10 text-sentiment-neutral",
  };
};

export { variantStyles, iconStyles };
