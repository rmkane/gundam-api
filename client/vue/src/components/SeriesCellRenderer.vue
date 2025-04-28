<template>
  <span v-if="seriesStore.isLoading">Loading...</span>
  <span v-else>{{ seriesName }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { useSeriesStore } from '../stores/seriesStore'

interface CellRendererParams {
  value: number
}

const props = defineProps<{
  params: CellRendererParams
}>()

const seriesStore = useSeriesStore()
const seriesName = ref('')

const updateSeriesName = () => {
  const series = seriesStore.getSeriesById(props.params.value)
  seriesName.value = series?.name || 'Unknown'
}

onMounted(() => {
  updateSeriesName()
})

// Watch for changes in the series ID
watch(() => props.params.value, updateSeriesName)
</script>
