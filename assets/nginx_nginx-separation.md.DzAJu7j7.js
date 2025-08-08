import{_ as s,c as a,a2 as p,o as e}from"./chunks/framework.BLTIpkzl.js";const x=JSON.parse('{"title":"Nginx 动静分离","description":"","frontmatter":{},"headers":[],"relativePath":"nginx/nginx-separation.md","filePath":"nginx/nginx-separation.md"}'),i={name:"nginx/nginx-separation.md"};function l(t,n,o,c,r,g){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="nginx-动静分离" tabindex="-1">Nginx 动静分离 <a class="header-anchor" href="#nginx-动静分离" aria-label="Permalink to &quot;Nginx 动静分离&quot;">​</a></h1><p>动态资源和静态资源分开，请求来时通过判断请求的资源类型，如果请求的是静态资源，则访问静态资源目录，如果是请求动态资源则通过负载均衡分配服务器。</p><h2 id="实现方式" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式" aria-label="Permalink to &quot;实现方式&quot;">​</a></h2><ul><li>（推荐）单独将静态文件放在单独的服务器及独立的域名下</li><li>将动态资源和静态资源混合在一起，通过 nginx 来分开。</li></ul><p><strong>需求</strong>：访问图片等静态资源时，可以直接从 nginx 中获取，访问 jsp 等动态资源时，通过 tomcat 返回结果</p><p><strong>处理流程</strong></p><p>1） 准备动态资源，在 <code>/usr/local/tomcat/webapps</code> 中 创建动态资源 index.jsp</p><ol start="2"><li>准备静态资源，创建 <code>/usr/local/nginx/image</code>，存放静态资源 test.png</li></ol><p>3） nginx.conf 中配置动静分离</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    upstream myserver {</span></span>
<span class="line"><span>        server 192.168.1.20:8080;</span></span>
<span class="line"><span>        server 192.168.1.20:8081;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 动态资源配置</span></span>
<span class="line"><span>    location ~.*.jsp$ {</span></span>
<span class="line"><span>        proxy_pass http://myserver;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 静态资源配置</span></span>
<span class="line"><span>    location ~.*\\.(git|jpg|png|css)$ {</span></span>
<span class="line"><span>        root /usr/local/nginx/image;</span></span>
<span class="line"><span>        # 缓存时间 </span></span>
<span class="line"><span>        # 3d：表示三天之内从浏览器缓存中直接读取，不会从服务器上获取</span></span>
<span class="line"><span>        expires 3d</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10)]))}const h=s(i,[["render",l]]);export{x as __pageData,h as default};
