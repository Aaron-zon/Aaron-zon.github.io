# JWT 编码/解码

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

const text = ref('')
const jwt = ref('')

// Base64编码（处理Unicode）
const base64Encode = (str) => {
  return btoa(unescape(encodeURIComponent(str)))
}

// Base64解码（处理Unicode）
const base64Decode = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch (error) {
    throw new Error('无效的Base64字符串')
  }
}

// JWT编码
const encodeJWT = () => {
  try {
    // 解析输入的JSON字符串
    const jsonObj = JSON.parse(text.value)
    
    // 创建JWT Header
    const header = {
      alg: "HS256",
      typ: "JWT"
    }
    
    // 编码Header和Payload
    const encodedHeader = base64Encode(JSON.stringify(header))
    const encodedPayload = base64Encode(JSON.stringify(jsonObj))
    
    // 这里只生成header.payload，不包含signature（需要密钥）
    jwt.value = `${encodedHeader}.${encodedPayload}`
  } catch (error) {
    ElMessage.error('输入不是有效的JSON格式')
  }
}

// JWT解码
const decodeJWT = () => {
  try {
    // 分割JWT字符串
    const parts = text.value.split('.')
    if (parts.length < 2) {
      throw new Error('无效的JWT格式')
    }
    
    // 解码各部分
    const decodedHeader = JSON.parse(base64Decode(parts[0]))
    const decodedPayload = JSON.parse(base64Decode(parts[1]))
    const signature = parts[2] || ''
    
    // 格式化输出
    jwt.value = JSON.stringify({
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature
    }, null, 2)
  } catch (error) {
    ElMessage.error('输入不是有效的JWT格式')
  }
}

// 清空
function clear() {
  text.value = ''
  jwt.value = ''
}
</script>

<ClientOnly>
  <div class="jwt-container">
    <TTextarea v-model:text="text" placeholder="请输入JSON或JWT字符串"/>
    <div>
      <el-button type="success" @click="encodeJWT">JWT编码</el-button>
      <el-button type="success" @click="decodeJWT">JWT解码</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <TTextarea v-model:text="jwt" placeholder="处理结果"/>
  </div>
</ClientOnly>
