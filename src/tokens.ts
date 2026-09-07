// Single source of truth for all visual constants — matched to the Claude mockup's design-system tokens.

export const palette = {
  accent:       '#5980A6',
  accentHover:  '#416180',
  text:         '#1D1F20',
  white:        '#FFFFFF',
  surfaceMuted: '#E9E9EA',
  border:       '#D4D4D7',
  navBg:        '#2B2B2D',
  navActiveBg:  '#EEF6FF',
  navActiveText: '#1D2D3D',
  zebra:        '#F5F5F8',
  pageBg:       '#F2F2F3',
} as const;

export const typography = {
  fontFamily: "-apple-system, 'Segoe UI', Roboto, sans-serif",
  sizeH1:     28,
  sizeH2:     20,
  sizeBody:   16,
  sizeSmall:  14,
  weightHeading: 600,
} as const;

// One border-radius value is used for every surface in the wireframe.
export const radius = {
  sm: 4,
} as const;

// Spacing scale in px — maps to MUI spacing multipliers at 4px base.
export const spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
} as const;

export const shadow = {
  toast: '0 2px 8px rgba(0,0,0,0.2)',
} as const;
