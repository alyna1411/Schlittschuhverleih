// Zentrale Funktion für HTTP-Anfragen an REST-API
export async function apiRequest(endpoint) {
  // Anfrage ans Backend senden
  const response = await fetch(`/api${endpoint}`)

  // Fehlermeldungen des Backends auslesen
  if (!response.ok) {
    const error = await response.json().catch(() => null)

    throw new Error(
      error?.detail || `API-Anfrage fehlgeschlagen (HTTP ${response.status}).`
    )
  }

  // JSON-Antwort verarbeiten
  return response.json()
}