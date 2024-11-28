import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import {join} from "path"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // pages: "build",
      // assets: "build",
      // fallback: undefined,
      // precompress: false,
      // strict: true
    })
  },
  paths: {
    base: ""
  },
  preprocess: vitePreprocess()
};
export default config;
