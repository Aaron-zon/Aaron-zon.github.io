import { defineConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'

const nav: ThemeConfig['nav'] = [
  {
    text: '笔记',
    items: [
      { text: 'vue3', link: '/vue3/change-efficiency' },
      { text: 'css', link: '/css3/css-selector' }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/vue3/': [
    {
      text: '重大改变',
      items: [
        { text: '效率提升', link: '/vue3/change-efficiency' },
        { text: 'API和数据响应式的变化', link: '/vue3/change-api-and-reactivity' },
        { text: '从 Webpack 到 Vite', link: '/vue3/change-webpack-to-vite' },
      ]
    },
    {
      text: 'Vue3 源码分析',
      items: [
        { text: 'Vue 文件编译', link: '/vue3/vue-file-compile' }
      ]
    },
    {
      text: 'Template 部分',
      items: [
        { text: 'baseCompile 函数', link: '/vue3/base-compile' }
      ]
    }

    // Script
    // Style
  ],
  '/css3/': [
    {
      text: 'CSS',
      items: [
        { text: 'CSS 选择器', link: '/css3/css-selector' },
        { text: 'CSS 引入方式', link: '/css3/css-import' },
        { text: 'CSS 常用样式与单位', link: '/css3/css-base-style'},
        { text: 'CSS 可继承样式', link: '/css3/css-extends-style'},
      ]
    },
    {
      text: 'CSS3',
      items: [
        { text: 'css 和 css3 的关系', link: '/css3/css-and-css3' },
        { text: '预处理器和后处理器', link: '/css3/preprocessor-and-postprocessor'},
        { text: 'css3 选择器', link: '/css3/css3-selector' },
        // 背景
        // 边框
        // box
        // text
        // 预处理器和后处理器
        // 网格布局
        // 盒模型
        // 动画
      ]
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Blog",
  description: "我的博客和文档",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
