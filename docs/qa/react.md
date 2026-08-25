# React

## React 和 Vue 有什么区别？

- 模板 vs JSX：Vue 使用模板语法，React 使用 JSX，逻辑和视图都在 JS 里
- 更新机制：Vue 基于响应式系统自动追踪依赖，细粒度更新；React 需要 setState 主动触发，配合 memo/useMemo 做优化
- 数据流：两者都是单向数据流，Vue 还有 v-model 等语法糖
- 生态：Vue 上手快、官方配套全；React 生态更灵活庞大，更偏函数式
- 学习曲线：Vue 平缓，React 需要理解 JSX、Hooks、渲染机制等

## React 为什么使用 JSX？

- 声明式描述 UI，结构直观，接近 HTML
- 与 JS 无缝结合，逻辑和视图写在一起，方便表达条件、循环
- 最终由 Babel 编译成 React.createElement() 调用

## JSX 是什么？

- JSX 是 JavaScript 的语法扩展，可以在 JS 里写类似 HTML 的结构
- 它不是模板引擎，编译后就是普通的 JS 函数调用

## JSX 中为什么只能有一个根节点？

- 因为 JSX 最终编译成 React.createElement() 调用，一个函数只能返回一个值
- 需要多个节点时用 Fragment（`<></>`）包裹，它不会产生额外 DOM

## JSX 中 class 为什么写成 className？

- 因为 class 是 JavaScript 的保留字，JSX 本质是 JS，不能直接用
- 同理，for 要写成 htmlFor

## JSX 中如何绑定事件？

- 用驼峰命名 + 函数引用，如 `onClick={handleClick}`
- 不是字符串，而是传函数，需要传参时用箭头函数包一层

## React 中事件和原生 DOM 事件有什么区别？

- React 事件是合成事件（SyntheticEvent），统一了浏览器差异
- 通过事件委托绑定到根容器上（React 17+ 挂在 root 上），不是直接绑在元素上
- 命名是驼峰（onClick），原生是小写（onclick）
- 合成事件对象是池化的，异步访问属性需要注意

## React 为什么需要 key？

- 帮助 React 在 diff 时识别列表中的每个节点，判断复用、更新还是删除
- 没有 key 时列表重排只能靠顺序对比，效率低且容易渲染错乱

## key 为什么不能使用 index？

- 列表插入、删除、排序后 index 会变，React 会复用错误的节点
- 导致组件状态错乱、DOM 复用错误，比如输入框内容串位
- 应该使用稳定且唯一的 id

## 什么是受控组件？

- 表单元素的 value 由 React state 控制，通过 onChange 更新 state
- 数据单向流入，值始终和 state 一致，便于校验和处理

## 什么是非受控组件？

- 表单值由 DOM 自己维护，需要时通过 ref 获取
- 代码简单，但值不在 React 掌控中，需要主动读取

## React 中如何获取 DOM？

- 函数组件用 useRef：`const inputRef = useRef(null)`，`<input ref={inputRef} />`
- 类组件用 React.createRef()
- 给子组件传 ref 需要 forwardRef 包裹，配合 useImperativeHandle 暴露方法

## 函数组件和类组件有什么区别？

- 类组件有 this、生命周期、state，写法冗长
- 函数组件更简洁，配合 Hooks 同样能管理 state 和副作用
- React 官方推荐函数组件 + Hooks

## 什么是 Virtual DOM？

- 用 JS 对象模拟真实 DOM 结构，描述 UI 状态
- 更新时先在 Virtual DOM 上做 diff，算出最小变更，再批量更新真实 DOM

## React 为什么需要 Virtual DOM？

- 直接频繁操作真实 DOM 会触发大量重排重绘，性能差
- Virtual DOM 通过 diff 减少真实 DOM 操作次数，提高渲染性能
- 不依赖浏览器，可以跨平台（React Native）
- 让开发者声明式编程，不用关心 DOM 细节

## React 的 Virtual DOM 和 Vue 的 Virtual DOM 有什么区别？

- Vue 的模板是编译时的，可以做静态分析优化（静态节点提升、PatchFlags 标记）
- React 的 JSX 偏运行时，diff 时需要更完整地对比
- Vue 的 diff 有双端对比优化，React 的 Fiber 支持可中断渲染和优先级调度

## React 是如何进行 Diff 的？

- 同层对比：只比较同一层的节点，不跨层移动
- 类型不同直接替换整棵子树
- 类型相同则复用 DOM，只更新属性
- 列表通过 key 识别复用节点

## React 为什么不能直接操作 DOM？

- 直接操作会破坏 React 对 DOM 的掌控，导致虚拟 DOM 和真实 DOM 状态不一致
- React 是声明式框架，期望开发者只描述 UI，由 React 负责更新
- 破坏 React 的优化机制（复用、批量更新等）

## React 的 Fiber 是什么？

- React 16 引入的新的协调引擎，核心是"可中断的渲染"
- 把渲染拆成一个个 fiber 任务单元，支持暂停、恢复、按优先级调度
- 解决旧版递归渲染阻塞主线程的问题，配合时间切片让出主线程，保证交互流畅

## React 的 Render 阶段和 Commit 阶段是什么？

- Render 阶段：调用组件函数、构建/更新 Fiber 树，计算变化，这个阶段可以中断
- Commit 阶段：把变化提交到真实 DOM，执行副作用（useEffect、生命周期），不可中断
- 对应 current 树和 workInProgress 树双缓冲机制

## Props 是什么？

- 父组件传给子组件的参数，用于配置子组件
- 只读，形成单向数据流

## State 是什么？

- 组件内部管理的状态，通过 setState 更新
- state 变化会触发组件重新渲染

## Props 和 State 有什么区别？

- props 是外部传入的，state 是组件自己维护的
- props 只读不能改，state 通过 setState 修改
- 两者变化都会触发重新渲染

## Props 可以修改吗？

- 不可以，props 是只读的
- 子组件需要修改时，应该调用父组件传入的回调，由父组件修改，或把状态提升

## State 为什么不能直接修改？

- 直接修改不会触发重新渲染，React 感知不到变化
- setState 会触发渲染调度，并且是不可变更新，方便 diff 对比和调试

## 什么是 Hooks？

- React 16.8 引入的一组函数，让函数组件也能使用 state、生命周期等能力
- 常用：useState、useEffect、useRef、useMemo、useCallback、useContext、useReducer

## 为什么 React 要引入 Hooks？

- 解决类组件逻辑复用难的问题（HOC、render props 容易嵌套地狱）
- 状态逻辑可以抽成自定义 Hook 复用
- 函数组件更简洁，没有 this 绑定问题
- 把相关副作用集中管理，替代零散的生命周期

## 组件通信

- 父传子：props
- 子传父：父组件传回调函数，子组件调用并传参
- 兄弟组件：状态提升到共同的父组件
- 跨层级：Context
- 全局状态：Redux、Zustand 等状态管理库
- 父组件调用子组件方法：forwardRef + useImperativeHandle

## React 为什么会重新渲染？

- setState 更新 state
- 父组件重新渲染，默认子组件跟着重新渲染
- props 引用变化、context 值变化

## 什么情况下组件会重新渲染？

- 自身 state 变化
- 父组件传入的 props 变化
- 订阅的 context 变化
- 父组件重新渲染（未用 memo 时子组件默认跟随）

## React 如何避免不必要的重新渲染？

- React.memo 包裹组件，props 没变化时跳过渲染
- useMemo 缓存计算结果，useCallback 缓存函数引用，保证 props 稳定
- 状态拆分下沉，避免一个大的 state 让整棵树都渲染
- 把频繁变化的部分隔离成独立组件

## 一个组件为什么会重新渲染？

- 本质就三类：state 变了、props 变了（引用变化）、context 变了
- 注意父组件渲染时，子组件默认也会渲染，除非用 memo 阻断

## 如何优化一个频繁重新渲染的组件？

- React.memo 包裹 + useCallback/useMemo 稳定 props
- 拆分组件，让状态只影响需要的部分
- 大量数据用虚拟列表，只渲染可视区
- 合并多次 setState，减少渲染次数

## 一个页面有 10000 条数据，React 如何优化？

- 用虚拟列表（react-window / react-virtualized），只渲染可视区域
- 或分页、懒加载
- 每条数据是纯展示组件，用 React.memo 避免无关更新
- 不要一次性渲染大量 DOM

## React 中如何实现权限路由？

- 封装一个路由守卫组件，根据路由配置里的 roles 和当前用户角色判断
- 有权限则渲染目标组件，无权限跳转 403 或登录页
- 配合路由配置遍历生成 Routes

## React 中如何实现登录状态持久化？

- 登录成功后把 token 存 localStorage / sessionStorage（或 cookie）
- 用户信息放在全局状态（Redux / Zustand）
- 应用启动时从 storage 恢复，请求拦截器统一带上 Authorization
- 刷新页面时根据 token 重新拉取用户信息

## React 中如何实现 Token 自动刷新？

- 请求拦截器遇到 401，用 refresh_token 调刷新接口
- 刷新成功拿到新 token，更新存储并重放原请求
- 用一个"单例 Promise + 等待队列"保证并发请求只刷新一次

## React 中如何处理接口竞态问题？

- 用 AbortController / axios cancelToken 取消过期请求
- 或者记录最新请求序号，响应返回时判断是否还是最新，不是就丢弃
- 组件卸载时清理，避免 setState 警告

## React 中如何取消请求？

- fetch 用 AbortController：`abortController.abort()`
- axios 用 AbortSignal 或 CancelToken
- 在 useEffect 的清理函数里调用 abort，组件卸载自动取消

## React 中如何实现全局 Loading？

- 全局状态维护一个请求计数：发起 +1，结束 -1，为 0 时隐藏
- 在 axios 请求/响应拦截器里统一增减
- 或直接调用 antd 的 message/Spin 全局实例

## React 中如何实现错误处理？

- 请求层：axios 拦截器统一处理错误码和提示
- 渲染层：Error Boundary 捕获渲染错误，展示降级 UI
- 全局：监听 unhandledrejection 兜底异步异常
- 上报：错误统一记录并上报监控平台

## React 中如何实现 Error Boundary？

- 类组件实现 getDerivedStateFromError 和 componentDidCatch
- 捕获子树渲染错误，渲染备用 UI 并上报
- 注意：只能捕获渲染期和生命周期错误，事件处理、异步错误捕获不到，需要配合全局兜底

## Tree Shaking 是什么？

- 基于 ES Module 的静态分析，打包时移除未被引用的代码
- 依赖 import/export 的静态性，CommonJS 无法摇树
- 需要注意包的 sideEffects 字段，避免误删有副作用的代码

## Babel 是什么？

- JavaScript 编译器，把新语法、JSX、TypeScript 转成兼容旧环境的代码
- 核心流程：parse 解析 -> transform 转换 -> generate 生成
- 通过插件和预设（preset-env、preset-react）扩展能力

## ESLint 是什么？

- 代码静态检查工具，发现语法错误、风格问题和潜在 bug
- 支持自定义规则和插件（如 eslint-plugin-react）
- 常配合 Prettier 一起使用，一个管规则一个管格式

## npm、pnpm、yarn 有什么区别？

- npm：默认包管理器，node_modules 平铺，历史问题多
- yarn：解决早期 npm 安装慢、依赖版本不统一的问题，有 yarn.lock
- pnpm：通过硬链接 + 内容寻址存储，节省磁盘、安装快，还能避免幽灵依赖
