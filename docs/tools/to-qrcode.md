# 二维码生成

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'
import QrcodeVue from 'qrcode.vue'

// 响应式数据
const inputText = ref('')
const qrSize = ref(200)
const qrLevel = ref('M') // 纠错级别: L, M, Q, H

// 生成二维码
const generateQRCode = () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('请输入要生成二维码的文本')
  }
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
}
</script>

<ClientOnly>
  <div class="qrcode-container">
    <h3>文本转二维码</h3>
    <TTextarea v-model:text="inputText" placeholder="请输入要生成二维码的文本，例如：
https://example.com
Hello, World!
或任何其他文本内容" />
    <div style="margin: 16px 0;">
      <el-button type="success" @click="generateQRCode">生成二维码</el-button>
      <el-button type="info" @click="clearInput">清空</el-button>
    </div>
    <div class="qrcode-settings" style="margin-bottom: 16px;">
      <el-form :inline="true">
        <el-form-item label="二维码大小">
          <el-input-number v-model="qrSize" :min="100" :max="500" :step="50" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="纠错级别">
          <el-select v-model="qrLevel" style="width: 100px;">
            <el-option label="低 (L)" value="L" />
            <el-option label="中 (M)" value="M" />
            <el-option label="高 (Q)" value="Q" />
            <el-option label="最高 (H)" value="H" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="qrcode-preview" style="display: flex; justify-content: center; margin: 20px 0;">
      <div v-if="inputText" style="padding: 20px; background-color: #f5f7fa; border-radius: 8px;">
        <qrcode-vue 
          :value="inputText" 
          :size="qrSize" 
          :level="qrLevel"
          color-dark="#000000"
          color-light="#ffffff"
        />
      </div>
      <div v-else style="padding: 100px; background-color: #f5f7fa; border-radius: 8px; color: #999;">
        请输入文本生成二维码
      </div>
    </div>
    <div style="margin-top: 20px; padding: 16px; background-color: #f5f7fa; border-radius: 4px;">
      <h4>使用说明：</h4>
      <ol>
        <li>在输入框中输入要生成二维码的文本</li>
        <li>调整二维码大小和纠错级别（可选）</li>
        <li>点击"生成二维码"按钮</li>
        <li>右侧将显示生成的二维码</li>
        <li>可以直接右键保存二维码图片</li>
      </ol>
    </div>
  </div>
  
  <style scoped>
  .qrcode-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h3 {
    margin-bottom: 20px;
  }
  
  h4 {
    margin-top: 0;
  }
  
  ol {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
</ClientOnly>