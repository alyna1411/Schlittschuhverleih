import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastNotification from '../../../../frontend/src/components/ui/ToastNotification.vue'

describe('ToastNotification', () => {
  // Ohne Fehlermeldung keine Benachrichtigung anzeigen
  it('zeigt ohne Nachricht keinen Toast an', () => {
    const wrapper = mount(ToastNotification)

    expect(wrapper.find('.toast-notification').exists()).toBe(false)
  })

  // Fehlermeldung mit Überschrift und Fehlerstatus darstellen
  it('zeigt eine Fehlermeldung korrekt an', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        message: 'API-Anfrage fehlgeschlagen (HTTP 502).',
      },
    })

    expect(wrapper.find('.toast-notification').exists()).toBe(true)
    expect(wrapper.find('.toast-error').exists()).toBe(true)
    expect(wrapper.find('.toast-icon').text()).toBe('!')
    expect(wrapper.find('.toast-content strong').text()).toBe('Hinweis')
    expect(wrapper.find('.toast-content p').text())
      .toBe('API-Anfrage fehlgeschlagen (HTTP 502).')
  })

  // Schließen der Benachrichtigung an die Elternkomponente melden
  it('sendet beim Schließen ein close-Event', async () => {
    const wrapper = mount(ToastNotification, {
      props: {
        message: 'Testfehlermeldung',
      },
    })

    await wrapper.find('.toast-close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  // Benachrichtigung nach dem Zurücksetzen der Nachricht ausblenden
  it('blendet den Toast nach dem Zurücksetzen der Nachricht aus', async () => {
    const wrapper = mount(ToastNotification, {
      props: {
        message: 'Testfehlermeldung',
      },
    })

    await wrapper.setProps({ message: '' })

    expect(wrapper.find('.toast-notification').exists()).toBe(false)
  })
})