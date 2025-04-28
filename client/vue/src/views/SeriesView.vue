<template>
  <DataGrid
    title="Gundam Series"
    :columnDefs="columnDefs"
    :rowData="seriesStore.series"
  >
    <template #filters>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search series..."
        @input="filterSeries"
      />
    </template>
  </DataGrid>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataGrid from '../components/DataGrid.vue'
import { useSeriesStore } from '../stores/seriesStore'

const seriesStore = useSeriesStore()
const searchTerm = ref('')

const columnDefs = [
  { field: 'id', headerName: 'ID', minWidth: 120, maxWidth: 120 },
  { field: 'name', headerName: 'Name' },
  { field: 'yearStart', headerName: 'Year Start' },
  { field: 'yearEnd', headerName: 'Year End' },
  { field: 'description', headerName: 'Description' }
]

const filterSeries = () => {
  // Implement filtering logic here
}

onMounted(async () => {
  await seriesStore.fetchSeries()
})
</script>
