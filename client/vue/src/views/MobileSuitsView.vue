<template>
  <DataGrid
    title="Mobile Suits"
    :columnDefs="columnDefs"
    :rowData="mobileSuitStore.mobileSuits"
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
import { useMobileSuitStore } from '../stores/mobileSuitStore'
import { useSeriesStore } from '../stores/seriesStore'

const mobileSuitStore = useMobileSuitStore()
const seriesStore = useSeriesStore()
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

const filterMobileSuits = () => {
  // Implement filtering logic here
}

onMounted(async () => {
  await Promise.all([
    mobileSuitStore.fetchMobileSuits(),
    seriesStore.fetchSeries()
  ])
})
</script> 
