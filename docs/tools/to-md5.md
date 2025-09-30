# to MD5

<script setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

const text = ref('')
const md5Str = ref('')

const encodeUrl = () => md5Str.value = CryptoJS.MD5(text.value).toString()

function clear() {
  text.value = ''
  md5Str.value = ''
}
</script>

<ClientOnly>
  <div class="url-container"> 
    <TTextarea v-model:text="text" placeholder="请输入需要 加密 的文本"/>
    <div>
      <el-button type="success" @click="encodeUrl">MD5加密</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <TTextarea v-model:text="md5Str" placeholder="处理结果" disabled/>
  </div>
</ClientOnly>