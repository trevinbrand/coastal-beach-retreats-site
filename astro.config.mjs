// @ts-check
import { defineConfig } from 'astro/config';
import { siteUrl } from './src/data/seo.js';

// https://astro.build/config
export default defineConfig({ site: siteUrl, trailingSlash: 'always' });
