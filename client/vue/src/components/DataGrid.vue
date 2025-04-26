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
        :rowData="rowData"
        :defaultColDef="defaultColDef"
        :pagination="true"
        :paginationPageSize="10"
        :paginationPageSizeSelector="[10, 25, 50, 100]"
        :enableCellTextSelection="true"
        :rowSelection="rowSelectionConfig"
        :modules="modules"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  ClientSideRowModelModule,
  GridApi,
  ModuleRegistry,
  ColumnApi,
  GridReadyEvent,
  ColDef,
  GridOptions,
  ValidationModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule
} from 'ag-grid-community'

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule
])

const modules = [
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule
]

const props = defineProps<{
  title: string
  columnDefs: ColDef[]
  rowData: any[]
}>()

const gridApi = ref<GridApi | null>(null)
const columnApi = ref<ColumnApi | null>(null)

const defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  flex: 1
}

// Updated row selection configuration
const rowSelectionConfig = {
  type: 'single'
}

const onGridReady = (params: GridReadyEvent) => {
  console.log('Grid ready')
  gridApi.value = params.api
  columnApi.value = params.columnApi
}

// Watch for changes in rowData
watch(() => props.rowData, (newValue) => {
  console.log('Row data updated in grid:', newValue)
  if (gridApi.value && typeof gridApi.value.setRowData === 'function') {
    gridApi.value.setRowData(newValue)
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
