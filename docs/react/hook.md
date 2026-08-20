---
outline: deep
---

# Hook

react 提供的 hooks 没有比要全部熟知，这里只记录一些常用的必会hook。

第一梯队：
- useState
- useEffect
- useContext
- useRef

第二梯队：
- useMemo
- useCallback

第三梯队：
- useReducer
- useLayoutEffect
- useId

还有一个必须要知道的：
- 自定义Hook

## useState

用于保存组件状态的hook，这是最常用，也是最重要的。

```js
const [count, setCount] = useState(0)
```

**不同数据类型：**

```js
// 数字
const [age, setAge] = useState(28);
// 字符串
const [name, setName] = useState('Taylor');
// 对象
const [todos, setTodos] = useState(() => createTodos());
// 数组
const [todos, setTodos] = useState([]);
// 布尔
const [isLogged, setIsLogged] = useState(false);
// 复杂数组/对象
const [board, setBoard] = useState(() => [
    [
        {key: '1', value: 'xxx'},
        {key: '2', value: 'xxx'},
        {key: '3', value: 'xxx'},
    ],
    [
        {key: '4', value: 'xxx'},
        {key: '5', value: 'xxx'},
        {key: '6', value: 'xxx'},
    ],
    [
        {key: '7', value: 'xxx'},
        {key: '8', value: 'xxx'},
        {key: '9', value: 'xxx'},
    ]
])
```

### 常见问题

- 调用 `setState` 后发生什么？
- 为什么不直接修改 state？
- `setCount(count + 1)` 连续调用两次为什么可能不是 + 2？
- 函数式更新是什么？
- 为什么有时执行 `setCount` 不会立刻改变值？

## useEffect

用于处理副作用

```js
useEffect(() => {
  console.log("执行");
}, []);
```

> 本质是在 React 完成渲染后，执行一些“额外的事情”（副作用）

既然是处理 **副作用**，那我们要先了解什么是副作用。

### 副作用

假设有这样一段代码

```js
function App() {
    const count = 10

    return <div>{count}</div>
}
```

这段代码非常存粹，只是将 count 显示在画面上，没有外部世界的影响。

但如果：

```js
function App() {
    fetch('/app/user')

    return <div>Hello</div>
}
```

这段代码中，`fetch()`，做了请求：

```
React组件
   ↓
请求服务器
   ↓
影响外部世界
```

这就属于 **副作用**

其他典型的副作用还有：

```
API 请求
定时器
事件监听
WebSocket
订阅
组件初始化
状态变化后的处理
清理资源
修改 DOM
修改原生组件
```

所以：

```
React 渲染 UI
    ↓
纯粹计算

useEffect
    ↓
处理副作用
```

### 三种 useEffect

useEffect有三种使用方式

- 无依赖数组
- 空依赖数组
- 有依赖数组

#### 无依赖数组

```js
useEffect(() => {
  // ...
});
```

表示每次组件重新渲染都会执行这个 `useEffect`

#### 空依赖数组

```js
useEffect(() => {
  // ...
}, []);
```

由于没有依赖，因此只在组件第一次渲染完成后触发。

一般可以理解为 **只执行一次**

不过 React 开发环境的 Strict Mode 可能让你看到 Effect 执行两次。

####  有依赖数组

```js
useEffect(() => {
  // ...
}, [count]);
```

这表示依赖于 count，`第一次渲染组件后` 或 每当 `count 改变后` 都会执行一次 `useEffect`。

还有一个十分常见的需求，`第一次渲染组件后不执行`，只在每次 count 改变后执行：

```js
const isFirstRender = useRef(true);

useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    // 第一次渲染不会执行到这里
    // count 后续改变才执行
    console.log("count 改变了", count);
}, [count]);
```

为什么要使用 `useRef`?

因为它可以保存数据，但修改 ref.current 不会导致组件重新渲染。

### cleanup

> Effect 在下一次重新执行之前，或者组件卸载之前，执行的清理函数。

```js
useEffect(() => {

  // Effect

  return () => {
    // Cleanup
  };

}, []);
```

这里的：

```js
return () => {
    // Cleanup
};
```

如定时器：

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Hello");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

组件挂载时:

```
App 挂载
 ↓
useEffect
 ↓
创建 timer
 ↓
每秒打印 Hello
```

组件卸载：

```
App 卸载
 ↓
cleanup
 ↓
clearInterval(timer)
 ↓
定时器停止
```

## useContext

用于跨组件共享数据

```js
const user = useContext(UserContext);
```

### 常见问题

- Context 和 Props 有什么区别
- Context 和 Redux/Zustand 有什么区别？

## useRef

```js
const inputRef = useRef(null);
```

它有两个非常重要的用途

1.保存不会重新渲染的数据

```js
const countRef = useRef(0);

countRef.current++;
```

修改：

```js
countRef.current = 10;
```

不会导致组件重新渲染。

2.获取 DOM/原生组件引用

```js
const inputRef = useRef(null);

inputRef.current?.focus();
```

## useMemo

缓存计算结果

```js
const result = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

含义：

```
data 没变
 ↓
不用重新计算
 ↓
直接使用之前的 result
```

## useCallback

缓存函数

```js
const handleClick = useCallback(() => {
  console.log("click");
}, []);
```

它和 useMemo 的区别是：

```
useMemo
 ↓
缓存计算结果

useCallback
 ↓
缓存函数本身
```

## useReducer

用于比较复杂的状态管理

```js
const [state, dispatch] = useReducer(
    reducer,
    initialState
)
```

例如：

```
登录
 ├── LOGIN
 ├── LOGOUT
 └── UPDATE_USER
```

当 useState 开始变得复杂是，可以考虑 useReducer

### 常见问题

- useState 和 useReducer 有什么区别

## useLayoutEffect

和 useEffect 类似，但执行时机不同。

React Native 中也可能遇到，例如某些导航、布局相关场景。

## useId

用于生成唯一 ID。

```js
const id = useId();
```

主要在 Web、无障碍等场景比较有用。

## 自定义Hook

```js
function useUser() {
    const [user, setUser] = useState(null);

    return {
        user,
        setUser
    };
}
```

> 自定义 Hook 的名字通常以 use 开头，并且内部可以使用其他 Hook。