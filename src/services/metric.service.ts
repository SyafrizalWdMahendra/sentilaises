import { userMetricPath } from "../utils/const";

export const getMetricId = async () => {
  const response = await fetch(userMetricPath);
  if (!response.ok) return null;

  const data = await response.json();
  return data.metricId;
};
