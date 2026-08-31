---
outline: deep
---

# Stack

[Stack Expo Router](https://docs.expo.dev/router/advanced/stack/)

_layout.tsx:

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

Stack 主要用于导航，但除此之外它还提供了许多其他的功能。

如：
- 顶部导航
- 顶部标题
- 返回按钮

它还有许多可设置项目，详细可以参考文档。

```jsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="home" options={{}} />
    </Stack>
  );
}

```

## Stack 常用配置项

配置项需要写在 `screenOptions` 中，对每一个页面都生效。

以下列举常用项目，全部选项可查看文档 [available-header-options](https://docs.expo.dev/router/advanced/stack/#available-header-options)

- title: 显示标题，可以是一个字符串，也可以是一个组件
- headerShown: 是否显示头部（true/false）
- headerStyle：头部样式
    - backgroundColor：背景色
- headerTintColor：头部文字颜色
- headerTitleStyle：头部标题样式
    - fontWeight：字体粗细

如果要单独针对对不同页面进行不同的配置，可以在 `Stack` 添加 `Stack.Screen`，并在 `options` 中进行配置。

## Stack.Screen 常用配置项

通过 `name` 匹配不同要修改的页面。

配置项需要写在 `options` 中，对每一个页面都生效。

配置项与在 `Stack` 写的配置项相同。


## 模板

### 隐藏title时

隐藏title时，页面的内容会登格显示被手机状态栏的 时间、wifi、电量等图标遮挡。

可以采用css的方式修改，或用以下方式。

_layout.tsx:

```jsx
import { Stack } from "expo-router";
import '../../global.css';

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

```

about.tsx:

```jsx
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AboutScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>AboutScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default AboutScreen
```

将页面内容包裹在 `SafeAreaView` 中即可。

`SafeAreaView` 可以保证页面内容位于手机状态栏下方。

`SafeAreaView` 来自于 `react-native-safe-area-context`，也是项目创建时自动添加的依赖，不必手动安装。

