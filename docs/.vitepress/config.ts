import { defineConfig } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// 站点对外地址（GitHub Pages）
const siteUrl = 'https://aaron-zon.github.io'

// 递归收集 dist 下所有 .html 文件（排除 index.html 和 404.html）
function collectHtmlFiles(dir: string, base: string, list: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      collectHtmlFiles(full, base, list)
    } else if (name.endsWith('.html') && name !== '404.html' && name !== 'index.html') {
      list.push(full.slice(base.length + 1).replace(/\\/g, '/'))
    }
  }
  return list
}

// 构建结束时生成 sitemap.xml
function generateSitemap(outDir: string) {
  const files = collectHtmlFiles(outDir, outDir)
  const urls = files
    .map((f) => `  <url>\n    <loc>${siteUrl}/${f}</loc>\n  </url>`)
    .join('\n')
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '\n</urlset>\n'
  writeFileSync(join(outDir, 'sitemap.xml'), xml)
}

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
    text: '后端',
    items: [
      { text: 'Java', link: '/java/java-type'},
      { text: 'Node', link: '/node/node-global'},
      { text: 'Python', link: '/python/python-intro' },
      { text: 'Dart', link: '/dart/dart-intro' },
      { text: 'Docker', link: '/docker/docker-intro' },
      { text: 'Linux', link: '/linux/linux-intro' },
      { text: 'Nginx', link: '/nginx/nginx-intro' },
      { text: 'Redis', link: '/redis/redis-intro' },
      { text: 'RabbitMQ', link: '/rabbitMQ/rabbitmq-intro' },

    ]
  },
  {
    text: '前端',
    items: [
      { text: 'JavaScript', link: '/js/js-intro'},
      { text: 'Css', link: '/css/css-selector' },
      { text: 'Vue3', link: '/vue3/change-efficiency' },
      { text: 'React', link: '/react/react-intro' },
      { text: 'ReactNative', link: '/reactNative/intro' },
      { text: 'Webpack', link: '/webpack/webpack-intro' },
      { text: 'Nuxt', link: '/nuxt/nuxt-intro' },
    ]
  },
  {
    text: 'AI',
    items: [
      { text: 'AI', link: '/ai/ai-intro' },
      { text: 'langChain', link: '/langChain/langchain-env' },
      // { text: 'Gradle', link: '/gradle/' },
      // { text: 'QA', link: '/qa/vue' },
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
  '/dart/': [
    {
      text: 'dart基础',
      items: [
        { text: 'dart 介绍', link: '/dart/dart-intro'},
        { text: 'dart 数据类型', link: '/dart/dart-type' },
        { text: 'dart 类型转换', link: '/dart/dart-type-conversion' },
        { text: 'dart 流程控制', link: '/dart/dart-flow-control' },
        { text: 'dart 异常处理', link: '/dart/dart-exception' },
      ]
    }
  ],
  '/nuxt/': [
    {
      text: '基础',
      items: [
        { text: 'Nuxt 介绍', link: '/nuxt/nuxt-intro' },
      ]
    }
  ],
  '/java/': [
    {
      text: 'Java 基础',
      items: [
        { text: '数据类型', link: '/java/java-type' },
        { text: '类型转换', link: '/java/type-conversion'},
        { text: '集合', link: '/java/java-collection' },
        { text: '工具类', link: '/java/java-util' },
        { text: '异常处理', link: '/java/exception'},
        { text: '枚举', link: '/java/java-enum' },
        { text: '接口', link: '/java/java-interface' },
        { text: '注解', link: 'java/java-annotation'},
        { text: '注解解析', link: 'java/java-annotation-parse'},
        { text: '反射', link: '/java/java-reflection' },
        { text: 'IO', link: '/java/java-io' },
        { text: '线程', link: '/java/java-thread' },
        { text: '正则表达式', link: '/java/java-regex' },
      ],
    },
    {
      text: '应用',
      items: [
        { text: '正则的常用方法', link: '/java/useJava/java-regex-method' },
        { text: 'ArragList 常用方法', link: 'java/useJava/java-arraylist-method' },
        { text: 'IO 常用方法', link: 'java/useJava/java-io-method' }
        // Spring Boot  自动装配原理
        // Spring 生命周期
        // AOP
        // Spring 事务

      ]
    },
    {
      text: '解析',
      items: [
        { text: 'ArragList', link: 'java/interview/java-arraylist' },
        { text: 'HashMap', link: 'java/interview/java-hashmap' },
        { text: 'IO', link: 'java/interview/java-io' },
      ]
    },
    {
      text: 'Spring Cloud',
      items: [
        { text: '介绍', link: '/springCloud/spring-cloud-intro' },
        // 服务注册中心 Nacos/Eureka
        // 服务调用 OpenFeign
        // 负载均衡
        // 配置中心
        // 服务熔断降级
        // 超时机制
        // 网关
        // 认证体系 JWT/Gateway 校验 Token/微服务无状态
        // 链路追踪 & 日志
        // 部署 & 运维
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
  '/react/': [
    {
      text: 'React',
      items: [
        { text: 'React 介绍', link: '/react/react-intro' },
        { text: '组件间共享数据', link: '/react/组件间共享数据' },
        { text: 'Hook', link: '/react/hook'}
      ]
    },
    {
      text: 'React Router',
      items: [
        { text: '声明式', link: '/react/ReactRouter/声明式模式' },
        { text: '数据模式', link: '/react/ReactRouter/数据模式' },
      ]
    },
    {
      text: 'Zustand',
      items: [
        { text: 'Zustand', link: '/react/Zustand/intro'}
      ]
    },
    // {
    //   text: 'TanStack Query',
    //   items: [
    //     { text: 'TanStack Query', link: '/react/TanStackQuery/intro'}
    //   ]
    // }
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
        { text: '介绍', link: '/webpack/webpack-intro'},
        { text: '安装', link: '/webpack/webpack-insert'},
        { text: '前端自动化构建工具', link: '/webpack/webpack-introduce'},
        { text: '配置文件', link: '/webpack/webpack-config'},
        { text: 'devtool配置', link: '/webpack/webpack-devtool'},
        { text: '编译过程', link: '/webpack/webpack-process'},
        { text: '入口和出口', link: '/webpack/webpack-entry-and-output'},
        { text: 'loader', link: '/webpack/webpack-loader'},
        { text: 'loader 处理实例', link: '/webpack/webpack-loader-example'},
        { text: 'plugin', link: '/webpack/webpack-plugin'},
      ]
    },
    {
      text: 'vite',
      items: [
        { text: '介绍', link: '/webpack/vite/intro' },
        { text: '基本配置', link: '/webpack/vite/config' },
        { text: '与webpack对比', link: '/webpack/vite/compare' },

      ]
    },
    {
      text: 'Rollup',
      items: [
        { text: '介绍', link: '/webpack/rollup/intro' },
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
        { text: 'pyenv-virtualenv虚拟环境', link: '/python/pyenv-virtualenv' },
        { text: 'pyenv 常用命令', link: '/python/pyenv-command' },
        { text: 'python conda', link: '/python/python-conda' },
        { text: 'python 包上传', link: '/python/python-package-upload' },
        { text: 'python 连接数据库', link: '/python/python-connect-database' }
      ]
    }
  ],
  '/docker/': [
    {
      text: 'Docker 基础',
      items: [
        {text: 'docker 介绍', link: '/docker/docker-intro'},
        {text: 'docker 安装', link: '/docker/docker-install'},
        {text: 'Image 镜像', link: '/docker/docker-image'},
        {text: 'Container 容器', link: '/docker/docker-container'},
        {text: 'Volume 数据卷', link: '/docker/docker-volume'},
        {text: 'Network 网络', link: '/docker/docker-network'},
        {text: 'Dockerfile', link: '/docker/dockerfile'},
        {text: 'Docker Compose', link: '/docker/docker-compose'},
        {text: '常用命令', link: '/docker/docker-command'},
      ]
    }
  ],
  '/ai/': [
    {
      text: 'AI',
      items: [
        {text: '生成式人工智能原理', link: '/ai/ai-intro'},
        {text: 'GEO生成式引擎优化', link: '/ai/ai-geo'},
        {text: '提示词Prompt', link: '/ai/ai-prompt'},
        {text: 'Agent', link: '/ai/ai-agent'}
      ]
    },
    {
      text: '知识库',
      items: [
        {text: '介绍', link: '/ai/knowledgeBase-intro'},
        {text: 'cherryStudio知识库', link: '/ai/cherryStudio-siliconflow'},
        {text: '搭建知识库（Java）', link: '/ai/java-knowledgeBase'},
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
  '/langChain/': [
    // {
    //   text: 'LangChain',
    //   items: [
    //     {text: 'LangChain 介绍', link: '/langChain/langchain-intro'},
    //     {text: 'LangChain 使用大模型', link: '/langChain/use-llm'},
    //     {text: '构建聊天机器人', link: '/langChain/chat-bot'},
    //     {text: 'agent与本地工具', link: '/langChain/agent-and-tool'},
    //   ]
    // },
    {
      text: 'Langchain1.0',
      items: [
        { text: 'langchain 环境', link: '/langChain/langchain-env' },
        { text: 'langchain ollama', link: '/langChain/langchain-ollama' },
        { text: 'langchain deepseek', link: '/langChain/langchain-deepseek' },
        { text: 'langchain PDF转向量', link: '/langChain/langchain-pdf-vector' },
        { text: 'langchain 语义搜索', link: '/langChain/langchain-search' },
      ]
    }
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
    },
    {
      text: '应用',
      items: [
        {text: '查询', link: '/linux/useLinux/use-query'},
        {text: '进程管理', link: '/linux/useLinux/use-process'},
        {text: '服务器资源', link: '/linux/useLinux/use-server'},
        // JDK诊断 jps、jstack、jmap、jstat、jcmd
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
      text: '基础',
      items: [
        { text: 'Redis 介绍', link: '/redis/redis-intro' },
        { text: '数据类型', link: '/redis/data-type' },
        { text: '常用命令', link: '/redis/command' },
        { text: '过期时间', link: '/redis/expire' },
        { text: 'Spring Boot整合Redis', link: '/redis/spring-boot-redis'},
        { text: '缓存', link: '/redis/cache' },
        { text: '缓存穿透', link: '/redis/cache-penetration' },
        { text: '缓存击穿', link: '/redis/cache-break'},
        { text: '缓存雪崩', link: '/redis/cache-avalanche' },
        { text: '延迟队列', link: '/redis/delay-queue' },
        { text: '分布式锁', link: '/redis/distributed-lock' },
        { text: '消息队列', link: '/redis/message-queue' },
        { text: 'Lua 脚本', link: '/redis/lua-script' },
        // 管道
        // 持久化
        // 内存淘汰机制
        // 过期删除策略
        // 主从复制
        // 哨兵
        // Redis Cluster

        // 排行榜（游戏、直播、积分系统）

        // 内存操作
        // 单线程模型
        // IO多路复用
        // 持久化
        // RDB/AOF/淘汰策略
        
        // 集群
        // 主从复制
        // Sentinel哨兵模式
        // Redis Cluster

      ]
    },
  ],
  '/rabbitMQ/': [
    {
      text: '基础',
      items: [
        {text: 'RabbitMQ 介绍', link: '/rabbitMQ/rabbitmq-intro'},
        {text: '整体架构', link: '/rabbitMQ/rabbitmq-architecture'},
        {text: 'Connection 与 Channel', link: '/rabbitMQ/connection-channel'},
        {text: 'Exchange', link: '/rabbitMQ/exchange'},
        {text: 'Queue', link: '/rabbitMQ/queue'},
        {text: 'Consumer与ACK消息确认机制', link: '/rabbitMQ/consumer-ack'}
        // Spring Boot 整合 RabbitMQ
        // ACK、NACK、Confirm、Return（消息可靠性）
        // 持久化、消费者模型、Prefetch
        // TTL、死信队列（DLX）、延迟消息
        // 幂等性、重复消费、失败重试
        // 性能优化、监控与企业实战
      ]
    }
  ],
  '/gradle/': [
    {
      text: '下载',
      items: [
        { text: 'Gradle 8.14 下载', link: '/gradle/' },
      ]
    }
  ],
  '/android': [
    {
      text: '基础',
      items: [
        { text: '目录结构', link: '/android/android-intro'},
      ]
    }
  ],
  // Kotlin
  // Flutter
  // React Native
  '/reactNative': [
    {
      text: '基础',
      items: [
        { text: '入门', link: '/reactNative/intro' },
        { text: 'React Navigation（expo-router）', link: '/reactNative/react-navigation' },
        { text: 'Stack', link: '/reactNative/stack' },
        { text: 'Tabs', link: '/reactNative/tabs' }

        // 列表
        // FlatList
        // 状态栏
        // galex
      ]
    }
  ],
  // Kafka
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
        {text: 'Java实体类转换', link: '/tools/java-entity'},
        {text: '二维码生成', link: '/tools/to-qrcode'},
        // {text: '日语翻译', link: '/tools/to-translate'},
        {text: '图片 to SVG', link: '/tools/img-to-svg'},
        {text: '图片转 PDF', link: '/tools/img-to-pdf'}
        // 图片转Canvas
        // word转pdf
        // 固定大小压缩包
      ]
    }
  ],
  '/Next': [
    {
      text: 'Next',
      items: [

      ]
    }
  ]
  // '/uniapp': [
  //   {
  //     text: 'uniapp',
  //     items: [
  //       { text: '页面生命周期' },
  //       { text: '内置组件' },
  //       { text: '扩展组件' },
  //       { text: '自定义组件' },
  //       { text: '组件传值' },
  //       { text: '页面跳转' },
  //       { text: 'uniapp API' },
  //       { text: '本地存储' },
  //       { text: '设备能力' },
  //       { text: '条件编译' },
  //       { text: '跨平台差异' },
  //       { text: '状态管理' },
  //       { text: 'UI组件库' },
  //       { text: '移动端布局' },
  //       { text: '导肮/tabBar' },
  //       { text: '文件/图片/视频/音频' },
  //       { text: '网络请求与登录' },
  //       { text: 'pages.json配置项' },
  //       { text: 'manifest.json配置项' },
  //       { text: '权限' },
  //       { text: '小程序打包' },
  //       { text: '分包' },
  //       // 长列表、分包、图片
  //       { text: '原生插件' },
  //     ]
  //   }
  // ]
  // '/qa': [
  //   {
  //     text: 'qa',
  //     items: [
  //       { text: 'vue', link: '/qa/vue' },
  //       { text: 'react', link: '/qa/react' },
  //       { text: 'java', link: '/qa/java' },
  //       { text: 'java', link: '/qa/project' },
  //     ]
  //   }
  // ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Aaron Notes - 技术笔记与踩坑记录',
  description: '前端开发笔记、Vue3、JavaScript、Java、Android、Docker、Redis、Linux 等技术的实战经验与踩坑记录',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' }],
    ['meta', { name: 'author', content: 'Aaron-zon' }],
    ['meta', { property: 'og:site_name', content: 'Aaron Notes' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${siteUrl}/vite.svg` }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],
  // 页面底部与 sitemap 展示最近更新时间（基于 git 记录）
  lastUpdated: true,
  // 每个页面生成独立的 canonical / og:url 等标签，利于搜索引擎理解唯一地址
  transformHead({ pageData }) {
    const relativePath = (pageData.relativePath || '').replace(/\\/g, '/')
    const url =
      relativePath === 'index.md'
        ? siteUrl
        : `${siteUrl}/${relativePath.replace(/\.md$/, '.html')}`
    const head: any[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: pageData.title }],
    ]
    if (pageData.description) {
      head.push(['meta', { property: 'og:description', content: pageData.description }])
    }
    if (pageData.lastUpdated) {
      const iso = new Date(pageData.lastUpdated).toISOString()
      head.push(['meta', { property: 'article:published_time', content: iso }])
    }
    return head
  },
  // 构建完成后生成 sitemap.xml
  buildEnd(siteConfig) {
    generateSitemap(siteConfig.outDir)
  },
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
