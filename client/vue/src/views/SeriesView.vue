<template>
  <DataGrid
    title="Gundam Series"
    :columnDefs="columnDefs"
    :rowData="series"
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
import { Series, ApiResponse } from '../types/gundam'

const series = ref<Series[]>([])
const searchTerm = ref('')

const columnDefs = [
  { field: 'id', headerName: 'ID', minWidth: 120, maxWidth: 120 },
  { field: 'name', headerName: 'Name' },
  { field: 'yearStart', headerName: 'Year Start' },
  { field: 'yearEnd', headerName: 'Year End' },
  { field: 'description', headerName: 'Description' }
]

const fetchSeries = async () => {
  try {
    console.log('Fetching series...')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/series`)
    const result = await response.json() as ApiResponse<Series>
    console.log('Received data:', result)
    if (result.data && Array.isArray(result.data)) {
      series.value = result.data
    } else {
      console.error('Invalid data format received:', result)
      series.value = []
    }
  } catch (error) {
    console.error('Error fetching series:', error)
    series.value = []
  }
}

const filterSeries = () => {
  // Implement filtering logic here
}

onMounted(() => {
  console.log('Component mounted')
  fetchSeries()
})
</script>
