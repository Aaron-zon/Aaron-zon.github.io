# 入门

## 创建项目

```bash
npx create-expo-app@latest
```

## 目录结构

```
MyApp

├── app
│   ├── index.tsx
│   └── setting.tsx
│
├── assets
│
├── package.json
│
└── node_modules
```

## 启动命令

```bash
npm run start
```

如果要在手机上打开，需要先下载 `expo go` 应用，然后扫描二维码，或输入链接。

并且确保服务器与手机在同一个网络中。

如果要在浏览器打开，只需在浏览器中输入 `npm run start` 运行成功后提供的网址即可。

## 常用组件

| React Native | Android      | 说明         |
| ------------ | ------------ | ------------ |
| View         | ViewGroup    | 容器组件，用来包裹其他组件 |
| Text         | TextView     | 文本组件，用于显示文字 |
| Image        | ImageView    | 图片组件，用于显示图片 |
| TextInput    | EditText     | 输入框组件，用于输入文本 |
| ScrollView   | ScrollView   | 滚动视图组件，用于显示长列表 |
| FlatList     | RecyclerView | 列表组件，用于显示长列表 |
| Button       | Button       | 按钮组件，用于触发操作 |
| Pressable    |              | 可点击区域 |
| TouchableOpacity |          | 带点击透明效果的按钮 |
| SectionList  |              | 分组列表 |
| SafeAreaView |              | 安全区域 |
| ActivityIndicator |         | 加载动画 |
| Modal        |              | 弹窗 |
| KeyboardAvoidingView |      | 键盘弹出时自动调整布局 |
| StatusBar    |              | 控制手机顶部状态栏 |
| Switch       |              | 开关按钮 |
| ActivityIndicator + RefreshControl | | 常用于下拉刷新 |


## 样式

React Native 没有 XML 标签，而是使用 JavaScript 来定义样式。

例如：

```js
<View
    style={{
        backgroundColor:'red',
        padding:20
    }}
>
    <Text>
        标题
    </Text>
</View>
```

## 生态

- React Navigation
- 状态管理（Zustand / Redux）
- 服务端数据（TanStack Query）
- UI 组件库
- 本地数据存储
- 网络请求
- 权限
- 通知 / 震动 / 蓝牙等原生能力
- 工程化