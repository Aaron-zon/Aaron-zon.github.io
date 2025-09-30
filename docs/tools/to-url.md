# to URL

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

const text = ref('')
const url = ref('')

const encodeUrl = () => url.value = encodeURIComponent(text.value)

function decodeUrl() {
  try {
    url.value = decodeURIComponent(text.value)
  } catch (error) {
    ElMessage.error('输入不是有效的 URL 字符串!')
  }
}

function swap() {
  const temp = text.value
  text.value = url.value
  url.value = temp
}

function clear() {
  text.value = ''
  url.value = ''
}
</script>

<ClientOnly>
  <div class="url-container"> 
    <TTextarea v-model:text="text" placeholder="请输入需要 编码/解码 的文本"/>
    <div>
      <el-button type="success" @click="encodeUrl">URL编码</el-button>
      <el-button type="success" @click="decodeUrl">URL解码</el-button>
      <el-button type="success" @click="swap">交换</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <TTextarea v-model:text="url" placeholder="处理结果"/>
  </div>
</ClientOnly>