export const getMetricId = async () => {
  const response = await fetch("/api/user-metric");
  if (!response.ok) return null;

  const data = await response.json();
  return data.metricId; 
};
