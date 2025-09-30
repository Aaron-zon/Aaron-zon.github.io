import{ax as a,A as i,aQ as n,z as l}from"./chunks/framework.BWRXlwpK.js";const o=JSON.parse('{"title":"开机或登录自动启动","description":"","frontmatter":{},"headers":[],"relativePath":"linux/linux-boot.md","filePath":"linux/linux-boot.md"}'),p={name:"linux/linux-boot.md"};function e(t,s,h,k,c,d){return l(),i("div",null,s[0]||(s[0]=[n(`<h1 id="开机或登录自动启动" tabindex="-1">开机或登录自动启动 <a class="header-anchor" href="#开机或登录自动启动" aria-label="Permalink to &quot;开机或登录自动启动&quot;">​</a></h1><p>方法1：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -al</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 这时可以看到一个名为 .bash_profile 的隐藏文件</span></span></code></pre></div><p>方法2：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/profile.d/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ll</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 这里可以看到一堆文件，其中尾缀为 .sh 的文件都会在开机时执行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 例：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my.sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tomcat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:wq</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmode</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 777</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my.sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新启动后这个my.sh文件就会自动执行</span></span></code></pre></div>`,5)]))}const F=a(p,[["render",e]]);export{o as __pageData,F as default};
