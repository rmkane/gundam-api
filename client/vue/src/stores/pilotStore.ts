import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

import type { Pilot } from '../types/gundam'

export const usePilotStore = defineStore('pilot', () => {
  const pilots = ref<Pilot[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3001')

  // Initialize WebSocket connection
  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  // Listen for pilot creation
  socket.on('pilot:create', (newPilot: Pilot) => {
    pilots.value.push(newPilot)
  })

  // Listen for pilot updates
  socket.on('pilot:update', (updatedPilot: Pilot) => {
    const index = pilots.value.findIndex((p) => p.id === updatedPilot.id)
    if (index !== -1) {
      pilots.value.splice(index, 1, updatedPilot)
    }
  })

  // Listen for pilot deletion
  socket.on('pilot:delete', (deletedPilotId: number) => {
    pilots.value = pilots.value.filter((p) => p.id !== deletedPilotId)
  })

  const fetchPilots = async () => {
    if (pilots.value.length > 0) return // Already loaded

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pilots`)
      const result = await response.json()

      if (result.data && Array.isArray(result.data)) {
        pilots.value = result.data
      }
    } catch (err) {
      error.value = 'Failed to fetch pilots data'
      console.error('Error fetching pilots:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getPilotById = (id: number): Pilot | undefined => {
    return pilots.value.find((p) => p.id === id)
  }

  return {
    pilots,
    isLoading,
    error,
    fetchPilots,
    getPilotById,
  }
})
