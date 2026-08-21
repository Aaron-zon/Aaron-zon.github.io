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

更新 `age` 时就需要注意嵌套对象的 **不可变数据更新**。

正确写法：

```js
set((state) => ({
    user: {
        ...state.user,
        age: 21
    }
}))
```

这个问题也可以靠 Immer 解决

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

## 持久化（persist）

正常 Zustand 的状态只存在内存里，页面刷新/应用重启后会丢失；`persist` 可以把 Zustand 状态保存到本地存储。

**没有 persist 的场合**

```js
const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user })
}));
```

登录 `user = Tom`

此时如果刷新页面

```
刷新
 ↓
React 重新启动
 ↓
Zustand Store 重新创建
 ↓
user = null ❌
```

**加上persist**

```js

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user })
        }),
        {
            name: 'user-storage'
        }
    )
)
```

将原本的内容包裹在 persist 中，便给了Store增加了 **持久化** 的能力。

其中name：

```js
{
    name: 'user-storage'
}
```

它表示的时存储使用的key，使用 persist 后会将数据存储在 Local Storage 中，以这种方式实现持久化，所以即便刷新页面或浏览器关闭，状态依旧存在。

Zustand 官方的 `persist` middleware 默认使用 `localStorage`，也可以配置其他 storage。

完整示例：

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    name: string;
    age: number;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => {
                set({ user });
            },

            logout: () => {
                set({ user: null });
            }
        }),
        {
            name: "user-storage"
        }
    )
);

export default useUserStore;
```

在组件中使用：

```ts
const user = useUserStore(state => state.user);
const setUser = useUserStore(state => state.setUser);
```

## 部分持久化（partialize）

有时候一个 Store 中有多个状态，我们希望只有部分状态需要持久化，这时可以使用 `partialize`。

如以下例子：

```ts
const useStore = create(
    persist(
        (set) => ({
            user: null,
            theme: "dark",
            isLoading: false
        }),
        {
            name: "app-storage"
        }
    )
);
```

实例中我们只想保证 `user` 和 `theme` 的持久化，而 `isLoading` 不需要。

那我们可以利用 `partialize`:

```ts
const useStore = create(
    persist(
        (set) => ({
            user: null,
            theme: "dark",
            isLoading: false
        }),
        {
            name: "app-storage",

            partialize: (state) => ({
                user: state.user,
                theme: state.theme
            })
        }
    )
);
```

## Immer

> Immer 不是 Zustand 的一部分，而是一个专门帮助你编写 **“不可变数据更新”** 的库。

假设 Zustand 中有：

```ts
const useUserStore = create((set) => ({
    user: {
        name: "Tom",
        age: 20,
        profile: {
            city: "Tokyo"
        }
    }
}));
```

现在我要修改：`profile.city`

不使用 Immer 时需要：

```ts
set((state) => ({
    user: {
        ...state.user,
        profile: {
            ...state.user.profile,
            city: "Osaka"
        }
    }
}));
```

需要制作出新的对象，再传入 `set` 中。

和我们想象中直接 `state.profile.city = ...` 不太一样。

显得非常麻烦，如果再深一层，那就会更麻烦。

Immer的核心思想就是，加入后你就可以直接写

```ts
state.user.profile.city = "Osaka";
```

看起来是直接修改对象，但实际会帮你生成一个对象。

> Immer 需要单独安装

### 安装

```bash
npm install immer
```

```ts
const useUserStore = create(
    immer((ser) => ({
        user: {
            name: 'Tom',
            profile: {
                age: 20
            }
        },

        setAge: (age) => set((state) => {
            state.user.profile.age = age
        })
    }))
)
```

