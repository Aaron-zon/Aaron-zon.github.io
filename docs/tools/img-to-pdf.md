# 图片转 PDF

<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp', 'image/gif']
const ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif']
const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_IMAGES = 50
const MAX_IMAGE_EDGE = 8000

const PAGE_SIZE_OPTIONS = [
  { value: 'a4', label: 'A4 (210×297mm)' },
  { value: 'a3', label: 'A3 (297×420mm)' },
  { value: 'letter', label: 'Letter (216×279mm)' },
  { value: 'image', label: '跟随图片尺寸' },
]

const ORIENTATION_OPTIONS = [
  { value: 'auto', label: '自动（根据图片比例）' },
  { value: 'portrait', label: '纵向' },
  { value: 'landscape', label: '横向' },
]

const FIT_OPTIONS = [
  { value: 'contain', label: '完整显示（留白）' },
  { value: 'cover', label: '填满页面（可裁剪）' },
  { value: 'stretch', label: '拉伸填满' },
]

const BG_OPTIONS = [
  { value: 'white', label: '白色' },
  { value: 'black', label: '黑色' },
  { value: 'transparent', label: '透明' },
]

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  a3: { width: 841.89, height: 1190.55 },
  letter: { width: 612, height: 792 },
}

const DPI = 72

const settings = reactive({
  pageSize: 'a4',
  orientation: 'auto',
  fitMode: 'contain',
  margin: 20,
  background: 'white',
})

const fileInputRef = ref(null)
const images = ref([])
const isGenerating = ref(false)
const isDragActive = ref(false)
const generatedPdfUrl = ref('')
const generatedPdfSize = ref(0)

let dragDepth = 0
let idCounter = 0

const hasImages = computed(() => images.value.length > 0)
const hasResult = computed(() => Boolean(generatedPdfUrl.value))
const imageCountText = computed(() => `${images.value.length} 张图片`)

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function generateId() {
  return ++idCounter
}

function triggerSelectFile() {
  fileInputRef.value?.click()
}

function isAcceptedFile(file) {
  const ext = file.name.split('.').pop()?.toLowerCase() || ''
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext)
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片解码失败'))
    img.src = url
  })
}

async function getImageMeta(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
    }
  } finally {
    URL.revokeObjectURL(url)
  }
}

function revokePreviews() {
  images.value.forEach((img) => {
    if (img.previewUrl) {
      URL.revokeObjectURL(img.previewUrl)
    }
  })
}

function clearAll() {
  revokePreviews()
  images.value = []
  isDragActive.value = false
  dragDepth = 0
  revokeGeneratedPdf()
}

function revokeGeneratedPdf() {
  if (generatedPdfUrl.value) {
    URL.revokeObjectURL(generatedPdfUrl.value)
    generatedPdfUrl.value = ''
  }
  generatedPdfSize.value = 0
}

async function addFiles(fileList) {
  const newItems = []

  for (const file of fileList) {
    if (!isAcceptedFile(file)) {
      ElMessage.warning(`不支持的文件格式：${file.name}`)
      continue
    }

    if (file.size > MAX_FILE_SIZE) {
      ElMessage.warning(`文件过大（超过 20MB）：${file.name}`)
      continue
    }

    if (images.value.length + newItems.length >= MAX_IMAGES) {
      ElMessage.warning(`最多支持 ${MAX_IMAGES} 张图片，已超出限制`)
      break
    }

    const previewUrl = URL.createObjectURL(file)

    try {
      const meta = await getImageMeta(file)

      if (meta.width > MAX_IMAGE_EDGE || meta.height > MAX_IMAGE_EDGE) {
        URL.revokeObjectURL(previewUrl)
        ElMessage.warning(`图片尺寸过大（超过 ${MAX_IMAGE_EDGE}px）：${file.name}`)
        continue
      }

      newItems.push({
        id: generateId(),
        file,
        previewUrl,
        name: file.name,
        size: file.size,
        width: meta.width,
        height: meta.height,
      })
    } catch {
      URL.revokeObjectURL(previewUrl)
      ElMessage.error(`读取图片失败：${file.name}`)
    }
  }

  if (newItems.length > 0) {
    images.value.push(...newItems)
    revokeGeneratedPdf()
    ElMessage.success(`已添加 ${newItems.length} 张图片`)
  }
}

async function handleFileChange(event) {
  const files = Array.from(event.target.files || [])
  event.target.value = ''

  if (files.length === 0) return
  await addFiles(files)
}

function handleDragEnter(event) {
  event.preventDefault()
  dragDepth += 1
  isDragActive.value = true
}

function handleDragOver(event) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
  isDragActive.value = true
}

function handleDragLeave(event) {
  event.preventDefault()
  dragDepth = Math.max(0, dragDepth - 1)
  if (dragDepth === 0) {
    isDragActive.value = false
  }
}

async function handleDrop(event) {
  event.preventDefault()
  dragDepth = 0
  isDragActive.value = false

  const files = Array.from(event.dataTransfer?.files || [])
  if (files.length === 0) return
  await addFiles(files)
}

function removeImage(id) {
  const idx = images.value.findIndex((img) => img.id === id)
  if (idx === -1) return

  const removed = images.value[idx]
  if (removed.previewUrl) {
    URL.revokeObjectURL(removed.previewUrl)
  }

  images.value.splice(idx, 1)
  revokeGeneratedPdf()
}

function moveImage(id, direction) {
  const idx = images.value.findIndex((img) => img.id === id)
  if (idx === -1) return

  const targetIdx = idx + direction
  if (targetIdx < 0 || targetIdx >= images.value.length) return

  const temp = images.value[idx]
  images.value[idx] = images.value[targetIdx]
  images.value[targetIdx] = temp
  revokeGeneratedPdf()
}

function getPageDimensions(pageSize, orientation, imgWidth, imgHeight) {
  if (pageSize === 'image') {
    const pageW = imgWidth * (72 / DPI)
    const pageH = imgHeight * (72 / DPI)
    return { width: pageW, height: pageH }
  }

  const size = PAGE_SIZES[pageSize]
  if (!size) return PAGE_SIZES.a4

  const isLandscape = imgWidth > imgHeight

  let targetOrientation = orientation
  if (orientation === 'auto') {
    targetOrientation = isLandscape ? 'landscape' : 'portrait'
  }

  if (targetOrientation === 'landscape') {
    if (size.width < size.height) {
      return { width: size.height, height: size.width }
    }
    return { width: size.width, height: size.height }
  }

  if (size.width > size.height) {
    return { width: size.height, height: size.width }
  }
  return { width: size.width, height: size.height }
}

function calculateDrawDimensions(imgW, imgH, areaW, areaH, fitMode) {
  if (fitMode === 'stretch') {
    return { width: areaW, height: areaH }
  }

  const scaleContain = Math.min(areaW / imgW, areaH / imgH)
  const scaleCover = Math.max(areaW / imgW, areaH / imgH)
  const scale = fitMode === 'cover' ? scaleCover : scaleContain

  return {
    width: imgW * scale,
    height: imgH * scale,
  }
}

function getRgbColor(bg) {
  if (bg === 'white') return { r: 1, g: 1, b: 1 }
  if (bg === 'black') return { r: 0, g: 0, b: 0 }
  return null
}

async function fileToArrayBuffer(file) {
  return file.arrayBuffer()
}

async function convertToPngBuffer(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('无法创建 Canvas 上下文')
    ctx.drawImage(img, 0, 0)
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return reject(new Error('Canvas 转换失败'))
        try {
          const buffer = await blob.arrayBuffer()
          resolve(new Uint8Array(buffer))
        } catch (e) {
          reject(e)
        }
      }, 'image/png')
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function generatePdf() {
  if (!hasImages.value) {
    ElMessage.warning('请先添加至少一张图片')
    return
  }

  isGenerating.value = true
  revokeGeneratedPdf()

  let pdfLib
  try {
    pdfLib = await import('pdf-lib')
  } catch {
    ElMessage.error('PDF 库加载失败')
    isGenerating.value = false
    return
  }

  const { PDFDocument, rgb } = pdfLib
  const pdfDoc = await PDFDocument.create()
  const total = images.value.length
  let successCount = 0
  let failCount = 0

  for (let i = 0; i < total; i++) {
    const item = images.value[i]
    const imgStatusEl = document.querySelector(`[data-img-id="${item.id}"] .img-status`)

    try {
      if (imgStatusEl) imgStatusEl.textContent = '处理中...'

      let image
      const buffer = await fileToArrayBuffer(item.file)
      const mime = item.file.type.toLowerCase()

      if (mime === 'image/png') {
        try {
          image = await pdfDoc.embedPng(buffer)
        } catch {
          // PNG 嵌入失败，回退到 Canvas 转换
          const pngBuf = await convertToPngBuffer(item.file)
          image = await pdfDoc.embedPng(pngBuf)
        }
      } else if (mime === 'image/jpeg' || mime === 'image/jpg') {
        try {
          image = await pdfDoc.embedJpg(buffer)
        } catch {
          const pngBuf = await convertToPngBuffer(item.file)
          image = await pdfDoc.embedPng(pngBuf)
        }
      } else {
        const pngBuf = await convertToPngBuffer(item.file)
        image = await pdfDoc.embedPng(pngBuf)
      }

      const pageDim = getPageDimensions(
        settings.pageSize,
        settings.orientation,
        item.width,
        item.height,
      )
      const margin = settings.margin
      const areaW = pageDim.width - margin * 2
      const areaH = pageDim.height - margin * 2

      const drawDim = calculateDrawDimensions(
        image.width,
        image.height,
        areaW,
        areaH,
        settings.fitMode,
      )

      const drawX = (pageDim.width - drawDim.width) / 2
      const drawY = (pageDim.height - drawDim.height) / 2

      const page = pdfDoc.addPage([pageDim.width, pageDim.height])

      // 绘制背景
      const bgColor = getRgbColor(settings.background)
      if (bgColor) {
        page.drawRectangle({
          x: 0,
          y: 0,
          width: pageDim.width,
          height: pageDim.height,
          color: rgb(bgColor.r, bgColor.g, bgColor.b),
        })
      }

      page.drawImage(image, {
        x: drawX,
        y: drawY,
        width: drawDim.width,
        height: drawDim.height,
      })

      successCount++
      if (imgStatusEl) imgStatusEl.textContent = '✓'
    } catch (error) {
      console.error(`图片处理失败: ${item.name}`, error)
      failCount++
      if (imgStatusEl) imgStatusEl.textContent = '✗'
    }
  }

  if (successCount === 0) {
    ElMessage.error('所有图片均处理失败，请检查图片格式')
    isGenerating.value = false
    return
  }

  try {
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    generatedPdfUrl.value = url
    generatedPdfSize.value = blob.size

    if (failCount > 0) {
      ElMessage.success(`PDF 生成完成（成功 ${successCount} 张，失败 ${failCount} 张）`)
    } else {
      ElMessage.success(`PDF 生成完成，共 ${successCount} 页`)
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('PDF 文件生成失败')
  } finally {
    isGenerating.value = false
  }
}

function downloadPdf() {
  if (!hasResult.value || !generatedPdfUrl.value) return

  const link = document.createElement('a')
  link.href = generatedPdfUrl.value
  const count = images.value.length
  link.download = `图片转PDF_${count}页_${Date.now()}.pdf`
  link.click()
}

onBeforeUnmount(() => {
  revokePreviews()
  revokeGeneratedPdf()
})
</script>

<ClientOnly>
  <div class="img-to-pdf-page">
    <div class="page-intro">
      <p>纯前端图片转 PDF，所有处理均在浏览器本地完成，文件不会上传到服务器。</p>
      <p>支持 <code>png / jpg / jpeg / webp / bmp / gif</code>，最多 {{ MAX_IMAGES }} 张，单张不超过 20MB。</p>
    </div>
    <div class="toolbar">
      <input
        ref="fileInputRef"
        class="hidden-input"
        type="file"
        multiple
        :accept="ACCEPTED_TYPES.join(',')"
        @change="handleFileChange"
      >
      <el-button type="primary" @click="triggerSelectFile">
        选择图片
      </el-button>
      <el-button
        type="success"
        :loading="isGenerating"
        :disabled="!hasImages || isGenerating"
        @click="generatePdf"
      >
        生成 PDF
      </el-button>
      <el-button
        type="warning"
        :disabled="!hasResult"
        @click="downloadPdf"
      >
        下载 PDF
      </el-button>
      <el-button
        :disabled="!hasImages && !hasResult"
        @click="clearAll"
      >
        清空
      </el-button>
    </div>
    <!-- 设置区域 -->
    <section class="settings-section">
      <h3>PDF 设置</h3>
      <div class="settings-grid">
        <div class="setting-item">
          <label>页面尺寸</label>
          <el-select
            v-model="settings.pageSize"
            style="width: 100%"
            @change="revokeGeneratedPdf"
          >
            <el-option
              v-for="opt in PAGE_SIZE_OPTIONS"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </div>
        <div class="setting-item">
          <label>页面方向</label>
          <el-select
            v-model="settings.orientation"
            style="width: 100%"
            @change="revokeGeneratedPdf"
          >
            <el-option
              v-for="opt in ORIENTATION_OPTIONS"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </div>
        <div class="setting-item">
          <label>图片适配</label>
          <el-select
            v-model="settings.fitMode"
            style="width: 100%"
            @change="revokeGeneratedPdf"
          >
            <el-option
              v-for="opt in FIT_OPTIONS"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </div>
        <div class="setting-item">
          <label>背景颜色</label>
          <el-radio-group
            v-model="settings.background"
            @change="revokeGeneratedPdf"
          >
            <el-radio
              v-for="opt in BG_OPTIONS"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </el-radio>
          </el-radio-group>
        </div>
        <div class="setting-item">
          <label>页面边距 (pt)</label>
          <el-input-number
            v-model="settings.margin"
            :min="0"
            :max="100"
            :step="5"
            style="width: 100%"
            @change="revokeGeneratedPdf"
          />
        </div>
      </div>
    </section>
    <!-- 拖拽上传区 -->
    <section class="drop-zone" :class="{ 'is-drag-active': isDragActive }">
      <div
        class="drop-zone-inner"
        @dragenter="handleDragEnter"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <template v-if="!hasImages">
          <div class="drop-icon">📄</div>
          <p class="drop-text">拖拽图片到此处，或点击上方「选择图片」按钮</p>
          <p class="drop-hint">支持 PNG / JPG / JPEG / WebP / BMP / GIF</p>
        </template>
        <template v-else>
          <p class="drop-text">继续拖拽添加图片（当前 {{ imageCountText }}）</p>
        </template>
      </div>
    </section>
    <!-- 图片列表 -->
    <section v-if="hasImages" class="image-list-section">
      <div class="list-header">
        <h3>图片列表（{{ imageCountText }}）</h3>
        <span class="list-hint">可调整图片顺序</span>
      </div>
      <div class="image-grid">
        <div
          v-for="(img, index) in images"
          :key="img.id"
          :data-img-id="img.id"
          class="image-card"
        >
          <div class="card-index">{{ index + 1 }}</div>
          <div class="card-preview">
            <img :src="img.previewUrl" :alt="img.name" class="card-thumb">
          </div>
          <div class="card-info">
            <div class="card-name" :title="img.name">{{ img.name }}</div>
            <div class="card-meta">
              {{ img.width }}×{{ img.height }}
              &middot;
              {{ formatBytes(img.size) }}
            </div>
            <div class="img-status"></div>
          </div>
          <div class="card-actions">
            <el-button
              size="small"
              :disabled="index === 0"
              @click="moveImage(img.id, -1)"
            >
              ▲
            </el-button>
            <el-button
              size="small"
              :disabled="index === images.length - 1"
              @click="moveImage(img.id, 1)"
            >
              ▼
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="removeImage(img.id)"
            >
              ✕
            </el-button>
          </div>
        </div>
      </div>
    </section>
    <!-- 结果区域 -->
    <section v-if="hasResult" class="result-section">
      <div class="result-card">
        <h3>PDF 已就绪</h3>
        <div class="result-meta">
          <span>页数：{{ images.length }} 页</span>
          <span>文件大小：{{ formatBytes(generatedPdfSize) }}</span>
        </div>
        <div class="result-actions">
          <el-button type="warning" @click="downloadPdf">
            下载 PDF
          </el-button>
          <el-button @click="revokeGeneratedPdf">
            关闭
          </el-button>
        </div>
      </div>
    </section>
    <div class="tips-card">
      <h4>说明</h4>
      <ul>
        <li>所有处理均在浏览器本地完成，文件不会上传到任何服务器。</li>
        <li>每张图片生成一页 PDF。</li>
        <li>支持的图片格式：PNG、JPEG/JPG、WebP、BMP、GIF（GIF 动画仅使用第一帧）。</li>
        <li>PNG 和 JPEG 直接嵌入 PDF，其他格式会通过 Canvas 转码为 PNG 嵌入，可能会有画质损耗。</li>
        <li>最多支持 {{ MAX_IMAGES }} 张图片，单张不超过 20MB，边长不超过 {{ MAX_IMAGE_EDGE }}px。</li>
        <li>大量超大图片时，生成时间可能较长，请耐心等待。</li>
      </ul>
    </div>
  </div>
</ClientOnly>

<style scoped>
.img-to-pdf-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-intro {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.8;
}

.page-intro p {
  margin: 0;
}

.hidden-input {
  display: none;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.settings-section {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.settings-section h3 {
  margin: 0 0 12px;
  font-size: 15px;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.setting-item label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.setting-item .el-radio-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.drop-zone {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 16px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  background: var(--vp-c-bg-soft);
}

.drop-zone.is-drag-active {
  border-color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft));
}

.drop-zone-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 16px;
  min-height: 100px;
}

.drop-icon {
  font-size: 32px;
  line-height: 1;
}

.drop-text {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.drop-hint {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.image-list-section {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.list-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.list-header h3 {
  margin: 0;
  font-size: 15px;
}

.list-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.image-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.card-index {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.card-preview {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  background:
    linear-gradient(45deg, #f2f3f5 25%, transparent 25%),
    linear-gradient(-45deg, #f2f3f5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f2f3f5 75%),
    linear-gradient(-45deg, transparent 75%, #f2f3f5 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

.card-thumb {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.img-status {
  font-size: 13px;
  font-weight: 600;
}

.card-actions {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.card-actions .el-button {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  font-size: 12px;
}

.result-section {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.result-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-card h3 {
  margin: 0;
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.result-actions {
  display: flex;
  gap: 12px;
}

.tips-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.tips-card h4 {
  margin: 0;
}

.tips-card ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
}

.tips-card li + li {
  margin-top: 8px;
}

@media (max-width: 960px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
