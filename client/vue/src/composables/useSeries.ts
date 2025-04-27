import { ref } from "vue";
import type { ApiResponse, Series } from "../types/gundam";

const seriesMap = ref<Map<number, string>>(new Map());
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useSeries() {
  const fetchAllSeries = async () => {
    if (seriesMap.value.size > 0) return; // Already loaded

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series`);
      const result = (await response.json()) as ApiResponse<Series>;

      if (result.data && Array.isArray(result.data)) {
        result.data.forEach((series) => {
          seriesMap.value.set(series.id, series.name);
        });
      }
    } catch (err) {
      error.value = "Failed to fetch series data";
      console.error("Error fetching series:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const getSeriesName = (id: number): string => {
    return seriesMap.value.get(id) || "Unknown";
  };

  return {
    fetchAllSeries,
    getSeriesName,
    isLoading,
    error,
  };
}
