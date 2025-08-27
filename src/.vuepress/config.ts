import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Lzx's Blog",
  description: "一个屑的前端博客",

  theme,
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
