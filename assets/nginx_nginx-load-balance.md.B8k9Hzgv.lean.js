import{_ as s,c as n,a2 as p,o as e}from"./chunks/framework.BLTIpkzl.js";const u=JSON.parse('{"title":"Nginx 负载均衡","description":"","frontmatter":{},"headers":[],"relativePath":"nginx/nginx-load-balance.md","filePath":"nginx/nginx-load-balance.md"}'),l={name:"nginx/nginx-load-balance.md"};function i(t,a,c,o,r,d){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="nginx-负载均衡" tabindex="-1">Nginx 负载均衡 <a class="header-anchor" href="#nginx-负载均衡" aria-label="Permalink to &quot;Nginx 负载均衡&quot;">​</a></h1><p>负载均衡：将多个请求分配给多个服务器，从而实现高可用和高性能。是计算机横向拓展的一种方式。</p><p>客户端先到达一个 <strong>负载均衡器</strong>，通过 <strong>调度算法</strong>， 将请求分配给目标服务器。</p><p>优点：</p><ul><li>通过健康检查，避免单点故障</li><li>当发现节点故障时，从集群中移除，保证应用的高可用性</li></ul><h2 id="负载均衡的调度算法" tabindex="-1">负载均衡的调度算法 <a class="header-anchor" href="#负载均衡的调度算法" aria-label="Permalink to &quot;负载均衡的调度算法&quot;">​</a></h2><ul><li>轮询：循环（从第一台服务器到最后一台服务器）依次分配请求</li><li>权重：轮询的基础上，可以设置权重，权重高的服务器分配的请求更多</li><li>最小连接：服务器的连接数在负载均衡服务器上是可以查询到的，在请求发来时，可以选择连接数最小的服务器进行分配</li><li>ip哈希：将请求的源 IP 地址进行哈希计算，将结果作为索引，将请求分配给对应的服务器 <ul><li>这样做的好处是，ip哈希时得到的结果是固定的，一台客户端每次请求都会访问在同一台服务器上，可以解决session问题（粘性对话）</li></ul></li></ul><h2 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h2><p><strong>需求</strong>：当访问 192.168.1.20/lb/index.html 时，通过负载均衡，让请求平均分配到 8080 和 8081 端口中。</p><h3 id="轮询调度" tabindex="-1">轮询调度 <a class="header-anchor" href="#轮询调度" aria-label="Permalink to &quot;轮询调度&quot;">​</a></h3><p>1）分别找到两个 tomcat 的安装目录，如 <code>/usr/local/tomcat/webapps</code></p><ul><li>创建 lb 目录：mkdir lb</li><li>创建访问页面：cp tomcat/index.html lb</li><li>查看画面内容：cat lb/index.html</li></ul><p>2）修改nginx.conf</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    # 配置 upstream</span></span>
<span class="line"><span>    upstream myserver {</span></span>
<span class="line"><span>        server 192.168.1.20:8080;</span></span>
<span class="line"><span>        server 192.168.1.20:8081;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        server_name  192.168.1.20;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 处理负载均衡请求</span></span>
<span class="line"><span>        location / { </span></span>
<span class="line"><span>            # 将请求映射到负载均衡器中，参数为 upstream 的名称</span></span>
<span class="line"><span>            proxy_pass http://myserver;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="权重" tabindex="-1">权重 <a class="header-anchor" href="#权重" aria-label="Permalink to &quot;权重&quot;">​</a></h2><p>如果需要额外设置权重，可以设置 <code>weight</code>，<code>weight</code> 越大权重越大，默认值是 1。</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 配置 upstream</span></span>
<span class="line"><span>upstream myserver {</span></span>
<span class="line"><span>    server 192.168.1.20:8080 weight=2;</span></span>
<span class="line"><span>    server 192.168.1.20:8081 weight=1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="ip哈希" tabindex="-1">ip哈希 <a class="header-anchor" href="#ip哈希" aria-label="Permalink to &quot;ip哈希&quot;">​</a></h2><p>如果想要使用 ip哈希，可以在 <strong>upstream</strong> 中使用 <code>ip_hash</code></p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 配置 upstream</span></span>
<span class="line"><span>upstream myserver {</span></span>
<span class="line"><span>    server 192.168.1.20:8080;</span></span>
<span class="line"><span>    server 192.168.1.20:8081;</span></span>
<span class="line"><span>    ip_hash;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,20)]))}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
