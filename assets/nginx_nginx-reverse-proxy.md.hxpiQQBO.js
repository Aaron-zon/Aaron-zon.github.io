import{_ as a,c as n,a2 as i,o as p}from"./chunks/framework.BLTIpkzl.js";const g=JSON.parse('{"title":"Nginx 反向代理","description":"","frontmatter":{},"headers":[],"relativePath":"nginx/nginx-reverse-proxy.md","filePath":"nginx/nginx-reverse-proxy.md"}'),l={name:"nginx/nginx-reverse-proxy.md"};function t(e,s,o,c,r,h){return p(),n("div",null,s[0]||(s[0]=[i(`<h1 id="nginx-反向代理" tabindex="-1">Nginx 反向代理 <a class="header-anchor" href="#nginx-反向代理" aria-label="Permalink to &quot;Nginx 反向代理&quot;">​</a></h1><p>前提：系统中已经安装好 jdk 和 tomcat，并配置好环境变量。</p><p>假设以下为安装地址：</p><ul><li>jdk路径：/usr/local/java/</li><li>tomcat路径：/usr/local/tomcat/ <ul><li>启动方式：/usr/local/tomcat/bin -&gt; ./startup.sh</li><li>停止方式：/usr/local/tomcat/bin -&gt; ./shutdown.sh</li></ul></li></ul><p>原场景：访问 aaron4899.com 显示 /usr/local/nginx/aaron/index.html 现需求：访问 aaron4899.com 显示 tomcat 页面</p><p>步骤：</p><ol><li>打开 nginx 配置文件</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/nginx/conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx.conf</span></span></code></pre></div><p>2.修改配置文件</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            # tomcat 网址路径</span></span>
<span class="line"><span>            # 将域名请求跳转发送到 8008 端口上</span></span>
<span class="line"><span>            proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #...</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="3"><li>重启 nginx</li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/nginx/sbin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><h2 id="多tomcat分发" tabindex="-1">多tomcat分发 <a class="header-anchor" href="#多tomcat分发" aria-label="Permalink to &quot;多tomcat分发&quot;">​</a></h2><p><strong>进阶需求</strong>：一台 nginx 连接多个 tomcat，当域名下对应路径不同时，分发给不同的 tomcat</p><ul><li>tomcat1路径：/usr/local/tomcat1/ <ul><li>启动端口：8080</li><li>关闭端口：8005</li><li>其他端口：8009</li></ul></li><li>tomcat2路径：/usr/local/tomcat2/ <ul><li>启动端口：8081</li><li>关闭端口：8015</li><li>其他端口：8019</li></ul></li></ul><p>以上端口通过修改 tomcat 的 server.xml 文件来配置</p><p><strong>修改 Nginx 配置文件</strong>：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        server_name  aaron4899.com;</span></span>
<span class="line"><span>        # 这里添加正则匹配 ~/tomcat1/</span></span>
<span class="line"><span>        # 表示访问 aaron4899.com/tomcat1/ 的时候，将请求转发给 tomcat1</span></span>
<span class="line"><span>        location ~/tomcat1/ {</span></span>
<span class="line"><span>            # 端口使用 tomcat1 的启动端口</span></span>
<span class="line"><span>            proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        # 这里添加正则匹配 ~/tomcat2/</span></span>
<span class="line"><span>        # 表示访问 aaron4899.com/tomcat2/ 的时候，将请求转发给 tomcat2</span></span>
<span class="line"><span>        location ~/tomcat2/ {</span></span>
<span class="line"><span>            # 端口使用 tomcat2 的启动端口</span></span>
<span class="line"><span>            proxy_pass http://127.0.0.1:8081;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>重载配置</strong>：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/nginx/sbin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><p><strong>访问</strong>:</p><ul><li>aaron4899.com/tomcat1 -&gt; tomcat1</li><li>aaron4899.com/tomcat2 -&gt; tomcat2</li></ul>`,22)]))}const m=a(l,[["render",t]]);export{g as __pageData,m as default};
