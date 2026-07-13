import{ax as a,A as s,aQ as e,z as p}from"./chunks/framework.BWRXlwpK.js";const b=JSON.parse('{"title":"Connection 与 Channel","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/connection-channel.md","filePath":"rabbitMQ/connection-channel.md"}'),t={name:"rabbitMQ/connection-channel.md"};function o(i,n,c,l,r,h){return p(),s("div",null,n[0]||(n[0]=[e(`<h1 id="connection-与-channel" tabindex="-1">Connection 与 Channel <a class="header-anchor" href="#connection-与-channel" aria-label="Permalink to &quot;Connection 与 Channel&quot;">​</a></h1><h2 id="为什么rabbitmq不建议每发送一条消息都建立一个tcp连接" tabindex="-1">为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？ <a class="header-anchor" href="#为什么rabbitmq不建议每发送一条消息都建立一个tcp连接" aria-label="Permalink to &quot;为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？&quot;">​</a></h2><p>这其实是连接池的道理。</p><p>每次发送消息都 <code>创建TCP链接 - 发送消息 - 关闭TCP连接</code>，请求很多时，大量的时间花在了创建TCP和关闭TCP上。</p><p>而建立TCP连接其实时很贵的，TCP不是一句话就能连的，创建它需要三次握手，关闭时需要四次挥手。</p><p>所以发送消息最耗时的可能不是数据的传输，而是创建和关闭TCP连接。</p><p>我们完全可以只连接一次：<code>Spring Boot - 连接RabbitMQ</code></p><p>之后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>消息1</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>消息2</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>消息3</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>……</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一直复用</span></span></code></pre></div><p>当程序关闭后，再关闭连接，这就是 <strong>Connection</strong>。</p><h2 id="什么是connection" tabindex="-1">什么是Connection？ <a class="header-anchor" href="#什么是connection" aria-label="Permalink to &quot;什么是Connection？&quot;">​</a></h2><blockquote><p>Connection 就是一条 TCP 长连接。</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Spring Boot</span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span>      │ TCP</span></span>
<span class="line"><span>      ▼</span></span>
<span class="line"><span>RabbitMQ</span></span></code></pre></div><p>这个连接会一直存在，不会随着一条消息发送完毕而断开，而是一直保持。</p><h2 id="有了-connection-为什么还需要-channel" tabindex="-1">有了 Connection 为什么还需要 Channel？ <a class="header-anchor" href="#有了-connection-为什么还需要-channel" aria-label="Permalink to &quot;有了 Connection 为什么还需要 Channel？&quot;">​</a></h2>`,15)]))}const C=a(t,[["render",o]]);export{b as __pageData,C as default};
