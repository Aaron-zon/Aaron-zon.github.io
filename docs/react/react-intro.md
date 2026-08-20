# React 介绍

React 起源于 Facebook 的内部项目。

是一个用于构建用户界面的 JavaScript 库，拥有较高的性能，代码逻辑简单，相比于 Vue 等框架更接近原生 JS。

在 React 中以 16.8 版本为分界点，前后有巨大的变化。

## 重大更新节点

- React 16：出现了 Fiber，整个更新变得可中断、可分片、具有优先级
- React 16.8：推出了 Hooks，类组件正式向函数组件转变
  - 在 16.8 以前，函数组件只能作为静态画面
- React 17：过渡版本，主要侧重于升级简化 React 本身
- React 18：
  - transition
  - Suspense
  - 新的Hooks
  - Offscreen
  - ...

## React 特性

- 声明式：画面和数据的单向绑定
- 组件化：可以将画面拆分成组件
- 跨平台：这部分指基于React开发的React Native 它可以开发移动端应用。
- 单向数据流：数据流从上（父组件）向下（子组件）流动，也就是说父组件可以影响子组件的数据，但子组件原则上不能影响父组件数据
- 虚拟 DOM
- Diff算法

其实这些特性基本和 Vue 差不多，不过 Vue 提供了更多的语法糖。而 React 则让开发者更自由。他们的大部分周边和语法都是相似的在我的理解中仅是自动挡和手动挡的差别。

## 生产项目结构

```
my-react-app/
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── Loading/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   └── authApi.ts
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── store/
│   │   │   │   └── authSlice.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── users/
│   │   │   ├── api/
│   │   │   │   └── userApi.ts
│   │   │   ├── components/
│   │   │   │   ├── UserTable.tsx
│   │   │   │   └── UserForm.tsx
│   │   │   ├── hooks/
│   │   │   └── types.ts
│   │   │
│   │   ├── products/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types.ts
│   │   │
│   │   └── orders/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types.ts
│   │   |
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Login/
│   │   │   └── LoginPage.tsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── Users/
│   │   │   └── UsersPage.tsx
│   │   └── Orders/
│   │       └── OrdersPage.tsx
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   │
│   ├── routes/
│   │   └── index.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/
│   │   ├── http.ts
│   │   └── storage.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   └── hooks.ts
│   │
│   ├── types/
│   │   └── common.ts
│   │
│   ├── utils/
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── .env.development
├── .env.production
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

- assets: 静态资源
- components: 非业务的通用公共组件
- features: 业务组件
- pages: 页面
- layouts: 布局
- routes: 路由
- hooks: Hook函数
- services: 统一配置 Axios
- store: 全局状态
- types: 数据类型
- utils: 工具函数
- App.tsx: 根组件
- main.tsx: 入口文件

这个结构中比较关键的是 **features**。

不使用传统的这种方式：

```
components/
├── UserTable.tsx
├── UserForm.tsx
├── ProductTable.tsx
├── ProductForm.tsx
├── OrderTable.tsx
├── OrderForm.tsx

api/
├── userApi.ts
├── productApi.ts
├── orderApi.ts

hooks/
├── useUser.ts
├── useProduct.ts
├── useOrder.ts
```

因为项目大了之后会发现，一个页面所需要的内容散落在整个 src 中，而使用 **features**，则让一个画面中的内容更加集中。

## 模块

```
① JSX
   ↓
② 组件
   ↓
③ 组件导入 / 导出
   ↓
④ 显示数据
   ↓
⑤ 条件渲染
   ↓
⑥ 列表渲染
   ↓
⑦ 事件响应
   ↓
⑧ useState
   ↓
⑨ Props
   ↓
⑩ Context / useContext
   ↓
⑪ useEffect
   ↓
⑫ useRef
   ↓
⑬ 表单
   ↓
⑭ 自定义 Hook
```