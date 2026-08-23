# 基本配置


## Base 路径

### vite.config.js

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({mode}) => {
    // 根据当前模式获取配置文件【.env.development / .env.production】
    const viteEnv = loadEnv(mode, process.cwd())
    // 获取当前模式下的
    const { VITE_PUBLIC_PATH, VITE_PROXY_API } = viteEnv
    return {
        base: VITE_PUBLIC_PATH,
    }
})

```

### .env.production

```bash
# 开发环境请求后端接口路径
VITE_BASE_API = '/index.php'

# 开发环境入口地址前缀
VITE_PUBLIC_PATH = './'

# 代理路径
VITE_PROXY_API = 'http://127.0.0.1:2222'
```

## 修改build后文件的文件名

原始文件名有以下几个参数：
- [name]：文件名
- [hash]：自动生成的hash
- [ext]：文件后缀

```js
import { defineConfig } from 'vite'
// 生成时间戳
const version = new Date().getTime();

export default defineConfig(({mode}) => {
    return {
        build: {
            rollupOptions: {
                output: {
                  entryFileNames: `assets/[name]-[hash].${version}.js`, // 入口文件
                  chunkFileNames: `assets/[name]-[hash].${version}.js`, // 模块文件
                  assetFileNames: `assets/[name]-[hash].${version}.[ext]` // 资源文件
                }
            }
        }
    }
})
```

## 指定端口和可访问ip

```js
export default defineConfig(({mode}) => {
    return {
        server: {
            host: '0.0.0.0', // 设置服务器监听的IP地址，‘0.0.0.0’或 true 时监听所有地址
            prot: 9999, // 设置启动的端口
            strictPort: false, // 设置为ture时如果有其他服务占用了端口会直接退出，而不是尝试下一个可用端口
            open: true, // 服务器启动时，自动在浏览器打开程序
        }
    }
})
```

## 代理

```js
export default defineConfig(({mode}) => {
    return {
        server: {
            proxy: {
                '/api': {
                    target: http://aaron.com/v1, // 要代理到的url
                    ws: true, // 是否想代理websockets
                    changeOrigin: true, // 是否修改request请求的host，*注意在浏览器上看不到效果，服务器获取host才能看到效果，默认值false
                    prependPath: true, // 是否将目标路径添加到代理路径之前
                }
            }
        }
    }
})
```

访问上述路径：/api/login ---> http://aaron.com/v1/api/login

全部proxy的options属性：https://github.com/http-party/node-http-proxy#options

关于changeOrigin的详细说明：https://juejin.cn/post/7151966465606811678

## 配置@地址

**文件系统路径别名**

将在项目中路径使用的【@】的替换为路径【/src】

```
export default defineConfig(({mode}) => {
    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        }
    }
})
```

官方文档：https://cn.vitejs.dev/config/shared-options.html#resolve-alias