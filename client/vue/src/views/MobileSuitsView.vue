<template>
  <DataGrid
    title="Mobile Suits"
    :columnDefs="columnDefs"
    :rowData="mobileSuits"
  >
    <template #filters>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search mobile suits..."
        @input="filterMobileSuits"
      />
    </template>
  </DataGrid>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataGrid from '../components/DataGrid.vue'
import SeriesCellRenderer from '../components/SeriesCellRenderer.vue'
import { MobileSuit, ApiResponse } from '../types/gundam'

const mobileSuits = ref<MobileSuit[]>([])
const searchTerm = ref('')

const columnDefs = [
  { field: 'id', headerName: 'ID', minWidth: 120, maxWidth: 120 },
  { field: 'name', headerName: 'Name' },
  { field: 'modelNumber', headerName: 'Model Number' },
  { field: 'manufacturer', headerName: 'Manufacturer' },
  { field: 'height', headerName: 'Height', minWidth: 140, maxWidth: 140 },
  { field: 'weight', headerName: 'Weight', minWidth: 140, maxWidth: 140 },
  { field: 'armorMaterial', headerName: 'Armor Material' },
  { field: 'powerPlant', headerName: 'Power Plant' },
  { 
    field: 'seriesId', 
    headerName: 'Series',
    cellRenderer: SeriesCellRenderer
  }
]

const fetchMobileSuits = async () => {
  try {
    console.log('Fetching mobile suits...')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/mobile-suits`)
    const result = await response.json() as ApiResponse<MobileSuit>
    console.log('Received data:', result)
    if (result.data && Array.isArray(result.data)) {
      mobileSuits.value = result.data
    } else {
      console.error('Invalid data format received:', result)
      mobileSuits.value = []
    }
  } catch (error) {
    console.error('Error fetching mobile suits:', error)
    mobileSuits.value = []
  }
}

const filterMobileSuits = () => {
  // Implement filtering logic here
}

onMounted(() => {
  console.log('Component mounted')
  fetchMobileSuits()
})
</script> 
