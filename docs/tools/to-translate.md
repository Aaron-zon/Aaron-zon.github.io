# 日语翻译

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

const inputText = ref('')
const japaneseText = ref('')
const hiraganaText = ref('')
const katakanaText = ref('')
const loading = ref(false)

const clearResults = () => {
  japaneseText.value = ''
  hiraganaText.value = ''
  katakanaText.value = ''
}

const translate = async () => {
  const message = inputText.value.trim()

  if (!message) {
    clearResults()
    ElMessage.warning('请输入需要翻译的中文内容')
    return
  }

  loading.value = true

  try {
    const query = new URLSearchParams({ msg: message }).toString()
    const response = await fetch(`https://43.139.208.69/translate?${query}`)

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message || '翻译接口返回异常')
    }

    japaneseText.value = data.japanese || ''
    hiraganaText.value = data.hiragana || ''
    katakanaText.value = data.katakana || ''

    if (!japaneseText.value && !hiraganaText.value && !katakanaText.value) {
      ElMessage.warning('接口未返回翻译结果')
    }
  } catch (error) {
    clearResults()
    ElMessage.error(error instanceof Error ? error.message : '翻译失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const clearAll = () => {
  inputText.value = ''
  clearResults()
}
</script>

<ClientOnly>
  <div class="translate-container">
    <div class="intro-card">
      <h3>中文转日语</h3>
      <p>输入中文内容后点击“开始翻译”，下方会分别展示日语、平假名、片假名结果。</p>
    </div>
    <div class="input-card">
      <div class="card-title">输入内容</div>
      <TTextarea v-model:text="inputText" placeholder="请输入中文，例如：你好今天是星期六" />
      <div class="button-group">
        <el-button type="success" :loading="loading" @click="translate">开始翻译</el-button>
        <el-button type="info" @click="clearAll">清空</el-button>
      </div>
    </div>
    <div class="result-grid">
      <div class="result-card">
        <div class="result-header">
          <span class="result-title">日语翻译</span>
          <span class="result-tag">Japanese</span>
        </div>
        <el-input
          v-model="japaneseText"
          type="textarea"
          :rows="8"
          readonly
          placeholder="翻译结果将显示在这里"
        />
      </div>
      <div class="result-card">
        <div class="result-header">
          <span class="result-title">平假名</span>
          <span class="result-tag">Hiragana</span>
        </div>
        <el-input
          v-model="hiraganaText"
          type="textarea"
          :rows="8"
          readonly
          placeholder="平假名结果将显示在这里"
        />
      </div>
      <div class="result-card">
        <div class="result-header">
          <span class="result-title">片假名</span>
          <span class="result-tag">Katakana</span>
        </div>
        <el-input
          v-model="katakanaText"
          type="textarea"
          :rows="8"
          readonly
          placeholder="片假名结果将显示在这里"
        />
      </div>
    </div>
  </div>

  <style scoped>
  .translate-container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .intro-card,
  .input-card,
  .result-card {
    padding: 20px;
    border-radius: 12px;
    background: #f5f7fa;
    border: 1px solid #e4e7ed;
  }

  .intro-card h3,
  .card-title,
  .result-title {
    margin: 0;
    font-weight: 600;
    color: #303133;
  }

  .intro-card p {
    margin: 12px 0 0;
    line-height: 1.7;
    color: #606266;
  }

  .tip-text {
    color: #e6a23c;
  }

  .card-title {
    margin-bottom: 4px;
    font-size: 18px;
  }

  .button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .result-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .result-tag {
    font-size: 12px;
    color: #909399;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 999px;
    padding: 4px 10px;
  }

  .result-card :deep(.el-textarea__inner) {
    resize: none;
    min-height: 180px !important;
    background: #ffffff;
  }

  @media (max-width: 960px) {
    .result-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
</ClientOnly>
