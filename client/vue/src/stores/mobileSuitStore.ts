import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

import type { MobileSuit } from '../types/gundam'

export const useMobileSuitStore = defineStore('mobileSuit', () => {
  const mobileSuits = ref<MobileSuit[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3001')

  // Initialize WebSocket connection
  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  // Listen for mobile suit creation
  socket.on('mobileSuit:create', (newMobileSuit: MobileSuit) => {
    mobileSuits.value.push(newMobileSuit)
  })

  // Listen for mobile suit updates
  socket.on('mobileSuit:update', (updatedMobileSuit: MobileSuit) => {
    const index = mobileSuits.value.findIndex((ms) => ms.id === updatedMobileSuit.id)
    if (index !== -1) {
      mobileSuits.value.splice(index, 1, updatedMobileSuit)
    }
  })

  // Listen for mobile suit deletion
  socket.on('mobileSuit:delete', (deletedMobileSuitId: number) => {
    mobileSuits.value = mobileSuits.value.filter((ms) => ms.id !== deletedMobileSuitId)
  })

  const fetchMobileSuits = async () => {
    if (mobileSuits.value.length > 0) return // Already loaded

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mobile-suits`)
      const result = await response.json()

      if (result.data && Array.isArray(result.data)) {
        mobileSuits.value = result.data
      }
    } catch (err) {
      error.value = 'Failed to fetch mobile suits data'
      console.error('Error fetching mobile suits:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getMobileSuitById = (id: number): MobileSuit | undefined => {
    return mobileSuits.value.find((ms) => ms.id === id)
  }

  return {
    mobileSuits,
    isLoading,
    error,
    fetchMobileSuits,
    getMobileSuitById,
  }
})
