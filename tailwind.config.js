/* eslint-disable @typescript-eslint/no-var-requires */
const { tailwindConfig } = require('@soichiro_nitta/tailwind-config')

module.exports = {
  future: tailwindConfig.future,
  plugins: [tailwindConfig.plugin],
  purge: tailwindConfig.purge,
  theme: {
    extend: {
      borderRadius: tailwindConfig.borderRadius,
      colors: {
        dark: '#424242',
        light: '#E5E4E5',
        medium: '#D3D3D3',
        primary: '#999EA4',
        'primary-translucence': 'rgba(69,112,221,.3)',
      },
      fill: tailwindConfig.fill,
      fontSize: tailwindConfig.fontSize,
      inset: tailwindConfig.inset,
      rotate: tailwindConfig.rotate,
      spacing: tailwindConfig.spacing,
      stroke: tailwindConfig.stroke,
    },
  },
  variants: {},
}
