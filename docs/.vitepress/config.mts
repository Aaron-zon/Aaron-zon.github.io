import { defineConfig } from 'vitepress'

import type { Config as ThemeConfig } from '@vue/theme'

const nav: ThemeConfig['nav'] = [
  // { text: 'Home', link: '/' },
  // { text: 'Examples', link: '/markdown-examples' },
  {
    text: '笔记',
    items: [
      { text: 'vue3', link: '/vue3/index' }
    ]
  }
]

export const sidebar = {
  '/vue3/': [
    {
      text: '开始',
      items: [
        { text: '简介', link: '/vue3/introduction' }
      ]
    }
  ]
}


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Blog",
  description: "我的博客和文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
