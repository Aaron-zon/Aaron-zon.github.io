
# IDEA 启动一个 Tomcat 项目

## 目录结构

目录结构通常为以下结构

Maven Web 项目：

```css
project
 ├─ src/main/java
 ├─ src/main/resources
 ├─ src/main/webapp
 │   ├─ WEB-INF
 │   │   ├─ web.xml
 │   │   └─ jsp/
 └─ pom.xml
```


## 在 IDEA 中导入项目

- `File -> Open`
- 选择项目目录
- 等待项目加载（右下角进度条读取完毕）
  
## Project Structure 配置

打开 `File -> Project Structure` 这里有三个配置项

### 1.Modules

```css
Project Structure → Modules → 你的模块 → Web
```

确认项目设置：

- Deployment Descriptors
  - Path: `src/main/webapp/WEB-INF/web.xml`
- Web Resource Directories
  - Web Resource Directory: `src/main/webapp`

如果没有 Web：
- 点击 `+`
- 选择 Web

### 2.Artifact（Tomcat 部署用）

```
Project Structure → Artifacts
```
应该存在：
```
xxx:war exploded
```

如果没有：
```
+ → Web Application Exploded → From Modules
```
选择你的 module，点击确定即可


## 配置 Tomcat

### 1.添加 Tomcat 服务器

```css
Settings → Build, Execution, Deployment → Application Servers
```

- 点击 `+`
- 选择 `Tomcat Server`
- 选择 Tomcat 安装目录（放着 `bin`、 `conf` 、`lib` 、 `webapps` 的那个目录）
- 点击 `OK`

### 2.创建运行当前项目Tomcat的配置

```
Run -> Edit Configurations → + → Tomcat Server → Local
```

#### Server页签

- Application Server: 选择你添加的 Tomcat 
- JRE: 选择你的 JDK

#### Deployment页签

点击 `+`：

```
Artifact → xxx:war exploded
```

- Context Path: 这是项目的上下文路径，默认是项目名，你可以自定义，如：`/`。

启动项目后，在浏览器中访问 `http://localhost:8080/项目上下文路径` 即可。

如：
```css
# Context Path: /
http://localhost:8080/

# Context Path: /abc
http://localhost:8080/abc
```
