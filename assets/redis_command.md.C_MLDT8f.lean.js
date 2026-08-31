import{ax as a,A as p,aQ as n,z as l}from"./chunks/framework.BWRXlwpK.js";const S=JSON.parse('{"title":"常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"redis/command.md","filePath":"redis/command.md","lastUpdated":1788144574000}'),i={name:"redis/command.md"};function e(t,s,c,r,d,o){return l(),p("div",null,s[0]||(s[0]=[n(`<h1 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h1><ul><li><p>Set [key] [value]: 存字符串</p></li><li><p>Get [key]: 取字符串</p></li><li><p>Del [key]: 删除字符串</p></li><li><p>HSET [key] [field] [value]: 存hash</p></li><li><p>HGET [key] [field]: 取hash</p></li><li><p>HDEL [key] [field]: 删除hash</p></li><li><p>HGETALL [key]: 取所有hash</p></li><li><p>LPUSH [key] [value]: 存list</p></li><li><p>LRANGE [key] [start] [end]: 取list</p></li><li><p>LPOP [key]: 取list第一个元素</p></li><li><p>RPOP [key]: 取list最后一个元素</p></li><li><p>SADD [key] [value]: 存set</p></li><li><p>SMEMBERS [key]: 取set</p></li><li><p>SREM [key] [value]: 删除set</p></li><li><p>SISMBERS [key] [value]: 判断是否在set中</p></li><li><p>ZADD [key] [score] [member]: 存zset</p></li><li><p>ZRANGE [key] [start] [end]: 取zset</p></li><li><p>ZRANGE [key] [start] [end] WITHSCORES: 取zset, WITHSCORES 表示同时返回分数</p></li><li><p>ZREM [key] [member]: 删除zset</p></li><li><p>ZREVRANGE [key] [start] [end] WITHSCORES: 取start 到 end 位置的值</p></li><li><p>KEYS * : 查看所有key</p></li><li><p>KEYS user:*: 查看user开头的key（模糊查询）</p></li><li><p>EXISTS [key]: 判断key是否存在</p></li><li><p>EXPIRE [key] [seconds]: 设置过期时间</p></li><li><p>TTL [key]: 查看剩余过期时间</p></li><li><p>MULTI: 开启事务</p></li><li><p>EXEC: 提交事务</p></li><li><p>DISCARD: 取消事务</p></li><li><p>SUBSCRIBE [channel]: 订阅频道</p></li><li><p>PUBLISH [channel] [message]: 发布消息</p></li><li><p>INFO memory : 查看内存信息</p></li><li><p>INFO keyspace : 查看数据库信息</p></li><li><p>CLIENT LIST : 查看客户端连接信息</p></li><li><p>PING : 测试连接，正常会返回 <code>PONG</code></p></li><li><p>SELECT [index]: 切换数据库，默认是0号库</p></li><li><p>FLUSHDB : 清空当前数据库</p></li><li><p>FLUSHALL : 清空所有数据库，<strong>生产环境极其危险</strong>。</p></li></ul><h2 id="java-开发中需要掌握的命令" tabindex="-1">Java 开发中需要掌握的命令 <a class="header-anchor" href="#java-开发中需要掌握的命令" aria-label="Permalink to &quot;Java 开发中需要掌握的命令&quot;">​</a></h2><p>如果是 Spring Boot 项目，应优先掌握</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SET</span></span>
<span class="line"><span>GET</span></span>
<span class="line"><span>DEL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXPIRE</span></span>
<span class="line"><span>TTL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HSET</span></span>
<span class="line"><span>HGET</span></span>
<span class="line"><span>HGETALL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LPUSH</span></span>
<span class="line"><span>RPOP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SADD</span></span>
<span class="line"><span>SISMEMBER</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ZADD</span></span>
<span class="line"><span>ZREVRANGE</span></span>
<span class="line"><span>WITHSCORES</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INCR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXISTS</span></span></code></pre></div><p>这十几个命令基本已经覆盖：</p><ul><li>登录 Token</li><li>验证码</li><li>用户缓存</li><li>商品缓存</li><li>在线用户</li><li>点赞功能</li><li>排行榜</li><li>消息队列</li><li>分布式锁</li><li>计数器</li></ul><p>等绝大多数实际业务场景。</p>`,8)]))}const k=a(i,[["render",e]]);export{S as __pageData,k as default};
