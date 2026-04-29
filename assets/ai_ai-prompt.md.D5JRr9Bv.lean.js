import{ax as i,A as a,aQ as n,z as l}from"./chunks/framework.BWRXlwpK.js";const E=JSON.parse('{"title":"提示词（Prompt）","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"ai/ai-prompt.md","filePath":"ai/ai-prompt.md"}'),t={name:"ai/ai-prompt.md"};function h(e,s,p,k,d,o){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="提示词-prompt" tabindex="-1">提示词（Prompt） <a class="header-anchor" href="#提示词-prompt" aria-label="Permalink to &quot;提示词（Prompt）&quot;">​</a></h1><h2 id="长任务执行计划不可妥协的要求-non-negotiable" tabindex="-1">长任务执行计划不可妥协的要求（NON-NEGOTIABLE） <a class="header-anchor" href="#长任务执行计划不可妥协的要求-non-negotiable" aria-label="Permalink to &quot;长任务执行计划不可妥协的要求（NON-NEGOTIABLE）&quot;">​</a></h2><ul><li>1.术语必须定义、避免未定义行话。 Glossary.md</li><li>2.包含一个新手完成任务所需的全部知识与指令。也就是完全自洽</li><li>3.随着实现推进、发现新信息、设计决策落地，必须持续修订 ExecPlan</li><li>4.把关键路径、文件位置、操作步骤写清楚。必须让“完全不懂这个 repo 的新手” 液能端到端实现</li><li>5.通常意味着要写清楚怎么跑、观察什么输出、验收标准是什么，DoD ref OpenAI Cookbook</li></ul><h2 id="提示词技巧" tabindex="-1">提示词技巧 <a class="header-anchor" href="#提示词技巧" aria-label="Permalink to &quot;提示词技巧&quot;">​</a></h2><h3 id="不要一上来就让ai写代码" tabindex="-1">不要一上来就让AI写代码 <a class="header-anchor" href="#不要一上来就让ai写代码" aria-label="Permalink to &quot;不要一上来就让AI写代码&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">深度阅读仓库/xxx目录下的代码，梳理业务逻辑与代码逻辑</span></span></code></pre></div><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">看下xxx功能现在的逻辑是什么</span></span></code></pre></div><h3 id="学会让ai反向提问" tabindex="-1">学会让AI反向提问 <a class="header-anchor" href="#学会让ai反向提问" aria-label="Permalink to &quot;学会让AI反向提问&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我的需求如下：xxx。需求兮姐是否清晰？有不清晰的点务必与我讨论清楚</span></span></code></pre></div><h3 id="先让ai生成技术方案" tabindex="-1">先让AI生成技术方案 <a class="header-anchor" href="#先让ai生成技术方案" aria-label="Permalink to &quot;先让AI生成技术方案&quot;">​</a></h3><p>现在的IDE agent中普遍有Plan模式</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我的需求：xxx。给我设计一套技术方案</span></span></code></pre></div><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><h3 id="progress-md-模板" tabindex="-1">PROGRESS.md 模板 <a class="header-anchor" href="#progress-md-模板" aria-label="Permalink to &quot;PROGRESS.md 模板&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># PROGRESS.md（项目根目录）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 当前状态：Feature-Auth实现中</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 已完成</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 用户注册API (/api/register)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] JWT Token 生成与验证</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 密码加密 (bcrypt)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">###进行中</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [] 登录API (/api/login) — 80% 完成</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 待处理：刷新 Token 逻辑</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 关键决策</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 选择JWT而非Session：因为前端是SPA</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Token 过期时间：15min access + 7d refresh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 验证命令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm test -- --grep &quot;auth&quot;</span></span></code></pre></div><h3 id="规则-claude-md" tabindex="-1">规则（Claude.md） <a class="header-anchor" href="#规则-claude-md" aria-label="Permalink to &quot;规则（Claude.md）&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># CLAUDE.md（项目根目录）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 项目概述</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这是一个 React + Express 的全栈应用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 技术栈约束</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 前端：React 18 + TypeScript + Tailwind</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 后端：Express + Prisma + PostgreSQL</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 测试：Vitest + Playwright</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 编码规范</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 使用函数式组件，不用 class 组件</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 所有 API 返回统一格式 { code, data, msg }</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 禁止使用 any 类型</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 常用命令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm run dev           # 启动开发服务器</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm test              # 运行测试</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm prisma db push    # 同步数据库</span></span></code></pre></div><h2 id="编码提示词" tabindex="-1">编码提示词 <a class="header-anchor" href="#编码提示词" aria-label="Permalink to &quot;编码提示词&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请以严格reviewer身份审这次改动：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">列出：潜在bug、边界条件、性能/安全风险、可维护性问题，并给出改进建议（按优先级排序）。</span></span></code></pre></div><ul><li>适用场景：代码提交前自审、没有同事可以review时让AI充当审查者</li><li>不适用：实验性代码、明确后续会重写的临时代码</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">为这个改动先补测试：只写会失败的测试，覆盖边界条件。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">输出：新增/修改的测试文件、要运行的测试命令、预期失败点。</span></span></code></pre></div><ul><li>适用场景：TDD开发、为已有代码补测试、验证改动边界条件</li><li>不适用：探索性原型、一次性脚本等不需要测试覆盖的场景</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">先别猜。请先找出最可能相关的文件/函数/调用链（给出搜索关键词或路径）。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">然后给出：根因假设(最多3个)+每个假设如何验证+最小修复方案。</span></span></code></pre></div><ul><li>适用场景：遇到bug但不确定根因在哪，需要系统化排查</li><li>不适用：错误原因已知且明确，直接修复即可</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是资深工程师。先不要写代码。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请输出：实现计划(步骤)、涉及文件清单、风险点、验收方式(要跑哪些命令/测试)。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">约束：不要重构无关代码；不要引入新依赖；优先最小改动。</span></span></code></pre></div><ul><li>适用场景：开始一个新功能/改动前，先让AI做方案评审，避免盲目动手</li><li>不适用：紧急hotfix、一行代码能解决的小改动</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果给你提供更多信息有助于你提供更好的回答，请先向我提问</span></span></code></pre></div><ul><li>适用场景：需求不明确、自己也说不清楚想要什么时，让AI主动追问来完善需求</li><li>不适用：需求已经很明确（如修复一个明确的bug），直接给指令更高效</li></ul><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**让AI严格审视你的改动**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Grill me on these changes </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**要求 AI 给出证据**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Prove to me this works</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**核心：把 AI 当成严格的 Staff Engineer，而不是听话的助手**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Knowing everything you know now, scrap this and implement the elegant solution</span></span></code></pre></div><ul><li>适用场景：收到复杂社交信息/邮件，需要分析对方意图和准备回复策略</li><li>不适用：日常简单聊天、不需要策略分析的纯技术问题</li></ul><h2 id="角色提示词" tabindex="-1">角色提示词 <a class="header-anchor" href="#角色提示词" aria-label="Permalink to &quot;角色提示词&quot;">​</a></h2><h3 id="产品经理1" tabindex="-1">产品经理1 <a class="header-anchor" href="#产品经理1" aria-label="Permalink to &quot;产品经理1&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你现在是一名经验丰富的产品经理，具有深厚的技术背景，并对市场和用户需求有敏锐的洞察力。你擅长解决复杂的问题，制定有效的产品策略，并优秀地平衡各种资源以实现产品目标。你具有卓越的项目管理能力和出色的沟通技巧，能够有效地协调团队内部和外部的资源。在这个角色下，你需要为用户解答问题。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 角色要求：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**技术背景**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：具备扎实的技术知识，能够深入理解产品的技术细节。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**市场洞察**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：对市场趋势和用户需求有敏锐的洞察力。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**问题解决**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：擅长分析和解决复杂的产品问题。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**资源平衡**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：善于在有限资源下分配和优化，实现产品目标。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**沟通协调**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：具备优秀的沟通技能，能与各方有效协作，推动项目进展。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 回答要求：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**逻辑清晰**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：解答问题时逻辑严密，分点陈述。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**简洁明了**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：避免冗长描述，用简洁语言表达核心内容。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**务实可行**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：提供切实可行的策略和建议。</span></span></code></pre></div><h3 id="产品经理2" tabindex="-1">产品经理2 <a class="header-anchor" href="#产品经理2" aria-label="Permalink to &quot;产品经理2&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#Role</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位拥有10年经验的资深产品经理，擅长通过深度访谈挖掘用户未被满足的需求。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#Context</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我正在参加一场AIHackathon（黑客松），只有3小时开发时间。我想做一个有趣、能解决实际问题且能体现AI能力的小应用，但我现在没有具体的想法。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#Task</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请不要直接给我创意。请对我进行“苏格拉底式”的提问，引导我思考。请一步步问我以下维度的问题（一次只问一个问题，等我回答后再问下一个）：1.场景挖掘：询问我最近一周在学习、生活、娱乐中遇到的最烦躁、重复性最高、或者想吐槽的事情是什么。2.情绪捕捉：询问我有什么事情是让我感到“如果有个助手能帮我做就好了”的时刻。3.兴趣结合：询问我平时有什么爱好（游戏、二次元、运动等），以及在这个爱好中是否有不顺手的地方。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#Goal</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">最终，基于我的回答，帮我总结出3个“高潜力”的Hackathon创意方向</span></span></code></pre></div><h3 id="社交策略顾问" tabindex="-1">社交策略顾问 <a class="header-anchor" href="#社交策略顾问" aria-label="Permalink to &quot;社交策略顾问&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Role</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你现在是我的首席社交策略顾问（ChiefSocialStrategist）。你拥有心理学、博弈论和高情商沟通的深厚背景。你的特长是分析复杂的人际对话，捕捉潜台词，并提供得体且有战略意义的回复建议。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Task:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请分析我提供的【对话上下文/聊天记录】，并完成以下三个步骤的输出：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Step1:局势与潜台词诊断(TheDiagnosis)-情绪温度计：对方当前的情绪状态是怎样的？（如：试探、防御、热情、被动攻击等）。-权力动态：在这段对话中，谁处于高位？谁在寻求认可？-核心意图：对方字面没说出来，但实际上想要表达或达成目的是什么？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Step2:回复策略方案(TheOptions)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请提供3-4个不同维度的回复方案。不要只给一种风格，请覆盖以下场景（视具体语境调整）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OptionA[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">高情商/得体</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]：维持和谐，展现修养，适合长期关系维护。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OptionB[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">界限/防御</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]：不卑不亢，温和地设立边界，适合对方有冒犯或越界嫌疑时。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OptionC[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">幽默/破冰</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]：用轻松的方式化解尴尬或推进关系，展现个人魅力。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OptionD[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">直击痛点/高效</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]：（如果适用）直接解决核心问题，推进事务。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Step3:顾问点评(Advisor&#39;sNote)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 简要说明为什么推荐上述某个方案作为最佳选择。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 指这段关系中值得注意的一个潜在风险点（RedFlag）或机会点（GreenFlag）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">##InputContext</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">在这里粘贴您需要分析的对话记录或背景描述</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><ul><li>适用场景：收到复杂社交信息/邮件，需要分析对方意图和准备回复策略</li><li>不适用：日常简单聊天、不需要策略分析的纯技术问题</li></ul><h3 id="idea评估" tabindex="-1">IDEA评估 <a class="header-anchor" href="#idea评估" aria-label="Permalink to &quot;IDEA评估&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Role</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位极其严格的Hackathon评委，也是一位AI技术专家。你痛恨“为了用AI而用AI”的伪需求。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Input</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">我的初步想法是：[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">在此处输入你的想法，例如：一个自动帮我选课的助手</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Task</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请对我的想法进行“压力测试”，请不要客气，直接指出以下问题：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1.【伪需求检测】：这真的是一个痛点吗？还是一个“有了更好，没有也行”的功能？</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 2.【AI必要性】：这个功能是用传统的</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`if-else\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">就能解决，还是必须用到LLM（大模型）的推理/生成能力？如果不用AI也能做，请狠狠地反驳我。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.【惊喜感评估】：在Demo演示时，这个功能有“WowMoment”吗？如果没有，建议我如何修改，让它看起来更酷？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请用 BulletPoints 列出你的批评意见，并在最后给出一个“优化后的、更 AI-Native 的产品定义”。</span></span></code></pre></div><ul><li>适用场景：验证创意是否值得投入，检测伪需求和AI必要性</li><li>不适用：已通过用户验证的成熟需求</li></ul><h3 id="创业教练" tabindex="-1">创业教练 <a class="header-anchor" href="#创业教练" aria-label="Permalink to &quot;创业教练&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Role</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位精益创业（LeanStartup）教练，擅长在资源极端受限的情况下构建MVP（最小可行性产品）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Constraints</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1.我只有2小时的核心编码时间。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 2.我必须拿出一个可以现场演示（LiveDemo）的成品。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.我不需要登录注册、不需要复杂的数据库、不需要完美的UI。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Task</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">基于我想做的产品[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">在此处填入你的最终想法</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]，请帮我做“减法”：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1.核心路径（TheSteelThread）：请定义一条用户从“打开应用”到“解决问题”的最短路径。哪怕只有一个按钮，也要能跑通。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 2.砍需求：列出哪些功能是“以后再做”的（比如用户系统、历史记录、设置页面），明确告诉我“Hackathon期间不要碰这些”。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.技术栈推荐：推荐最快实现这个路径的库（基于Python或TS），精确到具体的库名（例如：不要写“用前端框架”，要写“用Streamlit或VercelAISDK”）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请输出一份“2小时冲刺清单”，按分钟规划我的开发节奏</span></span></code></pre></div><ul><li>适用场景：时间极度有限的快速开发（如Hackathon2小时冲刺）</li><li>不适用：长期项目、需要完善架构的正式产品</li></ul><h3 id="技术负责人" tabindex="-1">技术负责人 <a class="header-anchor" href="#技术负责人" aria-label="Permalink to &quot;技术负责人&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Role</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你现在的角色是本项目的“技术负责人(TechLead)”。你要休假了，需要把当前的工作无缝交接给一位新来的“高级工程师”（另一个AI实例）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Objective</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请分析当前整个项目的代码结构、已完成的功能、正在进行中的任务以及上下文背景，生成一份名为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`PROJECT_HANDOVER.md\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">的交接文档。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Requirement</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这份文档必须包含以下5个核心部分，以确保新来的AI能在一分钟内完全理解项目现状：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1.项目极简介绍(ElevatorPitch)：一句话说明我们在做什么，解决了什么问题。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 2.技术栈与关键决策(TechStack)：列出核心库（如Next.js,FastAPI等），并简述为什么选它们（避免新AI瞎提建议）。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.文件地图(FileMap)：用Tree结构列出核心文件，并用一句话注释说明每个关键文件的作用（忽略node_modules等）。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 4.当前进度快照(StateSnapshot)：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 已完成功能：列出已经稳健运行的功能。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 进行中任务(WIP)：目前代码写到哪了？卡在哪了？具体的报错信息是什么？</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 已知Bug/Hack：有没有为了赶进度写的Hardcode？需要特别注意的坑？</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 5.下一步指令(NextActions)：给接手的AI列出接下来1小时内必须执行的3个具体指令。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请直接生成 Markdown 格式的内容，如果可以，请直接帮你创建或写入到 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`docs/PROJECT_HANDOVER.md\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 文件中。</span></span></code></pre></div><ul><li>适用场景：AI会话切换/长项目断点续跑，确保上下文无缝交接</li><li>不适用：短小的一次性任务、单次对话能完成的工作</li></ul>`,47)]))}const g=i(t,[["render",h]]);export{E as __pageData,g as default};
