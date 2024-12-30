import { defineConfig } from 'vitepress'

const nav = [
  // { text: 'Home', link: '/' },
  // { text: 'Examples', link: '/markdown-examples' },
  {
    text: '笔记',
    items: [
      { text: 'vue3', link: '/vue3' }
    ]
  }
]


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
