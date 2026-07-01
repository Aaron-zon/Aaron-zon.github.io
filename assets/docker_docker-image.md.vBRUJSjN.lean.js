import{ax as s,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const k=JSON.parse('{"title":"Image 镜像","description":"","frontmatter":{},"headers":[],"relativePath":"docker/docker-image.md","filePath":"docker/docker-image.md"}'),i={name:"docker/docker-image.md"};function l(t,a,c,o,d,r){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="image-镜像" tabindex="-1">Image 镜像 <a class="header-anchor" href="#image-镜像" aria-label="Permalink to &quot;Image 镜像&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker pull redis</span></span></code></pre></div><p>这个命令的含义是从 Docker Hub 上拉取名为 Redis 的 Image。</p><p>很多人第一次救出会感到很奇怪，为什么只下载一个 Image，就能运行Redis？</p><p>因为 Image 本身就是一个完整的运行环境，它不是传统意义上的安装包 <code>redis.exe</code></p><p>而是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Linux运行环境</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>Redis配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>启动命令</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+</span></span>
<span class="line"><span>依赖库</span></span></code></pre></div><p>内部已经全部打包好了，只需要运行即可。</p><h2 id="docker-pull" tabindex="-1">docker pull <a class="header-anchor" href="#docker-pull" aria-label="Permalink to &quot;docker pull&quot;">​</a></h2><blockquote><p>docker pull 是从 Docker Hub 上拉取 Image</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis</span></span></code></pre></div><p>运行流程：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Docker Hub</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>下载</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>redis Image</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>保存在本地</span></span></code></pre></div><p>这时只是下载并没有运行。</p><h2 id="docker-run" tabindex="-1">docker run <a class="header-anchor" href="#docker-run" aria-label="Permalink to &quot;docker run&quot;">​</a></h2><blockquote><p>docker run 是运行通过 Image 创建 Container 并运行 Container。</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Image</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>创建Container</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>创建可写层</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>启动Redis</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Container Running</span></span></code></pre></div><h2 id="版本控制" tabindex="-1">版本控制 <a class="header-anchor" href="#版本控制" aria-label="Permalink to &quot;版本控制&quot;">​</a></h2><p>在下载 Image 是可以选择版本</p><p>如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis:6.2.5</span></span></code></pre></div><p>其中 <code>:</code> 后面叫 Tag，表示版本。</p><h2 id="存放位置" tabindex="-1">存放位置 <a class="header-anchor" href="#存放位置" aria-label="Permalink to &quot;存放位置&quot;">​</a></h2><p>Linux默认：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/var/lib/docker</span></span></code></pre></div><p>不过一般不用进去 Docker 自己管理。</p><h2 id="image-生命周期" tabindex="-1">Image 生命周期 <a class="header-anchor" href="#image-生命周期" aria-label="Permalink to &quot;Image 生命周期&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Docker Hub</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>docker pull</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Image（本地）</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>docker run</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Container</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>docker stop</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>docker start</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>docker rm</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Container删除</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Image仍然存在</span></span></code></pre></div>`,28)]))}const u=s(i,[["render",l]]);export{k as __pageData,u as default};
