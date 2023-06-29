import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  integrations: [
    tailwind({
      // Example: Provide a custom path to a Tailwind config file
      configFile: './src/styles/config/tailwind.config.cjs',
    }),
  ]
});