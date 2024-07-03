import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  shortcuts: [
    {
      logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180',
    },
  ],
});
