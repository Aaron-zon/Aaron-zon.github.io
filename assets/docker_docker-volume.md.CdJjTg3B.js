import{ax as n,A as s,aQ as e,z as p}from"./chunks/framework.BWRXlwpK.js";const h=JSON.parse('{"title":"Volume（数据卷）","description":"","frontmatter":{},"headers":[],"relativePath":"docker/docker-volume.md","filePath":"docker/docker-volume.md"}'),l={name:"docker/docker-volume.md"};function o(i,a,t,c,r,d){return p(),s("div",null,a[0]||(a[0]=[e(`<h1 id="volume-数据卷" tabindex="-1">Volume（数据卷） <a class="header-anchor" href="#volume-数据卷" aria-label="Permalink to &quot;Volume（数据卷）&quot;">​</a></h1><p>Volume 处理的是数据如何持久化的问题。</p><p>因为容器中的数据在容器中，一旦容器被删除，数据也会随之消失，所以我们需要将数据持久化。</p><p>在Container中，数据一直存在 <code>Writable Layer（可写层）</code></p><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MySQL Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── mysql程序</span></span>
<span class="line"><span>├── 配置</span></span>
<span class="line"><span>├── 数据库数据  ← 在这里</span></span>
<span class="line"><span>└── 日志</span></span></code></pre></div><p>Container 被删除，数据自然也被一起删除。</p><p>Volume 就是解决这个问题。</p><p>数据不放到 Container 而是放到 Volume 中，于是变成了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MySQL Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Volume</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库数据</span></span></code></pre></div><p>这样就算 Container 删了，Volume 只要还在数据就不会消失。</p><p>可以理解为像U盘一样的存在。</p><p>在重新创建 Container 时，挂在 Volume，就可以直接使用之前的数据。</p><h2 id="volume-可以多个-container-共用吗" tabindex="-1">Volume 可以多个 Container 共用吗？ <a class="header-anchor" href="#volume-可以多个-container-共用吗" aria-label="Permalink to &quot;Volume 可以多个 Container 共用吗？&quot;">​</a></h2><p>可以，但是一般数据库不会这样，因为容易冲突。</p><p>更多用于共享文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Volume</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Container A</span></span>
<span class="line"><span>├── Container B</span></span>
<span class="line"><span>└── Container C</span></span></code></pre></div><h2 id="docker-为什么推荐-容器无状态" tabindex="-1">Docker 为什么推荐&quot;容器无状态&quot;？ <a class="header-anchor" href="#docker-为什么推荐-容器无状态" aria-label="Permalink to &quot;Docker 为什么推荐&quot;容器无状态&quot;？&quot;">​</a></h2><blockquote><p>Container 应该是无状态的（Stateless）。</p></blockquote><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>只负责：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>运行代码</span></span></code></pre></div><p>数据部分应该都存在Volume里。</p><p>数据库存在：<code>MySql Volume</code></p><p>Redis存在：<code>Redis Volume</code></p><p>这样即使被误删也可以重新创建。</p>`,25)]))}const m=n(l,[["render",o]]);export{h as __pageData,m as default};
