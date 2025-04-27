<template>
  <span>{{ seriesName }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSeries } from '../composables/useSeries'

const props = defineProps<{
  params: any
}>()

const { getSeriesName, fetchAllSeries } = useSeries()
const seriesName = ref('')

onMounted(async () => {
  await fetchAllSeries()
  seriesName.value = getSeriesName(props.params.value)
})
</script> 
