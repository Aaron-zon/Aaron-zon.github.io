import { defineConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'

const nav: ThemeConfig['nav'] = [
  {
    text: '笔记',
    items: [
      { text: 'vue3', link: '/vue3/change-efficiency' },
      { text: 'css', link: '/css/css-selector' },
      { text: 'python', link: '/python/python-intro' },
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
  '/css/': [
    {
      text: 'CSS',
      items: [
        { text: 'CSS 选择器', link: '/css/css-selector' },
        { text: 'CSS 引入方式', link: '/css/css-import' },
        { text: 'CSS 常用样式与单位', link: '/css/css-base-style'},
        { text: 'CSS 可继承样式', link: '/css/css-extends-style'},
      ]
    },
    {
      text: 'CSS3',
      items: [
        { text: 'CSS 和 CSS3 的关系', link: '/css/css-and-css3' },
        { text: '预处理器和后处理器', link: '/css/preprocessor-and-postprocessor'},
        { text: 'CSS3 选择器', link: '/css/css3-selector' },
        { text: '盒模型', link: '/css/css3-box' },
        { text: 'Flex 布局', link: '/css/css3-flex' },
        { text: 'background', link: '/css/css3-background' },
        { text: 'border', link: '/css/css3-border' },
        // text
        // 网格布局
        // 动画
      ]
    }
  ],
  '/python/': [
    {
      text: 'Python 基础',
      items: [
        { text: 'python 介绍', link: '/python/python-intro' },
        { text: 'python 安装', link: '/python/python-install' },
        { text: 'python 数据类型', link: '/python/python-data-type' },
        { text: 'python 流程控制', link: '/python/python-control' },
        { text: 'python 正则', link: '/python/python-reg-exp' },
        { text: 'python 模块化', link: '/python/python-' },
        { text: 'python IO', link: '/python/python-' },
        { text: 'python 异常处理', link: '/python/python-' },
        { text: 'python JSON', link: '/python/python-' },
        { text: 'python 常用内置包', link: '/python/python-' },
      ],
    }
  ],
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
