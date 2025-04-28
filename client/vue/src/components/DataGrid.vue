<template>
  <div class="data-grid">
    <div class="grid-header">
      <h2>{{ title }}</h2>
      <div class="filters">
        <slot name="filters"></slot>
      </div>
    </div>
    <div class="grid-container">
      <AgGridVue
        class="ag-theme-quartz"
        style="height: 600px; width: 100%"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :enableCellTextSelection="true"
        :modules="modules"
        :pagination="true"
        :paginationPageSize="10"
        :paginationPageSizeSelector="[10, 25, 50, 100]"
        :rowData="rowData"
        :rowSelection="'single'"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  ClientSideRowModelModule,
  ColDef,
  ColumnApi,
  CustomFilterModule,
  DateFilterModule,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  ValidationModule,
} from 'ag-grid-community'

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CustomFilterModule,
  DateFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  ValidationModule,
])

const modules = [
  ClientSideRowModelModule,
  CustomFilterModule,
  DateFilterModule,
  NumberFilterModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  ValidationModule,
]

const props = defineProps<{
  columnDefs: ColDef[]
  rowData: any[]
  title: string
}>()

const gridApi = ref<GridApi | null>(null)
const columnApi = ref<ColumnApi | null>(null)

const defaultColDef: ColDef = {
  filter: true,
  flex: 1,
  floatingFilter: true,
  resizable: true,
  sortable: true,
}

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
  columnApi.value = params.columnApi
}

// Watch for changes in rowData
watch(() => props.rowData, (newValue, oldValue) => {
  if (!gridApi.value) return

  // If it's the initial load, set the data
  if (!oldValue || oldValue.length === 0) {
    gridApi.value.setGridOption('rowData', newValue)
    return
  }

  // Find added, updated, and removed items
  const added = newValue.filter(item => !oldValue.find(old => old.id === item.id))
  const removed = oldValue.filter(item => !newValue.find(newItem => newItem.id === item.id))
  const updated = newValue.filter(item => {
    const oldItem = oldValue.find(old => old.id === item.id)
    return oldItem && JSON.stringify(oldItem) !== JSON.stringify(item)
  })

  // Apply transactions
  if (added.length > 0) {
    gridApi.value.applyTransaction({ add: added })
  }
  if (removed.length > 0) {
    gridApi.value.applyTransaction({ remove: removed })
  }
  if (updated.length > 0) {
    gridApi.value.applyTransaction({ update: updated })
  }
}, { deep: true })

// Expose grid API to parent components
defineExpose({
  getGridApi: () => gridApi.value,
  getColumnApi: () => columnApi.value
})
</script>

<style scoped>
.data-grid {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.grid-header h2 {
  color: #fff;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
}

.grid-container {
  flex: 1;
  width: 100%;
  min-height: 0;
}

:deep(.ag-theme-quartz) {
  width: 100%;
  height: 100%;
  --ag-background-color: #1a1a1a;
  --ag-header-background-color: #2c2c2c;
  --ag-odd-row-background-color: #1a1a1a;
  --ag-row-border-color: #333;
  --ag-header-foreground-color: #fff;
  --ag-foreground-color: #fff;
  --ag-row-hover-color: #2c2c2c;
  --ag-selected-row-background-color: #2c2c2c;
  --ag-input-focus-border-color: #42b983;
  --ag-range-selection-border-color: #42b983;
  --ag-checkbox-checked-color: #42b983;
  --ag-checkbox-unchecked-color: #666;
  --ag-checkbox-background-color: #1a1a1a;
  --ag-input-disabled-background-color: #2c2c2c;
  --ag-disabled-foreground-color: #666;
  --ag-font-size: 14px;
  --ag-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style> 
