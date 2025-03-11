import{d as k,p,v as g,h as M,o as n,c,j as r,F as i,C as l,t as u,k as b,g as y,G as w}from"./chunks/framework.Db5sgsAJ.js";const C=JSON.parse('[{"text":"重大改变","anchor":"重大改变","items":[{"text":"效率提升","link":"/vue3/change-efficiency","headers":[{"text":"Vue3 的效率提升","anchor":"vue3-efficiency"},{"text":"Vue3 的效率提升主要表现在哪些方面？","anchor":"vue3-efficiency-mainly"},{"text":"静态提升","anchor":"static-promotion"},{"text":"预字符串化","anchor":"pre-stringify "},{"text":"缓存事件处理函数","anchor":"cache-event-handler"},{"text":"Block Tree","anchor":"block-tree"},{"text":"PatchFlag","anchor":"patch-flag"}]},{"text":"API和数据响应式的变化","link":"/vue3/change-api-and-reactivity","headers":[{"text":"为什么去掉了 Vue 构造函数?","anchor":"为什么去掉了-vue-构造函数"},{"text":"Vue3 响应式","anchor":"vue3-响应式"}]},{"text":"从 Webpack 到 Vite","link":"/vue3/change-webpack-to-vite","headers":[{"text":"Webpack","anchor":"webpack"},{"text":"Vite","anchor":"vite"},{"text":"Vite 和 Webpack 的对比","anchor":"vite-和-webpack-的对比"}]}]},{"text":"Vue 文件编译","anchor":"vue-文件编译","items":[{"text":"Vue 文件编译成 JS 文件","link":"/vue3/vue-file-compile","headers":[{"text":"前言","anchor":"前言"},{"text":"调试源码","anchor":"调试源码"},{"text":"vuePlugin","anchor":"vueplugin"},{"text":"buildStart","anchor":"buildstart"},{"text":"transform","anchor":"transform"},{"text":"transformMain","anchor":"transformmain"},{"text":"transformStyle","anchor":"transformstyle"},{"text":"总结","anchor":"总结"}]}]},{"text":"模板编译 Template","anchor":"模板编译-template","items":[{"text":"baseCompile 函数","link":"/vue3/base-compile","headers":[{"text":"前言","anchor":"前言"},{"text":"@vue 下的几个包","anchor":"vue-下的几个包"},{"text":"@vue/compiler-sfc 的 compileTemplate 函数","anchor":"vue-compiler-sfc-的-compiletemplate-函数"}]}]},{"text":"响应式原理","anchor":"响应式原理","items":[{"text":"MVVM 和 MVC","link":"/vue3/reactive-mvvm-mvc","headers":[{"text":"MVC（Model-View-Controller）","anchor":"mvc（model-view-controller）"},{"text":"MVVM（Model-View-ViewModel）","anchor":"mvvm（model-view-viewmodel）"},{"text":"MVC 和 MVVM 的交互方式有什么不同？","anchor":"mvc-和-mvvm-的交互方式有什么不同？"},{"text":"MVC 和 MVVM 的优缺点","anchor":"mvc-和-mvvm-的优缺点"}]},{"text":"响应式原理","link":"/vue3/reactive-principle","headers":[{"text":"Vue2 的响应式原理","anchor":"vue2-的响应式原理"}]}]}]'),S={class:"wrapper"},B={id:"section.anchor"},P={class:"api-groups"},N=["href"],W=k({__name:"ApiIndex",setup(m){const h=p(),d=p(""),x=a=>a.toLowerCase().replace(/-/g," ");g(()=>{var a;(a=h.value)==null||a.focus()});const f=M(()=>{const a=x(d.value),o=t=>x(t).includes(a);return C.map(t=>{if(o(t.text))return t;const s=t.items.map(e=>{if(o(e.text)||a.includes("ssr")&&e.text.startsWith("Server"))return e;const v=e.headers.filter(({text:V,anchor:_})=>o(V)||o(_));return v.length?{text:e.text,link:e.link,headers:v}:null}).filter(e=>e);return s.length?{text:t.text,items:s}:null}).filter(t=>t)});return(a,o)=>(n(),c("div",S,[o[0]||(o[0]=r("div",{id:"api-index"},[r("div",{class:"header"},[r("h1",null,"Vue3")])],-1)),(n(!0),c(i,null,l(f.value,t=>(n(),c("div",{key:t.text,class:"api-section"},[r("h2",B,u(t.text),1),r("div",P,[(n(!0),c(i,null,l(t.items,s=>(n(),c("div",{key:s.text,class:"api-group"},[r("h3",null,u(s.text),1),r("ul",null,[(n(!0),c(i,null,l(s.headers,e=>(n(),c("li",{key:e.anchor},[r("a",{href:b(y)(s.link)+".html#"+e.anchor},u(e.text),9,N)]))),128))])]))),128))])]))),128))]))}}),O=JSON.parse('{"title":"Vue3 笔记","description":"","frontmatter":{"title":"Vue3 笔记","sidebar":false,"page":"teue","footer":false},"headers":[],"relativePath":"vue3/index.md","filePath":"vue3/index.md"}'),F={name:"vue3/index.md"},T=Object.assign(F,{setup(m){return(h,d)=>(n(),c("div",null,[w(W)]))}});export{O as __pageData,T as default};
