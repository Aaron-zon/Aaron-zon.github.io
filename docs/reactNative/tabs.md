# Tabs

通常来说我们使用的手机应用都会有底部导航栏目。

React Native 提供了以下几种办法来实现底部导航栏。

- JavaScript Tabs
- Native Tabs
- expo ui

## JavaScript Tabs

[JavaScript Tabs](https://docs.expo.dev/router/advanced/tabs/)

这是最简单的一种方法。

在 src/app 下创建 `(tabs)` 文件夹，文件夹中创建 `_layout.tsx`。

目录结构
```
src
    app
        (tabs)
            _layout.tsx
            tab1.tsx
            tab2.tsx
            tab3.tsx
        _layout.tsx
```

src/app/_layout.tsx

```jsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

将 `Stack.Screen` 的 `name` 设置为 `(tabs)`。

`（tabs）` 目录是一个特殊的目录名称，它告诉 Expo Router 使用该 **Tabs布局**。

在 (tabs) 文件夹下还有一个 _layout.tsx 这是 Tabs 的配置文件，其余文件则为tab页。

src/app/(tabs)/_layout.tsx

```jsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
```

`Tabs` 的使用方法和 `Stack` 类似。

其中 `tabBarIcon` 表示tab导航显示的图标。

JavaScript Tabs 的好处是在IOS和Android上可以保持一致。

## Native Tabs

这是一个还处在测试阶段的功能。

在IOS中原生的Tab有玻璃质感，在Android上则是扁平化。

Native Tabs让各个平台的Tab看起来更像原生。


src/app/(tabs)/_layout.tsx:

```jsx
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

- NativeTabs.Trigger: tab的容器
- NativeTabs.Trigger.Label: tab的标题
- NativeTabs.Trigger.Icon: tab的图标

### 常见问题

[常见问题](https://docs.expo.dev/router/advanced/native-tabs/#common-problems)

**暗色模式**

在暗色模式下，iOS26 切换标题也时白色背景会闪烁

这是因为默认主题使用了白色背景。要解决此问题，请使用 Expo Router 将您的应用包裹起来，ThemeProvider并应用合适的主题。

:::info
ThemeProvider、DarkTheme、 和在 SDK 56 及更高版本中DefaultTheme导出expo-router。对于 SDK 55，请改为从 导入它们@react-navigation/native。
:::

```jsx
import { ThemeProvider, DarkTheme, DefaultTheme } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
```



## expo ui

expo ui 是官方提供的组件库，提供了很多常用的组件，tabs 也包含在其中。

详细内容可以参考以下两个网址。

[expo ui](https://docs.expo.dev/versions/latest/sdk/ui/universal/)

[使用 Expo UI 构建 SwiftUI 应用](https://docs.expo.dev/guides/expo-ui-swift-ui/)