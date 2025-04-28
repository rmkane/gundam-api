<template>
  <DataGrid title="Gundam Pilots" :columnDefs="columnDefs" :rowData="pilotStore.pilots">
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
import SeriesCellRenderer from '../components/SeriesCellRenderer.vue'
import { usePilotStore } from '../stores/pilotStore'
import { useSeriesStore } from '../stores/seriesStore'

const pilotStore = usePilotStore()
const seriesStore = useSeriesStore()
const searchTerm = ref('')

const columnDefs = [
  { field: 'id', headerName: 'ID', minWidth: 120, maxWidth: 120 },
  { field: 'name', headerName: 'Name' },
  { field: 'codename', headerName: 'Codename' },
  { field: 'affiliation', headerName: 'Affiliation' },
  {
    field: 'seriesId',
    headerName: 'Series',
    cellRenderer: SeriesCellRenderer,
  },
]

const filterPilots = () => {
  // Implement filtering logic here
}

onMounted(async () => {
  // Fetch both pilots and series data
  await Promise.all([pilotStore.fetchPilots(), seriesStore.fetchSeries()])
})
</script>
