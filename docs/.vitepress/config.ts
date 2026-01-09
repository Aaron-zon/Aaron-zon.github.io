import { defineConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'

const nav: ThemeConfig['nav'] = [
  {
    text: '文章',
    link: '/blog/index'
  },
  {
    text: '工具',
    link: '/tools/to-base64'
  },
  {
    text: '笔记',
    items: [
      { text: 'javaScript', link: '/js/js-intro'},
      { text: 'java', link: '/java/java-type'},
      { text: 'vue3', link: '/vue3/change-efficiency' },
      { text: 'css', link: '/css/css-selector' },
      { text: 'webpack', link: '/webpack/webpack-intro' },
      { text: 'node', link: '/node/node-global'},
      { text: 'python', link: '/python/python-intro' },
      { text: 'docker', link: '/docker/docker-intro' },
      { text: 'ai 知识库', link: '/knowledgeBase/knowledgeBase-intro' },
      { text: 'linux', link: '/linux/linux-intro' },
      { text: 'nginx', link: '/nginx/nginx-intro' },
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/js/': [
    {
      text: 'JS基础',
      items: [
        { text: 'js 介绍', link: 'js/js-intro'},
        { text: '闭包', link: '/js/js-closure' },
        { text: '预编译', link: '/js/js-precompile' },
        { text: '事件循环', link: '/js/js-event-loop' },
        { text: '浏览器渲染过程', link: '/js/js-render-process' },
        // 原型原型链
        // this
        // 继承
        // 深拷贝/浅拷贝
        // 高阶函数
        // 柯里化
        // 防抖节流
        // Promise
        // async/await
        // 跨域
        // 排序
      ]
    },
    {
      text: '实际应用',
      items: [
        // 大数据量优化
        // 工程架构怎么做，技术选型怎么做
        // 如何做性能优化
        // 懒加载的实现
        // 网页从请求到渲染经历了什么
        // 跨域是什么，有哪些解决办法
        // 弹幕的实现与设计，怎么架构的
        // 弹幕库实现原理
        // 完整的购买流程
        // http和https的区别，s是什么，加密是怎么做的
      ]
    }
  ],
  '/java/': [
    {
      text: 'Java 基础',
      items: [
        { text: '数据类型', link: '/java/java-type' },
        { text: '类型转换', link: '/java/type-conversion'},
        { text: '异常处理', link: '/java/exception'},
        { text: '枚举', link: '/java/java-enum' },
        { text: '接口', link: '/java/java-interface' },
        { text: '注解', link: 'java/java-annotation'},
        { text: '注解解析', link: 'java/java-annotation-parse'},
        // 集合
        // 工具类
        // IO
        // 反射
        // 线程
        // JDBC
        // Stream
        // 正则表达式
        // 加密与安全
      ],
    },
    {
      text: 'Spring Cloud',
      items: [
        { text: '介绍', link: '/springCloud/spring-cloud-intro' },
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
        { text: 'python IO', link: '/python/python-io' },
        { text: 'python 异常处理', link: '/python/python-exception' },
        { text: 'python JSON', link: '/python/python-json' },
        { text: 'python 常用内置包', link: '/python/python-built-in-package' },
      ],
    },
    {
      text: '应用',
      items: [
        { text: 'pyenv-virtualenv虚拟环境', link: '/python/pyenv-virtualenv'},
        { text: 'pyenv 常用命令', link: '/python/pyenv-command'},
        { text: 'python conda', link: '/python/python-conda'}
      ]
    }
  ],
  '/docker/': [
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
        {text: 'cherryStudio知识库', link: '/knowledgeBase/cherryStudio-siliconflow'},
        {text: '搭建知识库（Java）', link: '/knowledgeBase/java-knowledgeBase'},
      ]
    }
  ],
  '/ai/': [
    {
      text: 'AI',
      items: [
        {text: 'AI 基础知识介绍', link: '/ai/ai-intro'},
      ]
    },
    {
      text: 'LnagChain',
      items: [
        {text: 'LangChain 介绍', link: '/ai/langchain-intro'},
      ]
    }
    // 本地文件 mcp
    // 邮件 mcp
    // Wikipedia MCP
    // 新闻 mcp
    // github mcp
    // b站 mcp
    // youtube mcp
    // tiktok mcp
    // 数据库 mcp
    // 日志 mcp
    // 运维 mcp
    // 天气 mcp
    // 影视剧 mcp
    // 音乐 mcp
    // api代理 mcp
    // rag mcp
    // 工作流 mcp

  ],
  '/linux/': [
    {
      text: 'Linux',
      items: [
        {text: 'Linux 介绍', link: '/linux/linux-intro'},
        {text: 'Linux 目录', link: '/linux/linux-directory'},
        {text: 'Linux 基本命令', link: '/linux/linux-command'},
        {text: 'Linux 下载安装软件', link: '/linux/linux-software'},
        {text: 'Linux 安装java和tomcat', link: '/linux/java-tomcat'},
        {text: 'Linux 关闭防火墙', link: '/linux/linux-firewall'},
        {text: 'Linux curl基本用法', link: '/linux/linux-curl'},
        {text: 'Linux 压缩和解压', link: '/linux/linux-zip'},
        {text: 'Linux scp传输', link: '/linux/linux-scp'},
        {text: 'Linux 定时任务', link: '/linux/linux-crontab'},
        {text: 'Linux 开机启动', link: '/linux/linux-boot'},
      ]
    },
    {
      text: 'Ubuntu',
      items: [
        {text: 'Ubuntu 换源', link: '/linux/ubuntu/ubuntu-source'},
        {text: 'Ubuntu 软件安装', link: '/linux/ubuntu/ubuntu-software'},
        {text: 'scp文件传输', link: '/linux/ubuntu/ubuntu-scp'},
        {text: '安装/使用 nginx', link: '/linux/ubuntu/ubuntu-nginx'},
        {text: '安装/使用 php', link: '/linux/ubuntu/ubuntu-php'},
      ]
    }
  ],
  '/nginx/': [
    {
      text: 'Nginx',
      items: [
        {text: 'Nginx 介绍', link: '/nginx/nginx-intro'},
        {text: 'Nginx 命令', link: '/nginx/nginx-command'},
        {text: 'Nginx 配置', link: '/nginx/nginx-config'},
        {text: 'Nginx 日志', link: '/nginx/nginx-logs'},
        {text: 'Nginx 反向代理', link: '/nginx/nginx-reverse-proxy'},
        {text: 'Nginx 负载均衡', link: '/nginx/nginx-load-balance'},
        {text: 'Nginx 动静分离', link: '/nginx/nginx-separation'},
        {text: 'Nginx location & rewrie', link: '/nginx/nginx-location-rewrite'},
      ]
    }
  ],
  '/redis/': [
    {
      text: 'Redis',
      items: [
        {text: 'Redis 介绍', link: 'redis/redis-intro'},

      ]
    }

  ],
  '/tools': [
    {
      text: '编码/解吗',
      items: [
        {text: 'Base64 编码/解码', link: '/tools/to-base64'},
        {text: 'URL 编码/解码', link: '/tools/to-url'},
        {text: 'MD5 编码/解码', link: '/tools/to-md5'},
        {text: 'JWT 编码/解码', link: '/tools/to-jwt'},
        {text: 'JSON 格式化', link: '/tools/json-format'},
        {text: '驼峰转换', link: '/tools/to-format-change'},
        // Oracle 转 Java实体类
        // Mysql 转 Java实体类
        // 二维码生成
        // 图片转SVG
        // 图片转Canvas
        // word转pdf
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
    search:{
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Aaron-zon/Aaron-zon.github.io' }
    ],
  }
})
