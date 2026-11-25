import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardView from '../../../../frontend/src/views/DashboardView.vue'

describe('DashboardView', () => {
  it('renders the application title', () => {
    // Arrange & Act
    const wrapper = mount(DashboardView)

    // Assert
    expect(wrapper.find('h1').text()).toBe('Schlittschuhverleih')
  })
})