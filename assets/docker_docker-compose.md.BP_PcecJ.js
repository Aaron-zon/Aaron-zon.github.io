import{ax as a,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const u=JSON.parse('{"title":"Docker Compose","description":"","frontmatter":{},"headers":[],"relativePath":"docker/docker-compose.md","filePath":"docker/docker-compose.md","lastUpdated":1788148933000}'),l={name:"docker/docker-compose.md"};function i(o,s,t,c,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="docker-compose" tabindex="-1">Docker Compose <a class="header-anchor" href="#docker-compose" aria-label="Permalink to &quot;Docker Compose&quot;">​</a></h1><p>假设我们要创建一个商城项目，需要：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Spring Boot</span></span>
<span class="line"><span>MySQL</span></span>
<span class="line"><span>Redis</span></span>
<span class="line"><span>RabbitMQ</span></span>
<span class="line"><span>Nginx</span></span></code></pre></div><p>按照之前的学习，我们需要执行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run ...</span></span>
<span class="line"><span>docker run ...</span></span>
<span class="line"><span>docker run ...</span></span>
<span class="line"><span>docker run ...</span></span>
<span class="line"><span>docker run ...</span></span></code></pre></div><p>每一个服务都需要对应的执行命令，并且还要配合各种版本号、参数、端口号、路径等指令。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run \\</span></span>
<span class="line"><span>-p 3306:3306 \\</span></span>
<span class="line"><span>-v mysql_data:/var/lib/mysql \\</span></span>
<span class="line"><span>-e MYSQL_ROOT_PASSWORD=123456 \\</span></span>
<span class="line"><span>--network shop-network \\</span></span>
<span class="line"><span>--name mysql \\</span></span>
<span class="line"><span>mysql:8</span></span></code></pre></div><p>而且这些还都要牢牢记住，因为一旦服务器重装还需要重新执行一遍。</p><blockquote><p>Docker Compose 正是解决了这一问题</p></blockquote><h2 id="docker-compose-解决什么" tabindex="-1">Docker Compose 解决什么？ <a class="header-anchor" href="#docker-compose-解决什么" aria-label="Permalink to &quot;Docker Compose 解决什么？&quot;">​</a></h2><blockquote><p>将多个 docker run 写成一个配置文件。</p></blockquote><p>从前：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run mysql</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run rabbitmq</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker run springboot</span></span></code></pre></div><p>现在：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>compose.yaml</span></span></code></pre></div><p>只要执行一条命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span></span></code></pre></div><p>就可以全部启动。</p><p><strong>一个compose.yaml示例</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span>    image: mysql:8</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3306:3306&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    image: redis:7</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;6379:6379&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  app:</span></span>
<span class="line"><span>    image: shop:v1</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;8080:8080&quot;</span></span></code></pre></div><p>有格式化的配置文件，相比于繁琐的执行命令，更加清晰。</p><h2 id="关键字" tabindex="-1">关键字 <a class="header-anchor" href="#关键字" aria-label="Permalink to &quot;关键字&quot;">​</a></h2><h3 id="services" tabindex="-1">services <a class="header-anchor" href="#services" aria-label="Permalink to &quot;services&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span></code></pre></div><p>意思是包含了哪些服务。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  app:</span></span></code></pre></div><p>这个例子中包含三个服务，分别是 MySQL、Redis 和 Spring Boot，启动时就是三个 Container。</p><h3 id="image" tabindex="-1">image <a class="header-anchor" href="#image" aria-label="Permalink to &quot;image&quot;">​</a></h3><p>使用的Image。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql:</span></span>
<span class="line"><span>    image: mysql:8</span></span></code></pre></div><p>这里表示的就是 mysql 使用的 <code>mysql:8</code> 这个 Image</p><h3 id="ports" tabindex="-1">ports <a class="header-anchor" href="#ports" aria-label="Permalink to &quot;ports&quot;">​</a></h3><p>使用的端口号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql:</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>        - &quot;3306:3306&quot;</span></span></code></pre></div><p>它相当于：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -p 8080:8080</span></span></code></pre></div><p>设置了宿主机和Container的映射。</p><p>左边是宿主机，右边是Container。</p><h3 id="volumes" tabindex="-1">volumes <a class="header-anchor" href="#volumes" aria-label="Permalink to &quot;volumes&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql:</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>        - mysql_data:/var/lib/mysql</span></span></code></pre></div><p>数据库的数据持久化的地址。</p><ul><li>mysql_data: 表示Docker在宿主机创建了一个目录，这个目录的名字叫 mysql_data，用于存储数据</li><li>/var/lib/mysql: 容器内的路径</li></ul><p>注意：即便是windows系统这么写也是正常的，因为它会存在 Docker Desktop 的 Linux VM 中。</p><h3 id="environment" tabindex="-1">environment <a class="header-anchor" href="#environment" aria-label="Permalink to &quot;environment&quot;">​</a></h3><p>例如：</p><p>MySQL 需要密码</p><p>以前：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -e MYSQL_ROOT_PASSWORD=123456</span></span></code></pre></div><p>Compose：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mysql:</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>        MYSQL_ROOT_PASSWORD: 123456</span></span>
<span class="line"><span>        MYSQL_DATABASE: todos</span></span></code></pre></div><ul><li>MYSQL_ROOT_PASSWORD：指定密码</li><li>MYSQL_DATABASE：指定数据库名称</li></ul><h3 id="depends-on" tabindex="-1">depends_on <a class="header-anchor" href="#depends-on" aria-label="Permalink to &quot;depends_on&quot;">​</a></h3><p>启动顺序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>depends_on:</span></span>
<span class="line"><span>    - mysql</span></span>
<span class="line"><span>    - redis</span></span></code></pre></div><p>表示先启动 MySQL 再启动 Spring Boot。</p><h3 id="network" tabindex="-1">network <a class="header-anchor" href="#network" aria-label="Permalink to &quot;network&quot;">​</a></h3><p>Compose 默认自动创建 Network</p><p>所以 Spring Boot 可以直接连接 MySQL。</p><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><blockquote><p>用于在终端执行控制 compose.yaml 的命令</p></blockquote><h3 id="docker-compose-up" tabindex="-1">docker compose up <a class="header-anchor" href="#docker-compose-up" aria-label="Permalink to &quot;docker compose up&quot;">​</a></h3><blockquote><p>启动所有服务</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>读取compose.yaml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创建Network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创建Volume</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>下载Image</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创建Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>全部启动</span></span></code></pre></div><h2 id="docker-compose-down" tabindex="-1">docker compose down <a class="header-anchor" href="#docker-compose-down" aria-label="Permalink to &quot;docker compose down&quot;">​</a></h2><blockquote><p>停止所有服务</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>停止Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>删除Container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>删除Network</span></span></code></pre></div><p>注意：Volume 默认不会删除</p><h2 id="java项目示例" tabindex="-1">Java项目示例 <a class="header-anchor" href="#java项目示例" aria-label="Permalink to &quot;Java项目示例&quot;">​</a></h2><p>假如：有一个Spring Boot项目，需要 MySQL 和 Redis。</p><p>MySQL 和 Redis使用Docker Hub上的镜像。</p><h3 id="_1-spring-boot-打包" tabindex="-1">1.Spring Boot 打包 <a class="header-anchor" href="#_1-spring-boot-打包" aria-label="Permalink to &quot;1.Spring Boot 打包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mvn clean package</span></span></code></pre></div><p>得到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target/</span></span>
<span class="line"><span>    mail.jar</span></span></code></pre></div><h3 id="_2-编写-dockerfile" tabindex="-1">2.编写 Dockerfile <a class="header-anchor" href="#_2-编写-dockerfile" aria-label="Permalink to &quot;2.编写 Dockerfile&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM eclipse-temurin:21-jre</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WORKDIR /app</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COPY target/mall.jar app.jar</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ENTRYPOINT [&quot;java&quot;,&quot;-jar&quot;,&quot;app.jar&quot;]</span></span></code></pre></div><h3 id="_3-编写-docker-compose-yml" tabindex="-1">3.编写 docker-compose.yml <a class="header-anchor" href="#_3-编写-docker-compose-yml" aria-label="Permalink to &quot;3.编写 docker-compose.yml&quot;">​</a></h3><p>在Spring Boot项目根目录，创建 <code>docker-compose.yml</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target</span></span>
<span class="line"><span>Dockerfile</span></span>
<span class="line"><span>pom.xml</span></span>
<span class="line"><span>docker-compose.yml      (+)</span></span></code></pre></div><p>编写内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mysql:</span></span>
<span class="line"><span>    image: mysql:8</span></span>
<span class="line"><span>    container_name: mysql</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      MYSQL_ROOT_PASSWORD: 123456</span></span>
<span class="line"><span>      MYSQL_DATABASE: mall</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;3306:3306&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    image: redis:7</span></span>
<span class="line"><span>    container_name: redis</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;6379:6379&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  app:</span></span>
<span class="line"><span>    build: .</span></span>
<span class="line"><span>    container_name: mall</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - &quot;8080:8080&quot;</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      - mysql</span></span>
<span class="line"><span>      - redis</span></span></code></pre></div><p><code>build .</code> 表示使用当前目录下的 Dockerfile 来构建镜像。</p><h2 id="执行" tabindex="-1">执行 <a class="header-anchor" href="#执行" aria-label="Permalink to &quot;执行&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker compose up</span></span></code></pre></div>`,84)]))}const m=a(l,[["render",i]]);export{u as __pageData,m as default};
