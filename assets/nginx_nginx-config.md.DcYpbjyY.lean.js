import{ax as n,A as a,aQ as p,z as l}from"./chunks/framework.BWRXlwpK.js";const g=JSON.parse('{"title":"Nginx 配置","description":"","frontmatter":{},"headers":[],"relativePath":"nginx/nginx-config.md","filePath":"nginx/nginx-config.md"}'),e={name:"nginx/nginx-config.md"};function i(t,s,c,o,r,h){return l(),a("div",null,s[0]||(s[0]=[p(`<h1 id="nginx-配置" tabindex="-1">Nginx 配置 <a class="header-anchor" href="#nginx-配置" aria-label="Permalink to &quot;Nginx 配置&quot;">​</a></h1><p>配置文件路径：/usr/local/nginx/conf/nginx.conf</p><p>文件内容分为三部分：</p><ul><li>全局块</li><li>events块</li><li>http块</li></ul><h2 id="全局块" tabindex="-1">全局块 <a class="header-anchor" href="#全局块" aria-label="Permalink to &quot;全局块&quot;">​</a></h2><p>配置全局指令，如运行时用户组、进程ID存放位置、日志存放位置、worker_process数量</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 配置用户或用户组</span></span>
<span class="line"><span>#user  nobody;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 允许生成的进程数</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置log文件位置 可配置级别：debug | info | notice |warn | error | crit | alert | emerg</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#error_log  logs/error.log;</span></span>
<span class="line"><span>#error_log  logs/error.log  notice;</span></span>
<span class="line"><span>#error_log  logs/error.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置进程ID存放位置</span></span>
<span class="line"><span>#pid        logs/nginx.pid;</span></span></code></pre></div><h2 id="events块" tabindex="-1">events块 <a class="header-anchor" href="#events块" aria-label="Permalink to &quot;events块&quot;">​</a></h2><p>影响nginx服务器和用户网络连接的配置，如每个进程的最大连接数、选取哪种事件驱动模型，在网络连接过程中是否开启多个，是否开启序列化</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>events {</span></span>
<span class="line"><span>    # 每个进程的最大连接数 最大 1024</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>    # ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="http块" tabindex="-1">http块 <a class="header-anchor" href="#http块" aria-label="Permalink to &quot;http块&quot;">​</a></h2><p>配置代理、缓存、日志等绝大部分功能的地方</p><p>可以嵌套不同的 server 块，这些 server 块可以对应不同的域名（在一个nginx服务器上可以支持多个域名），这种方式叫做 <strong>虚拟主机</strong></p><p><strong>虚拟主机</strong>：同一台 nginx 服务器，可以支持多个网站的运行，每个虚拟主机之间都相互独立</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span>    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span>    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #access_log  logs/access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    #tcp_nopush     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #keepalive_timeout  0;</span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #gzip  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 对应虚拟主机配置</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        # 监听端口</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        # 域名地址</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #charset koi8-r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #access_log  logs/host.access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 定位路径或文件地址</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            # 默认路径</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            # 默认首页地址</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #error_page  404              /404.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    root           html;</span></span>
<span class="line"><span>        #    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>        #    fastcgi_index  index.php;</span></span>
<span class="line"><span>        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span>        #    include        fastcgi_params;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line"><span>        # concurs with nginx&#39;s one</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ /\\.ht {</span></span>
<span class="line"><span>        #    deny  all;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # another virtual host using mix of IP-, name-, and port-based configuration</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       8000;</span></span>
<span class="line"><span>    #    listen       somename:8080;</span></span>
<span class="line"><span>    #    server_name  somename  alias  another.alias;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # HTTPS server</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       443 ssl;</span></span>
<span class="line"><span>    #    server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_certificate      cert.pem;</span></span>
<span class="line"><span>    #    ssl_certificate_key  cert.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>    #    ssl_session_timeout  5m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>    #    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="内网自定义域名映射" tabindex="-1">内网自定义域名映射 <a class="header-anchor" href="#内网自定义域名映射" aria-label="Permalink to &quot;内网自定义域名映射&quot;">​</a></h2><p>1.创建一个文件夹，并写入一个html文件</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /usr/local/nginx/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 随便创建个文件夹</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aaron</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建html文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 写入内容</span></span></code></pre></div><p>2.修改配置文件</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        # 起一个域名</span></span>
<span class="line"><span>        server_name  aaron4899.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   aaron; # 指定文件夹，如果找不到可以用绝对路径 /usr/local/nginx/aaron</span></span>
<span class="line"><span>            index  index.html; # 访问的默认文件</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3.检查配置文件并启动</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /usr/local/nginx/sbin/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重载配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><p>4.修改客户端 <code>hosts</code> 文件</p><p>Windows：C:\\Windows\\System32\\drivers\\etc\\hosts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 服务器IP 域名</span></span>
<span class="line"><span>192.168.1.xxx aaron4899.com</span></span></code></pre></div><ol start="5"><li>访问测试</li></ol><p>在浏览器访问 <code>aaron4899.com</code> (注意如果客户端开了代理可能不成功)</p>`,27)]))}const k=n(e,[["render",i]]);export{g as __pageData,k as default};
