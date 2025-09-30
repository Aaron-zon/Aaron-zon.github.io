// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Element Plus
    app.use(ElementPlus)
  }
}
