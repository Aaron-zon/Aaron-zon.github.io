import{_ as i,c as a,a0 as p,o as t}from"./chunks/framework.Db5sgsAJ.js";const n="/assets/1.Cjd0N72o.png",l="/assets/2.CQ9bdBn8.png",h="/assets/3.B4XX0V1q.png",y=JSON.parse('{"title":"Python 环境搭建","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"python/python-install.md","filePath":"python/python-install.md"}'),e={name:"python/python-install.md"};function k(d,s,o,r,g,c){return t(),a("div",null,s[0]||(s[0]=[p('<h1 id="python-环境搭建" tabindex="-1">Python 环境搭建 <a class="header-anchor" href="#python-环境搭建" aria-label="Permalink to &quot;Python 环境搭建&quot;">​</a></h1><h2 id="python-下载" tabindex="-1">Python 下载 <a class="header-anchor" href="#python-下载" aria-label="Permalink to &quot;Python 下载&quot;">​</a></h2><p>安装包下载地址：<a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">https://www.python.org/downloads/</a></p><p><img src="'+n+'" alt="下载python"></p><h2 id="python-安装" tabindex="-1">Python 安装 <a class="header-anchor" href="#python-安装" aria-label="Permalink to &quot;Python 安装&quot;">​</a></h2><p><img src="'+l+'" alt="alt text"></p><p><img src="'+h+`" alt="alt text"></p><p>查看当前系统的 Python 版本，确认安装成功</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -V</span></span></code></pre></div><h2 id="python-常用命令行参数" tabindex="-1">Python 常用命令行参数 <a class="header-anchor" href="#python-常用命令行参数" aria-label="Permalink to &quot;Python 常用命令行参数&quot;">​</a></h2><ul><li><code>python -V</code> 或 <code>python --version</code><ul><li>查看当前 Python 版本</li></ul></li><li><code>python -c &lt;command&gt;</code><ul><li>直接运行单行 Python 代码</li><li>示例：python -c &quot;print(&#39;Hello World&#39;)&quot;</li></ul></li><li><code>python -m &lt;module&gt;</code><ul><li>以脚本形式运行模块</li><li>示例：python -m http.server （启动一个简单的 HTTP 服务器）</li></ul></li><li><code>python -i &lt;script.py&gt;</code><ul><li>运行脚本后进入交互模式，保留变量和状态</li><li>python -i script.py</li></ul></li><li><code>python -h</code> 或 <code>python --help</code><ul><li>查看 Python 命令行帮助信息</li></ul></li><li><code>python -m pip install &lt;package&gt;</code><ul><li>使用 <code>pip</code> 安装 Python 包</li></ul></li><li><code>python -m site</code><ul><li>查看 Python 的路径配置</li></ul></li></ul><h2 id="pip-介绍" tabindex="-1">pip 介绍 <a class="header-anchor" href="#pip-介绍" aria-label="Permalink to &quot;pip 介绍&quot;">​</a></h2><p><code>pip</code> 是 Python 的官方包管理工具（相当于前端的 npm）。它用于 <code>安装</code>、<code>管理</code>、<code>卸载</code> 第三方 Python 包，是在项目开发、脚本运行、构建应用程序时不可或缺的工具</p><p>主要要了解的功能：</p><ul><li>安装包</li><li>卸载包</li><li>升级包</li><li>导出环境</li><li>配置镜像源</li></ul><h2 id="安装-pip" tabindex="-1">安装 pip <a class="header-anchor" href="#安装-pip" aria-label="Permalink to &quot;安装 pip&quot;">​</a></h2><p>在 Python 2.7.9+ 和 Python 3.4+ 的版本中，<code>pip</code> 已经内置在 Python 中了，在安装 Python时会自动安装。</p><p>检查pip版本，确认是否已经安装：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -V</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">或</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><p>如果没有安装可以通过以下方式安装：</p><ul><li>Linux / macOS：</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://bootstrap.pypa.io/get-pip.py</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-pip.py</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-pip.py</span></span></code></pre></div><ul><li>Windows： 下载 <a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">get-pip.py</a>，然后运行：</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-pip.py</span></span></code></pre></div><h2 id="pip-的基本用法" tabindex="-1">pip 的基本用法 <a class="header-anchor" href="#pip-的基本用法" aria-label="Permalink to &quot;pip 的基本用法&quot;">​</a></h2><p><strong>安装包</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requests</span></span></code></pre></div><p>安装指定版本包</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">==</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">versio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requests==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.21.0</span></span></code></pre></div><p><strong>卸载包</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requests</span></span></code></pre></div><p><strong>升级包</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --upgrade</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --upgrade</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pip</span></span></code></pre></div><p>列出已安装的包</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span></code></pre></div><p>查看包信息</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pandas</span></span></code></pre></div><p>导出依赖</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> freeze</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requirements.txt</span></span></code></pre></div><p>安装依赖项</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requirements.txt</span></span></code></pre></div><p>版本冲突（如果多个包依赖同一包的不同版本，可以使用 <code>pip check</code> 检查冲突）</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> check</span></span></code></pre></div><p>清除缓存</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cache</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> purge</span></span></code></pre></div><h2 id="pip-使用镜像加速" tabindex="-1">pip 使用镜像加速 <a class="header-anchor" href="#pip-使用镜像加速" aria-label="Permalink to &quot;pip 使用镜像加速&quot;">​</a></h2><p>使用临时镜像源</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mirror_ur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">l</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> numpy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://pypi.tuna.tsinghua.edu.cn/simple</span></span></code></pre></div><p><strong>永久修改镜像源</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> global.index-url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mirror_ur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">l</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> global.index-url</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://pypi.tuna.tsinghua.edu.cn/simple</span></span></code></pre></div>`,50)]))}const u=i(e,[["render",k]]);export{y as __pageData,u as default};
