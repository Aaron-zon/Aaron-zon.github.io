# 目录结构

```
MyApplication/
├── app/                    // 主模块（一个应用）
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       // Java/Kotlin源码
│   │   │   │   └── com/example/demo/
│   │   │   │       ├── MainActivity.kt
│   │   │   │       ├── ui/
│   │   │   │       ├── data/
│   │   │   │       ├── network/
│   │   │   │       └── utils/
│   │   │   │
│   │   │   ├── res/        // 所有资源文件
│   │   │   │   ├── layout/
│   │   │   │   ├── drawable/
│   │   │   │   ├── mipmap/
│   │   │   │   ├── values/
│   │   │   │   ├── menu/
│   │   │   │   ├── xml/
│   │   │   │   └── anim/
│   │   │   │
│   │   │   ├── assets/     // 原始资源
│   │   │   ├── AndroidManifest.xml
│   │   │   └── jniLibs/    // so库
│   │   │
│   │   ├── test/           // 单元测试
│   │   └── androidTest/    // UI测试
│   │
│   ├── build.gradle
│   └── proguard-rules.pro
│
├── gradle/
├── build.gradle
├── settings.gradle
├── gradle.properties
└── local.properties
```

## 重点目录

### java/kotlin

这里放业务代码

```
java/
└── com.example.demo
    ├── MainActivity.kt
    ├── LoginActivity.kt
    ├── ui/
    ├── network/
    ├── database/
    ├── model/
    ├── repository/
    ├── service/
    └── utils/
```

### res

Android 所有资源都放在这里

**layout**

页面布局

```
activity_main.xml
activity_login.xml
fragment_home.xml
```

使用时：

```java
setContentView(R.layout.activity_main);
```

**drawable**

图片

```
logo.png

ic_home.xml

shape_button.xml
```

- shape
- selector
- vector

也都放在这里

**mipmap**

App 图标

```
ic_launcher.png
```

**values**

各种配置

```
values
├── strings.xml
├── colors.xml
├── dimens.xml
├── themes.xml
└── styles.xml
```

例如：

```
<string name="app_name">
Demo
</string>
```

使用时：

```java
getString(R.string.app_name)
```

**menu**

菜单

```
main_menu.xml
```

**xml**

配置文件

```
network_security_config.xml

backup_rules.xml

file_paths.xml
```

**anim**

```
slide_in.xml
fade_out.xml
```

### AndroidManifest.xml

整个 App 最重要的配置。

```
<application>

    <activity
        android:name=".MainActivity"/>
    ...
</application>
```

### assets

原始资源

不会生成 R 文件

```
assets/
    config.json
    city.json
    web/
```

使用时：

```java
getAssets().open("config.json");
```

### jniLibs

放 so 库

```
jniLibs
├── arm64-v8a
│   └── xxx.so
├── armeabi-v7a
└── x86
```

### build.gradle

Gradle 配置

```
android {
    compileSdk 36

    defaultConfig {
        applicationId "com.demo.app"
        minSdk 24
        targetSdk 36
    }
}
```

依赖

```
dependencies {

    implementation 'androidx.appcompat:appcompat:1.7.0'

}
```

### setting.gradle

管理有哪些 Module

```
include ':app'
include ':common'
include ':network'
```

## 一个大型项目通常不会只有一个app

```
Project
│
├── app               // 主应用
├── common            // 公共工具
├── network           // 网络模块
├── database          // 数据库
├── login             // 登录模块
├── home              // 首页模块
├── mine              // 我的
├── sdk               // 第三方SDK封装
└── buildSrc
```

## 如果是车载（AAOS）项目

AAOS 项目的目录会更复杂，除了Android App，还会涉及系统源码和车载架构

```
packages/
├── apps/
│   ├── CarLauncher/
│   ├── CarSettings/
│   ├── CarMediaApp/
│   └── CarDialer/

frameworks/
├── base/
├── native/
└── automotive/
    ├── car-lib/
    ├── car-service/
    └── car-ui-lib/

hardware/
├── interfaces/
└── automotive/

device/
vendor/
system/
```

- packages/apps：车载应用（Launcher、设置、媒体等）
- frameworks/automotive：车载专用框架（Car API、Car Service）
- hardware/interfaces：HAL（硬件抽象层）接口
- vendor/：车企定制代码（如吉利、上汽等厂商的定制实现）