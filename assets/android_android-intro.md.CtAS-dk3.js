import{ax as a,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const g=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"android/android-intro.md","filePath":"android/android-intro.md","lastUpdated":1788400509000}'),i={name:"android/android-intro.md"};function l(t,s,c,o,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MyApplication/</span></span>
<span class="line"><span>├── app/                    // 主模块（一个应用）</span></span>
<span class="line"><span>│   ├── src/</span></span>
<span class="line"><span>│   │   ├── main/</span></span>
<span class="line"><span>│   │   │   ├── java/       // Java/Kotlin源码</span></span>
<span class="line"><span>│   │   │   │   └── com/example/demo/</span></span>
<span class="line"><span>│   │   │   │       ├── MainActivity.kt</span></span>
<span class="line"><span>│   │   │   │       ├── ui/</span></span>
<span class="line"><span>│   │   │   │       ├── data/</span></span>
<span class="line"><span>│   │   │   │       ├── network/</span></span>
<span class="line"><span>│   │   │   │       └── utils/</span></span>
<span class="line"><span>│   │   │   │</span></span>
<span class="line"><span>│   │   │   ├── res/        // 所有资源文件</span></span>
<span class="line"><span>│   │   │   │   ├── layout/</span></span>
<span class="line"><span>│   │   │   │   ├── drawable/</span></span>
<span class="line"><span>│   │   │   │   ├── mipmap/</span></span>
<span class="line"><span>│   │   │   │   ├── values/</span></span>
<span class="line"><span>│   │   │   │   ├── menu/</span></span>
<span class="line"><span>│   │   │   │   ├── xml/</span></span>
<span class="line"><span>│   │   │   │   └── anim/</span></span>
<span class="line"><span>│   │   │   │</span></span>
<span class="line"><span>│   │   │   ├── assets/     // 原始资源</span></span>
<span class="line"><span>│   │   │   ├── AndroidManifest.xml</span></span>
<span class="line"><span>│   │   │   └── jniLibs/    // so库</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   ├── test/           // 单元测试</span></span>
<span class="line"><span>│   │   └── androidTest/    // UI测试</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── build.gradle</span></span>
<span class="line"><span>│   └── proguard-rules.pro</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── gradle/</span></span>
<span class="line"><span>├── build.gradle</span></span>
<span class="line"><span>├── settings.gradle</span></span>
<span class="line"><span>├── gradle.properties</span></span>
<span class="line"><span>└── local.properties</span></span></code></pre></div><h2 id="重点目录" tabindex="-1">重点目录 <a class="header-anchor" href="#重点目录" aria-label="Permalink to &quot;重点目录&quot;">​</a></h2><h3 id="java-kotlin" tabindex="-1">java/kotlin <a class="header-anchor" href="#java-kotlin" aria-label="Permalink to &quot;java/kotlin&quot;">​</a></h3><p>这里放业务代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>java/</span></span>
<span class="line"><span>└── com.example.demo</span></span>
<span class="line"><span>    ├── MainActivity.kt</span></span>
<span class="line"><span>    ├── LoginActivity.kt</span></span>
<span class="line"><span>    ├── ui/</span></span>
<span class="line"><span>    ├── network/</span></span>
<span class="line"><span>    ├── database/</span></span>
<span class="line"><span>    ├── model/</span></span>
<span class="line"><span>    ├── repository/</span></span>
<span class="line"><span>    ├── service/</span></span>
<span class="line"><span>    └── utils/</span></span></code></pre></div><h3 id="res" tabindex="-1">res <a class="header-anchor" href="#res" aria-label="Permalink to &quot;res&quot;">​</a></h3><p>Android 所有资源都放在这里</p><p><strong>layout</strong></p><p>页面布局</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>activity_main.xml</span></span>
<span class="line"><span>activity_login.xml</span></span>
<span class="line"><span>fragment_home.xml</span></span></code></pre></div><p>使用时：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setContentView</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(R.layout.activity_main);</span></span></code></pre></div><p><strong>drawable</strong></p><p>图片</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>logo.png</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ic_home.xml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>shape_button.xml</span></span></code></pre></div><ul><li>shape</li><li>selector</li><li>vector</li></ul><p>也都放在这里</p><p><strong>mipmap</strong></p><p>App 图标</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ic_launcher.png</span></span></code></pre></div><p><strong>values</strong></p><p>各种配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>values</span></span>
<span class="line"><span>├── strings.xml</span></span>
<span class="line"><span>├── colors.xml</span></span>
<span class="line"><span>├── dimens.xml</span></span>
<span class="line"><span>├── themes.xml</span></span>
<span class="line"><span>└── styles.xml</span></span></code></pre></div><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;string name=&quot;app_name&quot;&gt;</span></span>
<span class="line"><span>Demo</span></span>
<span class="line"><span>&lt;/string&gt;</span></span></code></pre></div><p>使用时：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(R.string.app_name)</span></span></code></pre></div><p><strong>menu</strong></p><p>菜单</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>main_menu.xml</span></span></code></pre></div><p><strong>xml</strong></p><p>配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>network_security_config.xml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backup_rules.xml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>file_paths.xml</span></span></code></pre></div><p><strong>anim</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>slide_in.xml</span></span>
<span class="line"><span>fade_out.xml</span></span></code></pre></div><h3 id="androidmanifest-xml" tabindex="-1">AndroidManifest.xml <a class="header-anchor" href="#androidmanifest-xml" aria-label="Permalink to &quot;AndroidManifest.xml&quot;">​</a></h3><p>整个 App 最重要的配置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;application&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;activity</span></span>
<span class="line"><span>        android:name=&quot;.MainActivity&quot;/&gt;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>&lt;/application&gt;</span></span></code></pre></div><h3 id="assets" tabindex="-1">assets <a class="header-anchor" href="#assets" aria-label="Permalink to &quot;assets&quot;">​</a></h3><p>原始资源</p><p>不会生成 R 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assets/</span></span>
<span class="line"><span>    config.json</span></span>
<span class="line"><span>    city.json</span></span>
<span class="line"><span>    web/</span></span></code></pre></div><p>使用时：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAssets</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;config.json&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h3 id="jnilibs" tabindex="-1">jniLibs <a class="header-anchor" href="#jnilibs" aria-label="Permalink to &quot;jniLibs&quot;">​</a></h3><p>放 so 库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jniLibs</span></span>
<span class="line"><span>├── arm64-v8a</span></span>
<span class="line"><span>│   └── xxx.so</span></span>
<span class="line"><span>├── armeabi-v7a</span></span>
<span class="line"><span>└── x86</span></span></code></pre></div><h3 id="build-gradle" tabindex="-1">build.gradle <a class="header-anchor" href="#build-gradle" aria-label="Permalink to &quot;build.gradle&quot;">​</a></h3><p>Gradle 配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    compileSdk 36</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    defaultConfig {</span></span>
<span class="line"><span>        applicationId &quot;com.demo.app&quot;</span></span>
<span class="line"><span>        minSdk 24</span></span>
<span class="line"><span>        targetSdk 36</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dependencies {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    implementation &#39;androidx.appcompat:appcompat:1.7.0&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="setting-gradle" tabindex="-1">setting.gradle <a class="header-anchor" href="#setting-gradle" aria-label="Permalink to &quot;setting.gradle&quot;">​</a></h3><p>管理有哪些 Module</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>include &#39;:app&#39;</span></span>
<span class="line"><span>include &#39;:common&#39;</span></span>
<span class="line"><span>include &#39;:network&#39;</span></span></code></pre></div><h2 id="一个大型项目通常不会只有一个app" tabindex="-1">一个大型项目通常不会只有一个app <a class="header-anchor" href="#一个大型项目通常不会只有一个app" aria-label="Permalink to &quot;一个大型项目通常不会只有一个app&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Project</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── app               // 主应用</span></span>
<span class="line"><span>├── common            // 公共工具</span></span>
<span class="line"><span>├── network           // 网络模块</span></span>
<span class="line"><span>├── database          // 数据库</span></span>
<span class="line"><span>├── login             // 登录模块</span></span>
<span class="line"><span>├── home              // 首页模块</span></span>
<span class="line"><span>├── mine              // 我的</span></span>
<span class="line"><span>├── sdk               // 第三方SDK封装</span></span>
<span class="line"><span>└── buildSrc</span></span></code></pre></div><h2 id="如果是车载-aaos-项目" tabindex="-1">如果是车载（AAOS）项目 <a class="header-anchor" href="#如果是车载-aaos-项目" aria-label="Permalink to &quot;如果是车载（AAOS）项目&quot;">​</a></h2><p>AAOS 项目的目录会更复杂，除了Android App，还会涉及系统源码和车载架构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>packages/</span></span>
<span class="line"><span>├── apps/</span></span>
<span class="line"><span>│   ├── CarLauncher/</span></span>
<span class="line"><span>│   ├── CarSettings/</span></span>
<span class="line"><span>│   ├── CarMediaApp/</span></span>
<span class="line"><span>│   └── CarDialer/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>frameworks/</span></span>
<span class="line"><span>├── base/</span></span>
<span class="line"><span>├── native/</span></span>
<span class="line"><span>└── automotive/</span></span>
<span class="line"><span>    ├── car-lib/</span></span>
<span class="line"><span>    ├── car-service/</span></span>
<span class="line"><span>    └── car-ui-lib/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hardware/</span></span>
<span class="line"><span>├── interfaces/</span></span>
<span class="line"><span>└── automotive/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>device/</span></span>
<span class="line"><span>vendor/</span></span>
<span class="line"><span>system/</span></span></code></pre></div><ul><li>packages/apps：车载应用（Launcher、设置、媒体等）</li><li>frameworks/automotive：车载专用框架（Car API、Car Service）</li><li>hardware/interfaces：HAL（硬件抽象层）接口</li><li>vendor/：车企定制代码（如吉利、上汽等厂商的定制实现）</li></ul>`,62)]))}const u=a(i,[["render",l]]);export{g as __pageData,u as default};
