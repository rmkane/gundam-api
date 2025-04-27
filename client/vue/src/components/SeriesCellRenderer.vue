<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else>{{ seriesName }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSeries } from '../composables/useSeries'

const props = defineProps<{
  params: any
}>()

const { getSeriesName, fetchAllSeries, isLoading } = useSeries()
const seriesName = ref('')

const updateSeriesName = () => {
  seriesName.value = getSeriesName(props.params.value)
}

onMounted(async () => {
  await fetchAllSeries()
  updateSeriesName()
})

// Watch for changes in the series ID
watch(() => props.params.value, updateSeriesName)
</script> 
