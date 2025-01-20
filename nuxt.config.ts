// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";


export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, "/"),
  },

  css: ["~/assets/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-01-18",
  modules: ["@ant-design-vue/nuxt"],
});