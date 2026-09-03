import{ax as a,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const u=JSON.parse('{"title":"项目","description":"","frontmatter":{},"headers":[],"relativePath":"qa/project.md","filePath":"qa/project.md","lastUpdated":1788400509000}'),l={name:"qa/project.md"};function i(t,s,c,o,d,h){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="项目" tabindex="-1">项目 <a class="header-anchor" href="#项目" aria-label="Permalink to &quot;项目&quot;">​</a></h1><h2 id="最近负责的项目" tabindex="-1">最近负责的项目 <a class="header-anchor" href="#最近负责的项目" aria-label="Permalink to &quot;最近负责的项目&quot;">​</a></h2><p>假如是个考勤系统：</p><p>员工每天的考勤管理，包括上下班时间、休假、加班、班次、勤怠申請和审批等。</p><h2 id="负责项目中的哪些模块" tabindex="-1">负责项目中的哪些模块 <a class="header-anchor" href="#负责项目中的哪些模块" aria-label="Permalink to &quot;负责项目中的哪些模块&quot;">​</a></h2><p>我主要负责勤务相关功能的开发和维护。</p><p>后端主要负责 Java 的业务逻辑、SQL 和数据库处理，有时候也需要修改存储过程。</p><p>前端主要使用 Vue 和 JavaScript，负责页面逻辑、接口调用、数据处理以及一些既有功能的 Bug 修复。</p><h2 id="项目中最难的问题是什么" tabindex="-1">项目中最难的问题是什么 <a class="header-anchor" href="#项目中最难的问题是什么" aria-label="Permalink to &quot;项目中最难的问题是什么&quot;">​</a></h2><p>理解既有系统的数据流和业务规则。</p><h2 id="怎么解决的" tabindex="-1">怎么解决的 <a class="header-anchor" href="#怎么解决的" aria-label="Permalink to &quot;怎么解决的&quot;">​</a></h2><p>先尝试复现问题，然后根据用户操作确定问题发生在哪个环节。</p><p>如果是前端问题，我会通过浏览器的 Developer Tools 查看事件、Network、请求参数和返回值。</p><p>如果是后端问题，我会从接口开始追踪 Java 的业务逻辑，再确认 SQL 和数据库数据。</p><p>如果涉及 Oracle，我会直接执行 SQL 对比操作前后的数据，确认到底是哪一步导致了异常。</p><p>所以我的排查方式通常是：</p><p>页面 → JavaScript → API → Java → SQL → 数据结果。</p><h2 id="项目中有没有出现过性能问题" tabindex="-1">项目中有没有出现过性能问题 <a class="header-anchor" href="#项目中有没有出现过性能问题" aria-label="Permalink to &quot;项目中有没有出现过性能问题&quot;">​</a></h2><p>判断是前端、接口、Java 业务逻辑还是数据库的问题，然后重点检查 SQL 执行时间和查询数据量。</p><p>如果确定是数据库问题，就会进一步检查 SQL 条件、JOIN、索引以及是否存在不必要的数据查询。</p><p>减少不必要的查询字段、增加合理的查询条件、避免重复查询，以及针对查询条件检查索引是否合理。优化之后再通过实际数据对比 SQL 执行时间。</p><h2 id="有没有遇到过慢sql" tabindex="-1">有没有遇到过慢SQL <a class="header-anchor" href="#有没有遇到过慢sql" aria-label="Permalink to &quot;有没有遇到过慢SQL&quot;">​</a></h2><p>我排查慢 SQL 时，一般首先确认 SQL 本身的执行时间，然后检查 WHERE 条件、JOIN、排序以及是否使用了索引。</p><p>Oracle 的话还会通过执行计划确认数据库实际采用了什么执行方式，比如是否进行了全表扫描，以及索引有没有真正被使用。</p><h2 id="如何排查线上问题" tabindex="-1">如何排查线上问题 <a class="header-anchor" href="#如何排查线上问题" aria-label="Permalink to &quot;如何排查线上问题&quot;">​</a></h2><p>我排查线上问题一般会按照“现象 → 日志 → 请求 → 代码 → 数据库 → 定位原因 → 修复验证”的顺序进行。</p><p>首先确认问题现象，比如是接口超时、页面报错还是数据异常。</p><p>然后查看浏览器 Network 和后端日志，确认请求参数、返回结果以及异常堆栈。</p><p>如果确定是后端问题，就继续追踪 Java 业务代码和 SQL；如果涉及数据库，就检查实际数据和 SQL 执行情况。</p><p>最后确定根因后进行修复，并通过测试和日志确认问题已经解决。</p><h2 id="如果接口突然变慢-怎么排查" tabindex="-1">如果接口突然变慢，怎么排查 <a class="header-anchor" href="#如果接口突然变慢-怎么排查" aria-label="Permalink to &quot;如果接口突然变慢，怎么排查&quot;">​</a></h2><p>先确认是所有接口都变慢，还是某一个接口变慢。</p><p>如果所有接口都变慢，我会优先检查服务器资源、数据库连接池、网络等基础设施。</p><p>如果只有一个接口变慢，我会查看这个接口的日志和执行时间，然后进一步判断是 Java 业务逻辑还是 SQL 导致的。</p><p>如果发现 SQL 慢，就查看执行计划、索引和数据量。</p><p>如果 SQL 正常，再检查 Java 中是否存在循环查询、重复调用接口或者大量数据处理等问题。</p><h2 id="如果cpu突然100-怎么排查" tabindex="-1">如果CPU突然100%，怎么排查 <a class="header-anchor" href="#如果cpu突然100-怎么排查" aria-label="Permalink to &quot;如果CPU突然100%，怎么排查&quot;">​</a></h2><p>首先确认是不是数据库导致的，然后查看当前执行中的 SQL，找到 CPU 占用比较高的 SQL。</p><p>接下来查看这些 SQL 的执行计划，判断是否存在全表扫描、错误的 JOIN、索引失效或者一次查询处理了过多数据。</p><p>如果是异常 SQL，可以先采取限流、停止异常任务等方式降低影响，再对 SQL 本身进行优化。</p><h2 id="怎么判断到底是前端还是后端慢" tabindex="-1">怎么判断到底是前端还是后端慢？ <a class="header-anchor" href="#怎么判断到底是前端还是后端慢" aria-label="Permalink to &quot;怎么判断到底是前端还是后端慢？&quot;">​</a></h2><p>通过浏览器 Network 来判断。</p><p>如果页面本身渲染很慢，但是接口已经很快返回，那么问题更可能在前端。</p><p>如果 Network 中接口的 Waiting 时间很长，那么继续查看后端日志。</p><p>后端如果整体处理时间很长，就继续判断是 Java 业务逻辑还是 SQL。</p><h2 id="如果内存不断上涨-怎么排查" tabindex="-1">如果内存不断上涨，怎么排查 <a class="header-anchor" href="#如果内存不断上涨-怎么排查" aria-label="Permalink to &quot;如果内存不断上涨，怎么排查&quot;">​</a></h2><p>先确认是 JVM 堆内存不断上涨，还是堆外内存上涨。 如果是堆内存，就通过 GC 日志、Heap Dump 等方式分析哪些对象一直没有被回收，判断是否存在内存泄漏。</p><p>然后结合代码检查是否存在静态集合持有对象、缓存没有过期、ThreadLocal 没有清理、监听器没有释放、大量对象长期被引用等问题。</p><p>最后修复后通过压测或者观察 GC 和堆内存曲线，确认内存能够正常回落。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>内存持续上涨</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>确认 JVM / 堆外</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>查看 JVM 内存</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>是否频繁 Full GC？</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>生成 Heap Dump</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>分析对象数量 / 占用</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>查看 GC Roots</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>找到是谁一直引用对象</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>定位代码</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>修复</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>再次观察</span></span></code></pre></div><h2 id="如果数据库连接池耗尽-怎么排查" tabindex="-1">如果数据库连接池耗尽，怎么排查 <a class="header-anchor" href="#如果数据库连接池耗尽-怎么排查" aria-label="Permalink to &quot;如果数据库连接池耗尽，怎么排查&quot;">​</a></h2><p>先确认连接池是不是已经达到最大连接数，然后检查数据库连接是否长时间没有释放，以及哪些 SQL 执行时间比较长。</p><p>重点检查代码中是否存在连接没有关闭、事务没有及时提交、慢 SQL、连接池配置过小或者并发请求突然增加等问题。</p><p>如果使用 Spring Boot，一般还会查看连接池监控，例如 HikariCP 的 active、idle、pending 等指标。</p><h2 id="秒杀系统如何设计" tabindex="-1">秒杀系统如何设计 <a class="header-anchor" href="#秒杀系统如何设计" aria-label="Permalink to &quot;秒杀系统如何设计&quot;">​</a></h2><p>秒杀系统的核心问题是高并发和库存有限。我会通过 Redis 做热点数据和库存预扣，MQ 做异步削峰，数据库做最终数据落库，同时配合限流、防重复提交和防超卖。</p><h2 id="如何防止超卖" tabindex="-1">如何防止超卖 <a class="header-anchor" href="#如何防止超卖" aria-label="Permalink to &quot;如何防止超卖&quot;">​</a></h2><p>核心是让库存扣减操作具有原子性，不能先查询库存再更新库存。</p><p><strong>数据库方案</strong></p><p>可以直接使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>UPDATE product</span></span>
<span class="line"><span>SET stock = stock - 1</span></span>
<span class="line"><span>WHERE id = 100</span></span>
<span class="line"><span>AND stock &gt; 0;</span></span></code></pre></div><p>然后判断：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>影响行数 = 1</span></span>
<span class="line"><span>→ 扣减成功</span></span>
<span class="line"><span></span></span>
<span class="line"><span>影响行数 = 0</span></span>
<span class="line"><span>→ 库存不足</span></span></code></pre></div><p>这样数据库的更新操作本身就是原子的。</p><p>Redis 方案</p><p>秒杀场景通常可以使用 Redis Lua 脚本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>判断库存 &gt; 0</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>库存 - 1</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>返回成功</span></span></code></pre></div><p>这几个操作放在一个 Lua 脚本中原子执行。</p><blockquote><p><strong>防止超卖的关键是库存扣减必须是原子操作，可以通过数据库 UPDATE ... WHERE stock &gt; 0，或者 Redis + Lua 实现。</strong></p></blockquote><h2 id="如何设计一个分布式锁" tabindex="-1">如何设计一个分布式锁 <a class="header-anchor" href="#如何设计一个分布式锁" aria-label="Permalink to &quot;如何设计一个分布式锁&quot;">​</a></h2><p>分布式锁主要用于多个服务器之间协调对同一资源的访问。</p><p>Redis 实现：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SET lock:product:100</span></span>
<span class="line"><span>    uniqueId</span></span>
<span class="line"><span>    NX</span></span>
<span class="line"><span>    EX 30</span></span></code></pre></div><p>含义：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NX</span></span>
<span class="line"><span>→ Key不存在才能设置</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>EX 30</span></span>
<span class="line"><span>→ 30秒自动过期</span></span></code></pre></div><blockquote><p><strong>Redis 分布式锁通常通过 SET NX EX 获取锁，用唯一 value 标识持有者，释放时通过 Lua 脚本保证“判断锁归属 + 删除锁”的原子性</strong></p></blockquote><h2 id="如何实现接口幂等" tabindex="-1">如何实现接口幂等 <a class="header-anchor" href="#如何实现接口幂等" aria-label="Permalink to &quot;如何实现接口幂等&quot;">​</a></h2><p>接口幂等：同一个请求执行一次和执行多次，最终结果应该一致。</p><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户点击支付</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>请求发送两次</span></span></code></pre></div><p>不能扣款两次</p><p>常见方案：</p><p><strong>① 唯一业务 ID</strong></p><p>请求携带：<code>requestId = abc123</code></p><p>服务器记录：<code>abc123 → 已处理</code></p><p>再次收到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>abc123</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>已经处理</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>直接返回</span></span></code></pre></div><p><strong>② 数据库唯一约束</strong></p><p>例如订单号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>UNIQUE(order_no)</span></span></code></pre></div><p>重复创建：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一次 → 成功</span></span>
<span class="line"><span>第二次 → 唯一约束失败</span></span></code></pre></div><p>③ Redis</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SET request:abc123 1 NX EX 300</span></span></code></pre></div><p>成功：<code>→ 第一次请求</code></p><p>失败：<code>→ 重复请求</code></p><blockquote><p><strong>接口幂等通常通过唯一业务 ID、数据库唯一约束或者 Redis 去重实现。</strong></p></blockquote><h2 id="如何设计一个订单系统" tabindex="-1">如何设计一个订单系统 <a class="header-anchor" href="#如何设计一个订单系统" aria-label="Permalink to &quot;如何设计一个订单系统&quot;">​</a></h2><p>一个简单的订单系统可以拆成：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>订单服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>库存服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>支付服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>物流服务</span></span></code></pre></div><p>订单状态：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>待支付</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>已支付</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>待发货</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>已发货</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>已完成</span></span></code></pre></div><p>整体架构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>                用户</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>              网关/Nginx</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>              订单服务</span></span>
<span class="line"><span>            ↙    ↓    ↘</span></span>
<span class="line"><span>         Redis   MQ    DB</span></span>
<span class="line"><span>                  ↓</span></span>
<span class="line"><span>          ┌───────┼───────┐</span></span>
<span class="line"><span>          ↓       ↓       ↓</span></span>
<span class="line"><span>        库存     支付     通知</span></span></code></pre></div><p>创建订单</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>参数校验</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>幂等检查</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>创建订单</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>扣库存</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>发送消息</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>返回订单</span></span></code></pre></div><h2 id="如何保证订单和库存最终一致" tabindex="-1">如何保证订单和库存最终一致 <a class="header-anchor" href="#如何保证订单和库存最终一致" aria-label="Permalink to &quot;如何保证订单和库存最终一致&quot;">​</a></h2><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>订单创建成功</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>库存扣减失败</span></span></code></pre></div><p>就产生：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>订单：成功</span></span>
<span class="line"><span>库存：没有扣</span></span></code></pre></div><p>可以使用：</p><blockquote><p>MQ + 本地事务 + 重试 + 幂等。</p></blockquote><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>订单服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>本地事务</span></span>
<span class="line"><span> ├─ 创建订单</span></span>
<span class="line"><span> └─ 保存消息记录</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>提交</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>MQ</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>库存服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>扣库存</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>成功</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>ACK</span></span></code></pre></div><p>如果 MQ 或库存服务暂时失败：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>失败</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>重试</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>再次消费</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>成功</span></span></code></pre></div><p>消费者必须保证幂等。</p><blockquote><p><strong>通过本地事务保证订单和消息记录的一致，再通过 MQ 异步通知库存服务，并结合重试和消费幂等，最终保证订单和库存达到一致状态。</strong></p></blockquote><h2 id="如何设计一个高并发接口" tabindex="-1">如何设计一个高并发接口 <a class="header-anchor" href="#如何设计一个高并发接口" aria-label="Permalink to &quot;如何设计一个高并发接口&quot;">​</a></h2><p>应该考虑：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Nginx</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>限流</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>应用集群</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Redis</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>MQ</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>数据库</span></span></code></pre></div><p>主要措施：</p><ul><li>① 缓存</li><li>② 限流</li><li>③ 异步</li><li>④ 削峰</li><li>⑤ 数据库优化</li><li>⑥ 水平扩展</li><li>⑦ 连接池</li><li>⑧ 避免重复查询</li></ul><blockquote><p>高并发接口通常通过缓存减少数据库压力，通过限流保护系统，通过 MQ 异步削峰，并结合应用集群和数据库优化提高整体吞吐能力。</p></blockquote><h2 id="如何实现接口限流" tabindex="-1">如何实现接口限流 <a class="header-anchor" href="#如何实现接口限流" aria-label="Permalink to &quot;如何实现接口限流&quot;">​</a></h2><p>常见算法：</p><ul><li>固定窗口</li><li>滑动窗口</li><li>漏桶</li><li>令牌桶</li></ul><p>实际项目中常见：</p><blockquote><p>Redis + Lua / 网关限流 / 令牌桶。</p></blockquote><h2 id="如果-redis-挂了怎么办" tabindex="-1">如果 Redis 挂了怎么办 <a class="header-anchor" href="#如果-redis-挂了怎么办" aria-label="Permalink to &quot;如果 Redis 挂了怎么办&quot;">​</a></h2><p>Redis 挂掉之后，要根据 Redis 在系统中的角色决定处理方式。</p><p><strong>如果 Redis 只是缓存：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Redis</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>挂掉</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>查询数据库</span></span></code></pre></div><p>但是需要注意：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>大量请求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>全部打数据库</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>数据库可能被打垮</span></span></code></pre></div><p><strong>如果 Redis 是分布式锁</strong></p><p>就不能简单绕过 Redis。</p><p>应该：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Redis故障</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>暂时拒绝相关业务</span></span></code></pre></div><blockquote><p>如果 Redis 只是缓存，可以降级到数据库并配合限流；如果 Redis 承担分布式锁等核心能力，则需要高可用部署，不能直接绕过 Redis。</p></blockquote><h2 id="如果-mq-挂了怎么办" tabindex="-1">如果 MQ 挂了怎么办 <a class="header-anchor" href="#如果-mq-挂了怎么办" aria-label="Permalink to &quot;如果 MQ 挂了怎么办&quot;">​</a></h2><p>MQ 是核心链路还是异步非核心链路。</p><p><strong>如果是非核心业务：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MQ挂了</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>记录本地消息</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>后台重试</span></span></code></pre></div><blockquote><p>MQ 挂掉时，不能让核心业务无限等待，可以通过本地消息表保存待发送消息，MQ 恢复后进行重试，同时做好告警和降级。</p></blockquote><h2 id="如果数据库挂了怎么办" tabindex="-1">如果数据库挂了怎么办 <a class="header-anchor" href="#如果数据库挂了怎么办" aria-label="Permalink to &quot;如果数据库挂了怎么办&quot;">​</a></h2><p>首先：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据库挂了</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>不能继续正常执行数据库写操作</span></span></code></pre></div><p>应该：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据库高可用</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>主从 / 集群</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>故障转移</span></span></code></pre></div><p>应用层：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据库异常</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>快速失败</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>限流</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>降级</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>避免请求不断重试把系统拖死</span></span></code></pre></div><p><strong>如果只是查询：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据库挂了</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Redis有缓存</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>可以返回缓存</span></span></code></pre></div><p><strong>如果是核心写操作：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>数据库挂了</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>不能假装成功</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>返回系统繁忙</span></span></code></pre></div><blockquote><p>数据库故障首先依赖主从、集群等高可用方案进行故障转移；应用层需要超时、限流、降级和快速失败，避免数据库故障进一步扩散。</p></blockquote><h2 id="什么是降级" tabindex="-1">什么是降级 <a class="header-anchor" href="#什么是降级" aria-label="Permalink to &quot;什么是降级&quot;">​</a></h2><p>当系统某个功能出现故障、超时或压力过大时，暂时关闭非核心功能，保证核心功能还能正常运行。</p><p>比如电商网站：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户下单</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>订单服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>库存服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>推荐服务</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>优惠券服务</span></span></code></pre></div><p>如果推荐服务挂了：推荐服务 ❌</p><p>不要让整个下单流程失败，而是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>推荐服务 ❌</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>    降级</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>不显示推荐商品</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>订单正常创建</span></span></code></pre></div>`,165)]))}const b=a(l,[["render",i]]);export{u as __pageData,b as default};
