# JWT 编码/解吗

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

const text = ref('')
const jwt = ref('')

const encodeBase64 = () => jwt.value = btoa(unescape(encodeURIComponent(text.value)))

function decodeBase64() {
  try {
    jwt.value = decodeURIComponent(escape(atob(text.value)))
  } catch (error) {
    ElMessage('输入不是有效的Base-64字符串!')
    jwt.value = ''
  }
}

function swap() {
  const temp = text.value
  text.value = jwt.value
  jwt.value = temp
}

function clear() {
  text.value = ''
  jwt.value = ''
}
</script>

<ClientOnly>
  <div class="jwt-container">
    <TTextarea v-model:text="text" placeholder="请输入需要 编码/解码 的文本"/>
    <div>
      <el-button type="success" @click="encodeBase64">Base64编码</el-button>
      <el-button type="success" @click="decodeBase64">Base64解码</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <TTextarea v-model:text="base64" placeholder="处理结果"/>
  </div>
</ClientOnly>
