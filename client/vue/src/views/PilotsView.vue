<template>
  <DataGrid
    title="Gundam Pilots"
    :columnDefs="columnDefs"
    :rowData="pilots"
  >
    <template #filters>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search pilots..."
        @input="filterPilots"
      />
    </template>
  </DataGrid>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataGrid from '../components/DataGrid.vue'
import { Pilot, ApiResponse } from '../types/gundam'

const pilots = ref<Pilot[]>([])
const searchTerm = ref('')

const columnDefs = [
  { field: 'name', headerName: 'Name' },
  { field: 'codename', headerName: 'Codename' },
  { field: 'affiliation', headerName: 'Affiliation' },
  { field: 'seriesId', headerName: 'Series' }
]

const fetchPilots = async () => {
  try {
    console.log('Fetching pilots...')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/pilots`)
    const result = await response.json() as ApiResponse<Pilot>
    console.log('Received data:', result)
    if (result.data && Array.isArray(result.data)) {
      pilots.value = result.data
    } else {
      console.error('Invalid data format received:', result)
      pilots.value = []
    }
  } catch (error) {
    console.error('Error fetching pilots:', error)
    pilots.value = []
  }
}

const filterPilots = () => {
  // Implement filtering logic here
}

onMounted(() => {
  console.log('Component mounted')
  fetchPilots()
})
</script> 
