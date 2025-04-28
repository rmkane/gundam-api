import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

import type { Series } from '../types/gundam'

export const useSeriesStore = defineStore('series', () => {
  const series = ref<Series[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3001')

  // Initialize WebSocket connection
  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  // Listen for series creation
  socket.on('series:create', (newSeries: Series) => {
    series.value.push(newSeries)
  })

  // Listen for series updates
  socket.on('series:update', (updatedSeries: Series) => {
    console.log('Received series update event', updatedSeries)
    const index = series.value.findIndex((s) => s.id === updatedSeries.id)
    if (index !== -1) {
      console.log('Updating series inside store', updatedSeries)
      series.value.splice(index, 1, updatedSeries)
    }
  })

  // Listen for series deletion
  socket.on('series:delete', (deletedSeriesId: number) => {
    series.value = series.value.filter((s) => s.id !== deletedSeriesId)
  })

  const fetchSeries = async () => {
    if (series.value.length > 0) return // Already loaded

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series`)
      const result = await response.json()

      if (result.data && Array.isArray(result.data)) {
        series.value = result.data
      }
    } catch (err) {
      error.value = 'Failed to fetch series data'
      console.error('Error fetching series:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getSeriesById = (id: number): Series | undefined => {
    return series.value.find((s) => s.id === id)
  }

  return {
    series,
    isLoading,
    error,
    fetchSeries,
    getSeriesById,
  }
})
