// Mock service — replace with real API calls when backend is ready
import { residents } from '../data/residents'

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms))

export const residentService = {
  getAll: async (params = {}) => {
    await delay()
    let data = [...residents]
    if (params.search) {
      const q = params.search.toLowerCase()
      data = data.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.apartment.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      )
    }
    if (params.status) data = data.filter(r => r.status === params.status)
    return { data, total: data.length }
  },
  getById: async (id) => {
    await delay()
    return residents.find(r => r.id === id) || null
  },
  create: async (payload) => {
    await delay(600)
    return { ...payload, id: `RES-${Date.now()}`, createdAt: new Date().toISOString() }
  },
  update: async (id, payload) => {
    await delay(500)
    return { ...residents.find(r => r.id === id), ...payload }
  },
  delete: async (id) => {
    await delay(400)
    return { success: true, id }
  },
}
