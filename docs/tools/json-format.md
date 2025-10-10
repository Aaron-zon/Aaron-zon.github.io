# JSON 格式化

<script setup>
import { ref, computed, unref } from 'vue'
import TTextarea from './components/TTextarea/index.vue'
import 'vue-json-pretty/lib/styles.css'
import VueJsonPretty from 'vue-json-pretty'

const text = ref(`{"name": "li"}`)

const data = computed(() => {
  const json = unref(text)
  
  if (json) {
    return JSON.parse(json)
  } else {
    return {}
  }
})


function clear() {
  text.value = ''
}
</script>

<ClientOnly>
  <div>
    <TTextarea v-model:text="text" placeholder="请输入需要格式化的 JSON 文本"/>
    <div>
      <el-button type="info" @click="clear">复制</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <div class="json-viewer">
      <vue-json-pretty 
        :data="data"
        :show-line="false"
        :showLineNumber="true"
        :showIcon="true"
        :show-double-quotes="false"
        :collapsedOnClickBrackets="true"
        :indent="4"
      />
    </div>
  </div>
</ClientOnly>

<style scoped>
.json-viewer {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 10px;
  border-radius: 8px;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
</style>