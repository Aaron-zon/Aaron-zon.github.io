import { defineConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'

const nav: ThemeConfig['nav'] = [
  {
    text: '文章',
    link: '/blog/index'
  },
  {
    text: '笔记',
    items: [
      { text: 'javaScript', link: '/js/js-intro'},
      { text: 'vue3', link: '/vue3/change-efficiency' },
      { text: 'css', link: '/css/css-selector' },
      { text: 'webpack', link: '/webpack/webpack-intro' },
      { text: 'node', link: '/node/node-global'},
      { text: 'python', link: '/python/python-intro' },
      // { text: 'docker', link: '/docker/docker-intro' },
      { text: 'docker', link: '/docker/docker-intro' },

      { text: 'ai 知识库', link: '/knowledgeBase/knowledgeBase-intro' },
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/js/': [
    {
      text: 'JS',
      items: [
        { text: 'js 介绍', link: 'js/js-intro'},
        { text: '事件循环', link: '/js/js-event-loop' },
        { text: '预编译', link: '/js/js-precompile' }
      ]
    }
  ],
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
      text: 'Vue 文件编译',
      items: [
        { text: 'Vue 文件编译成 JS 文件', link: '/vue3/vue-file-compile' },
      ]
    },
    {
      text: '模板编译 Template',
      items: [
        { text: 'baseCompile 函数', link: '/vue3/base-compile' }
      ]
    },
    {
      text: '响应式原理',
      items: [
        { text: 'MVVM 和 MVC', link: '/vue3/reactive-mvvm-mvc' },
        { text: '响应式原理', link: '/vue3/reactive-principle' },
        // 订阅者 Dep
        // 观察者 Watcher
        // { text: '响应式实现', link: '/vue3/reactive-implement' },
      ]
    },
    {
      text: '虚拟DOM算法',
      items: [
        { text: '什么是虚拟 DOM', link: '/vue3/virtual-dom' },
        { text: 'diff 算法', link: '/vue3/diff' }
      ]
    },
    // {
    //   text: '组件渲染与更新',
    //   items: []
    // },
    // {
    //   text: '异步更新',
    //   items: []
    // }
    // {
    //   text: 'Template 部分',
    //   items: [
    //   ]
    // }
    // Script
    // Style
  ],
  'React': [
    {
      text: '概览',
      items: [
        { text: 'React 介绍', link: '/react/react-intro' }
      ]
    }
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
  '/webpack/': [
    {
      text: 'webpack',
      items: [
        { text: 'webpack 介绍', link: '/webpack/webpack-intro'},
        { text: '配置文件', link: '/webpack/webpack-config'},
        { text: '编译过程', link: '/webpack/webpack-process'},
        { text: '入口和出口', link: '/webpack/webpack-entry-and-output'},
      ]
    }
  ],
  '/node/': [
    {
      text: '基础',
      items: [
        { text: 'node 全局对象', link: '/node/node-global' },
        { text: '基本内置模块', link: '/node/node-modules'},
        { text: 'i/o', link: '/node/node-io' },
        // io
        // net
        // http
        // https
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
        { text: 'python 模块化', link: '/python/python-modules' },
        { text: 'python IO', link: '/python/python-' },
        { text: 'python 异常处理', link: '/python/python-' },
        { text: 'python JSON', link: '/python/python-' },
        { text: 'python 常用内置包', link: '/python/python-' },
      ],
    }
  ],
  '/docker2/': [
    {
      text: 'Docker 基础',
      items: [
        {text: 'docker 介绍', link: '/docker/docker-intro'},
        {text: 'docker 安装', link: '/docker/docker-install'},
      ]
    }
  ],
  '/knowledgeBase/': [
    {
      text: 'AI 知识库',
      items: [
        {text: '介绍', link: '/knowledgeBase/knowledgeBase-intro'},
        {text: '搭建AI知识库', link: '/knowledgeBase/cherryStudio-siliconflow'},
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
