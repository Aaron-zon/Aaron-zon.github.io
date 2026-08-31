---
outline: deep
---

# React Navigation（expo-router）

react native 的页面跳转功能已集成至 expo 中，使用时只需导入 expo-router 包即可。

## 示例

### 1.Link

使用 `Link` 组件进行跳转，在 href 属性中指定跳转的路由地址。

适合文字、卡片等点击后跳转的场景。

```js
import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Index() {
    return (
        <View>
            <Link href={'/about'}>Go to About</Link>
      
            <Link href={'/about'}>
                <Text>Go to About</Text>
            </Link>
        </View>
    );
}
```

其中在Button上使用，如果不加 `asChild` 属性跳转后会没有返回按钮。

asChild的属性表示将 Button 当作 Link 的子元素。

**Link + 参数**

Expo Router 可以直接在 URL 中传递参数。

```js
<Link href="/user/123">
    <Text>User 123</Text>
</Link>
```

在页面中获取参数：

```js
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function UserDetail() {
    const { id } = useLocalSearchParams();

    return (
        <Text>User ID: {id}</Text>
    );
}
```

**使用 Search Params 传参**

```js
<Link
    href={{
        pathname: "/about",
        params: {
            id: "123",
            name: "Tom",
        },
    }}
>
    About
</Link>
```

接收：

```js
const { id, name } = useLocalSearchParams();
```



### 2.router.navigate()

使用 `router.navigate()` 进行编程式导航。

适合 **根据业务逻辑决定是否跳转** 的场景。

```js
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
    const router = useRouter();

    const goToAbout = () => {
        router.navigate("/about");
    };

    return (
        <View>
            <Button title="Go to About" onPress={goToAbout} />
        </View>
    );
}
```

**router.navigate() + 参数**

```js
router.navigate({
    pathname: "/user/[id]",
    params: {
        id: "123",
    },
});
```

### 3.router.push()

`router.push()` 是 **压入一个新的页面。**

它会在导航栈中新增一个页面。

```js
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        <Button
            title="Go to About"
            onPress={() => router.push("/about")}
        />
    );
}
```

**router.push() + 参数**

```js
router.push("/user/123");

或

router.push({
    pathname: "/user/[id]",
    params: {
        id: "123",
    },
});
```

接收：

```js
const { id } = useLocalSearchParams();
```

**使用 Search Params 传参**

除了动态路由 [id]，还可以使用 Query 参数。

```js
router.push({
    pathname: "/search",
    params: {
        keyword: "react",
        page: "1",
    },
});

// 发送类似：/search?keyword=react&page=1
```

接收：

```js
import { useLocalSearchParams } from "expo-router";

export default function Search() {
    const { keyword, page } = useLocalSearchParams();

    console.log(keyword);
    console.log(page);

    return null;
}
```




### 4.router.replace()

使用 `router.replace()` 替换当前页面。

不会保留当前页面作为返回历史。

```js
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Login() {
    const router = useRouter();

    const login = () => {
        // 登录成功
        router.replace("/home");
    };

    return (
        <Button
            title="Login"
            onPress={login}
        />
    );
}
```


### 5.router.back()

返回上一个页面。

```js
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Detail() {
    const router = useRouter();

    return (
        <Button
            title="Back"
            onPress={() => router.back()}
        />
    );
}
```

### 6.router.dismiss()

关闭当前的 Stack / Modal。

这个和 back() 有一点区别。

例如你的路由：

```
app/
├── _layout.tsx
├── index.tsx
├── about.tsx
└── modal.tsx
```

如果 modal.tsx 是一个 Modal：

```js
router.dismiss();
```

可以关闭当前 Modal。

```js
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function Modal() {
    const router = useRouter();

    return (
        <Button
            title="Close"
            onPress={() => router.dismiss()}
        />
    );
}
```

### 7.router.dismissTo()

关闭页面直到指定的页面。

```
Home
 ↓
PageA
 ↓
PageB
 ↓
PageC
```

调用 `router.dismissTo("/home")` 可以直接回到 `Home`。

### 8. router.canGoBack()

判断当前是否可以返回。

```js
const router = useRouter();

if (router.canGoBack()) {
    router.back();
}
```

例如：

```js
const handleBack = () => {
    if (router.canGoBack()) {
        router.back();
    }
};
```

可以避免页面已经是根页面时还执行 back()。



