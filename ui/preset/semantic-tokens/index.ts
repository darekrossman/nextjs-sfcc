import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      canvas: { value: '{colors.stone.50}' }, // Main app background
      surface: { value: '{colors.stone.100}' }, // Default surface (cards, panels)
      elevated: { value: '{colors.stone.200}' }, // Elevated surfaces (dropdowns, popovers)
      overlay: { value: '{colors.stone.300}' }, // Modal overlays, backdrops

      // Interactive states
      hover: { value: '{colors.stone.500}' }, // Hover backgrounds
      pressed: { value: '{colors.stone.500}' }, // Active/pressed state
      selected: { value: '{colors.stone.500}' }, // Selected items

      // Special contexts
      inset: { value: '{colors.stone.600}' }, // Recessed areas, wells
      accent: { value: '{colors.stone.700}' }, // Accent backgrounds
    },
  },
  borders: {
    base: { value: '1px solid {colors.neutral.200}' },
    input: { value: '1px solid {colors.neutral.300}' },
    destructive: { value: '1px solid {colors.red.500}' },
  },
  radii: {
    xl: { value: 'calc({radii.radius} + 4px)' },
    lg: { value: '{radii.radius}' },
    md: { value: 'calc({radii.radius} - 2px)' },
    sm: { value: 'calc({radii.radius} - 4px)' },
  },
  animations: {
    'accordion-down': { value: 'accordion-down 0.2s ease-out' },
    'accordion-up': { value: 'accordion-up 0.2s ease-out' },
  },
})
