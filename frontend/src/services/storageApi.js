import { apiRequest } from './httpClient'

// Alle Regalfächer mit Belegung und freier Kapazität abrufen
export function getAllStorageLocations() {
  return apiRequest('/storage')
}