import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StorageOverview from '../../../../frontend/src/features/storage/StorageOverview.vue'

// Testdaten für unterschiedliche Regale und Belegungszustände
const locations = [
  { id: 1, code: 'A1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
  { id: 2, code: 'A1.2', maxCapacity: 10, occupiedPairs: 5, freeCapacity: 5 },
  { id: 3, code: 'A1.3', maxCapacity: 10, occupiedPairs: 10, freeCapacity: 0 },
  { id: 4, code: 'B1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
  { id: 5, code: 'C1.1', maxCapacity: 10, occupiedPairs: 0, freeCapacity: 10 },
]

describe('StorageOverview', () => {
  // Standardmäßig nur Regalfächer von Regal A anzeigen
  it('zeigt standardmäßig Regal A an', () => {
    const wrapper = mount(StorageOverview, {
      props: { locations },
    })

    expect(wrapper.findAll('.storage-slot')).toHaveLength(3)
    expect(wrapper.text()).toContain('A1.1')
    expect(wrapper.text()).not.toContain('B1.1')
    expect(wrapper.text()).not.toContain('C1.1')
  })

  // Wechsel zwischen den Regalen ermöglichen
  it('ermöglicht den Wechsel zwischen den Regalen', async () => {
    const wrapper = mount(StorageOverview, {
      props: { locations },
    })

    const tabs = wrapper.findAll('.storage-tabs button')

    await tabs[1].trigger('click')

    expect(wrapper.findAll('.storage-slot')).toHaveLength(1)
    expect(wrapper.text()).toContain('B1.1')
    expect(wrapper.text()).not.toContain('A1.1')
    expect(tabs[1].attributes('aria-selected')).toBe('true')

    await tabs[2].trigger('click')

    expect(wrapper.text()).toContain('C1.1')
    expect(wrapper.text()).not.toContain('B1.1')
    expect(tabs[2].attributes('aria-selected')).toBe('true')
  })

  // Gesamtkapazität des ausgewählten Regals berechnen
  it('zeigt die korrekte Regalkapazität an', () => {
    const wrapper = mount(StorageOverview, {
      props: { locations },
    })

    expect(wrapper.find('.storage-summary').text())
      .toContain('15 / 30 Slot(s) belegt')
  })

  // Leere, teilweise belegte und volle Regalfächer unterscheiden
  it('zeigt die unterschiedlichen Belegungszustände an', () => {
    const wrapper = mount(StorageOverview, {
      props: { locations },
    })

    expect(wrapper.find('.storage-slot--empty').exists()).toBe(true)
    expect(wrapper.find('.storage-slot--partial').exists()).toBe(true)
    expect(wrapper.find('.storage-slot--full').exists()).toBe(true)
  })

  // Regalfächer unabhängig von der Eingabereihenfolge sortieren
  it('sortiert die Regalfächer nach ihrem Code', () => {
    const wrapper = mount(StorageOverview, {
      props: { locations: [...locations].reverse() },
    })

    const codes = wrapper
      .findAll('.storage-slot-header strong')
      .map(element => element.text())

    expect(codes).toEqual(['A1.1', 'A1.2', 'A1.3'])
  })

  // Darstellung ohne vorhandene Lagerdaten ermöglichen
  it('kann eine leere Lagerortliste darstellen', () => {
    const wrapper = mount(StorageOverview, {
      props: { locations: [] },
    })

    expect(wrapper.findAll('.storage-slot')).toHaveLength(0)
    expect(wrapper.find('.storage-summary').text())
      .toContain('0 / 0 Slot(s) belegt')
  })
})