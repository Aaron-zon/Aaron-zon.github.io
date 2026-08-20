# Zustand



## 安装

```bash
npm install zustand 
# or 
yarn add zustand 
# or 
pnpm add zustand
```

## 创建Store

```js
import { create } from 'zustand'
const useCountStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1})),
    decrement: () => set((state) => ({ count: state.count - 1})),
    reset: () => set({ count: 0})
}))
```

这里 `count` 是这个Store的状态，当然它不只可以放 `count`，还可以放很多东西

```js
const useUserStore = create((set) => ({
    user: null,
    isLogin: false,
    token: ""
}));
```

increment、decrement、reset 都是这个Store的方法，它们可以修改状态。



## 基本用法

```js
function App() {
    const count = useCountStore((state) => state.count)
    const increment = useCountStore((state) => state.increment)
    const decrement = useCountStore((state) => state.decrement)
    const reset = useCountStore((state) => state.reset)

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}
```

`useCountStore((state) => state.count)` 这种获取状态或方法的方式，叫做 `selector`。

官方文档中特别强调，通过 `selector` 选择需要的状态，可以避免不必要的重新渲染，因此项目中推荐这种写法。


## set

在创建Store的步骤中我们可以看到，每一个修改状态的方法都包裹在 `set` 中

```js
increment: () => set((state) => ({ count: state.count + 1})),
decrement: () => set((state) => ({ count: state.count - 1})),
reset: () => set({ count: 0})
```

Zustand 的 set 默认会进行浅层合并，所以更新普通的顶层字段时通常不用手动展开整个 state。

但是嵌套对象：

```js
user: {
    name: "Tom",
    age: 20
}
```

更新 `age` 时就需要注意嵌套对象的不可变更新。

正确写法：

```js
set((state) => ({
    user: {
        ...state.user,
        age: 21
    }
}))
```

## get

```js
create((set, get) => ({
    count: 0,

    double: () => {
        const count = get().count;

        set({
            count: count * 2
        });
    }
}));
```

```
set
 ↓
修改 Store

get
 ↓
读取 Store 当前值
```