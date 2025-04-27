import { ref } from "vue";
import type { ApiResponse, Series } from "../types/gundam";

const seriesMap = ref<Map<number, string>>(new Map());
const isLoading = ref(false);
const error = ref<string | null>(null);
let fetchPromise: Promise<void> | null = null;

export function useSeries() {
  const fetchAllSeries = async () => {
    // If we already have data, return immediately
    if (seriesMap.value.size > 0) return;

    // If a fetch is already in progress, return that promise
    if (fetchPromise) return fetchPromise;

    isLoading.value = true;
    error.value = null;

    fetchPromise = (async () => {
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
        fetchPromise = null;
      }
    })();

    return fetchPromise;
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
