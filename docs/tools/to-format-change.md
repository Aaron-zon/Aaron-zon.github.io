# 驼峰转换

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

// 响应式数据
const inputText = ref('')
const outputText = ref('')
const customSeparator = ref('_')

// 将字符串分割为单词数组
const splitIntoWords = (str) => {
  // 处理各种分隔符和大小写变化
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // 处理驼峰式，在大小写变化处添加空格
    .replace(/[^a-zA-Z0-9]+/g, ' ') // 将所有非字母数字字符替换为空格
    .trim() // 去除首尾空格
    .toLowerCase() // 转为小写
    .split(/\s+/); // 按空格分割为单词数组
}

// 大驼峰转换 (PascalCase)
const toPascalCase = () => {
  if (!inputText.value) return
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => {
    const words = splitIntoWords(line)
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
  }).join('\n')
}

// 小驼峰转换 (camelCase)
const toCamelCase = () => {
  if (!inputText.value) return
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => {
    const words = splitIntoWords(line)
    if (words.length === 0) return ''
    const firstWord = words[0]
    const restWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1))
    return [firstWord, ...restWords].join('')
  }).join('\n')
}

// 蛇形转换 (snake_case)
const toSnakeCase = () => {
  if (!inputText.value) return
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => {
    const words = splitIntoWords(line)
    return words.join('_')
  }).join('\n')
}

// 自定义分隔符转换
const toCustomSeparator = () => {
  if (!inputText.value) return
  if (!customSeparator.value) {
    ElMessage.warning('请输入自定义分隔符')
    return
  }
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => {
    const words = splitIntoWords(line)
    return words.join(customSeparator.value)
  }).join('\n')
}

// 转大写
const toUpperCase = () => {
  if (!inputText.value) return
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => line.toUpperCase()).join('\n')
}

// 转小写
const toLowerCase = () => {
  if (!inputText.value) return
  // 按换行符分割，每行单独转换
  const lines = inputText.value.split('\n')
  outputText.value = lines.map(line => line.toLowerCase()).join('\n')
}

// 清空输入输出
const clear = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<ClientOnly>
  <div class="format-change-container">
    <TTextarea v-model:text="inputText" placeholder="请输入需要转换的字符串"/>
    <div class="button-group">
      <el-row>
        <el-button type="success" @click="toPascalCase">大驼峰</el-button>
        <el-button type="success" @click="toCamelCase">小驼峰</el-button>
        <el-button type="success" @click="toSnakeCase">蛇形</el-button>
        <el-button type="success" @click="toUpperCase">转大写</el-button>
        <el-button type="success" @click="toLowerCase">转小写</el-button>
      </el-row>
      <el-row>
        <div class="custom-separator">
          <el-input 
            v-model="customSeparator" 
            placeholder="自定义分隔符" 
            style="width: 120px; margin-right: 10px;"
            maxlength="1"
          />
          <el-button type="success" @click="toCustomSeparator">自定义分隔</el-button>
        </div>
        <el-button class="clear-btn" type="info" @click="clear">清空</el-button>
      </el-row>
    </div>
    <TTextarea v-model:text="outputText" placeholder="转换结果"/>
  </div>
  
  <style scoped>
  .format-change-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    /* align-items: center; */
  }
  
  .custom-separator {
    display: flex;
    align-items: center;
  }

  .clear-btn {
    margin-left: 20px;
  }
  </style>
</ClientOnly>