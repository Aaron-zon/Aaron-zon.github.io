# 图片 to SVG

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'

const ACCEPTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_EDGE = 1600
const MAX_PIXELS = 2000000

const traceOptions = {
  ltres: 0.7,
  qtres: 0.7,
  pathomit: 2,
  rightangleenhance: false,
  colorsampling: 2,
  numberofcolors: 28,
  mincolorratio: 0,
  colorquantcycles: 3,
  layering: 0,
  strokewidth: 0,
  linefilter: false,
  scale: 1,
  roundcoords: 2,
  viewbox: true,
  desc: false,
  lcpr: 0,
  qcpr: 0,
  blurradius: 1,
  blurdelta: 24,
}

const CONVERT_MODES = {
  EMBED: 'embed',
  TRACE: 'trace',
}

const fileInputRef = ref(null)
const selectedFile = ref(null)
const originalPreviewUrl = ref('')
const svgText = ref('')
const isConverting = ref(false)
const imageMeta = ref(null)
const conversionMeta = ref(null)
const convertMode = ref(CONVERT_MODES.EMBED)
const isDragActive = ref(false)

let imageTracerPromise = null
let dragDepth = 0

const hasFile = computed(() => Boolean(selectedFile.value && originalPreviewUrl.value))

const hasResult = computed(() => Boolean(svgText.value))
const fileName = computed(() => selectedFile.value?.name || '未选择文件')
const currentModeText = computed(() => (
  convertMode.value === CONVERT_MODES.EMBED ? '图片包 SVG' : '矢量追踪'
))
const currentModeDescription = computed(() => (
  convertMode.value === CONVERT_MODES.EMBED
    ? '当前为图片包 SVG：正常尺寸显示更平滑，但不是真矢量。'
    : '当前为矢量追踪：会生成路径，复杂图片可能出现毛刺。'
))
const downloadFileName = computed(() => {
  if (!selectedFile.value) {
    return 'image-to-svg.svg'
  }

  return `${selectedFile.value.name.replace(/\.[^.]+$/, '') || 'image-to-svg'}.svg`
})

function triggerSelectFile() {
  fileInputRef.value?.click()
}

function formatBytes(bytes) {
  if (!bytes) {
    return '0 B'
  }

  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getImageDimensions(image) {
  return {
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
  }
}

function calculateTargetSize(width, height) {
  const maxSideRatio = MAX_EDGE / Math.max(width, height)
  const maxPixelRatio = Math.sqrt(MAX_PIXELS / (width * height))
  const ratio = Math.min(1, maxSideRatio, maxPixelRatio)

  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
    scaleRatio: ratio,
  }
}

function revokeOriginalPreview() {
  if (!originalPreviewUrl.value) {
    return
  }

  URL.revokeObjectURL(originalPreviewUrl.value)
  originalPreviewUrl.value = ''
}

function clearResult() {
  svgText.value = ''
  conversionMeta.value = null
}

function handleModeChange() {
  clearResult()
}

function clearAll() {
  selectedFile.value = null
  imageMeta.value = null
  isDragActive.value = false
  dragDepth = 0
  clearResult()
  revokeOriginalPreview()
}

function isAcceptedFile(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || ''
  return ACCEPTED_MIME_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(extension)
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('图片读取失败'))
    image.src = url
  })
}

async function getImageTracer() {
  if (!imageTracerPromise) {
    imageTracerPromise = import('imagetracerjs').then(module => module.default || module)
  }

  return imageTracerPromise
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('图片读取失败'))
    reader.readAsDataURL(file)
  })
}

function escapeXmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildEmbeddedSvg({ dataUrl, width, height }) {
  const safeHref = escapeXmlAttr(dataUrl)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image href="${safeHref}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" />
</svg>`
}

async function processSelectedFile(file) {
  if (!isAcceptedFile(file)) {
    ElMessage.error('仅支持 PNG、JPG、JPEG、WEBP 格式')
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    ElMessage.error('图片大小不能超过 5MB')
    return
  }

  const nextPreviewUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(nextPreviewUrl)
    const { width, height } = getImageDimensions(image)
    const { width: targetWidth, height: targetHeight, scaleRatio } = calculateTargetSize(width, height)

    revokeOriginalPreview()
    selectedFile.value = file
    originalPreviewUrl.value = nextPreviewUrl
    imageMeta.value = {
      width,
      height,
      targetWidth,
      targetHeight,
      scaleRatio,
      sizeText: formatBytes(file.size),
    }
    clearResult()
  } catch (error) {
    URL.revokeObjectURL(nextPreviewUrl)
    ElMessage.error('图片读取失败，请重新选择')
  }
}

async function handleFileChange(event) {
  const file = event.target.files?.[0]
  event.target.value = ''

  if (!file) {
    return
  }

  await processSelectedFile(file)
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

  const file = event.dataTransfer?.files?.[0]

  if (!file) {
    return
  }

  await processSelectedFile(file)
}


async function startConvert() {
  if (!hasFile.value || !selectedFile.value || !imageMeta.value) {
    ElMessage.warning('请先选择一张图片')
    return
  }

  isConverting.value = true
  clearResult()

  try {
    if (convertMode.value === CONVERT_MODES.EMBED) {
      const dataUrl = await readFileAsDataUrl(selectedFile.value)
      const { width, height } = imageMeta.value

      svgText.value = buildEmbeddedSvg({
        dataUrl,
        width,
        height,
      })
      conversionMeta.value = {
        mode: CONVERT_MODES.EMBED,
        width,
        height,
        scaleRatio: 1,
      }
      ElMessage.success('SVG 转换完成（图片包 SVG）')
      return
    }

    const [imageTracer, image] = await Promise.all([
      getImageTracer(),
      loadImage(originalPreviewUrl.value),
    ])

    const { targetWidth, targetHeight, scaleRatio } = imageMeta.value
    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight

    const context = canvas.getContext('2d', { willReadFrequently: true })

    if (!context) {
      throw new Error('无法创建画布上下文')
    }

    context.clearRect(0, 0, targetWidth, targetHeight)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.drawImage(image, 0, 0, targetWidth, targetHeight)

    const svg = imageTracer.imagedataToSVG(
      context.getImageData(0, 0, targetWidth, targetHeight),
      traceOptions,
    )

    if (!svg) {
      throw new Error('SVG 生成失败')
    }

    svgText.value = svg
    conversionMeta.value = {
      mode: CONVERT_MODES.TRACE,
      width: targetWidth,
      height: targetHeight,
      scaleRatio,
    }
    ElMessage.success('SVG 转换完成（矢量追踪）')
  } catch (error) {
    console.error(error)
    ElMessage.error('转换失败，请尝试更换图片后重试')
  } finally {
    isConverting.value = false
  }
}

async function copySvg() {
  if (!hasResult.value) {
    return
  }

  try {
    await navigator.clipboard.writeText(svgText.value)
    ElMessage.success('SVG 内容已复制')
  } catch (error) {
    console.error(error)
    ElMessage.error('复制失败，请检查浏览器权限')
  }
}

function downloadSvg() {
  if (!hasResult.value) {
    return
  }

  const blob = new Blob([svgText.value], { type: 'image/svg+xml;charset=utf-8' })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = downloadFileName.value
  link.click()

  URL.revokeObjectURL(downloadUrl)
}

onBeforeUnmount(() => {
  revokeOriginalPreview()
})
</script>

<ClientOnly>
  <div class="img-to-svg-page">
    <div class="page-intro">
      <p>纯前端图片转 SVG，文件不会上传到服务器。</p>
      <p>支持 <code>png / jpg / jpeg / webp</code>，默认使用图片包 SVG，也可切换到矢量追踪模式。</p>
    </div>
    <div class="toolbar">
      <input
        ref="fileInputRef"
        class="hidden-input"
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        @change="handleFileChange"
      >
      <el-button type="primary" @click="triggerSelectFile">选择图片</el-button>
      <el-select
        v-model="convertMode"
        style="width: 220px"
        @change="handleModeChange"
      >
        <el-option label="图片包 SVG（默认）" :value="CONVERT_MODES.EMBED" />
        <el-option label="矢量追踪（旧方式）" :value="CONVERT_MODES.TRACE" />
      </el-select>
      <el-button type="success" :loading="isConverting" :disabled="!hasFile" @click="startConvert">
        开始转换
      </el-button>
      <el-button :disabled="!hasResult" @click="copySvg">复制 SVG</el-button>
      <el-button :disabled="!hasResult" @click="downloadSvg">下载 SVG</el-button>
      <el-button :disabled="!hasFile && !hasResult" @click="clearAll">清空</el-button>
    </div>
    <div class="file-summary">
      <span>当前文件：{{ fileName }}</span>
      <span>转换模式：{{ currentModeText }}</span>
      <span v-if="imageMeta">文件大小：{{ imageMeta.sizeText }}</span>
      <span v-if="imageMeta">
        原图尺寸：{{ imageMeta.width }} × {{ imageMeta.height }}
      </span>
      <span v-if="imageMeta && convertMode === CONVERT_MODES.TRACE && imageMeta.scaleRatio < 1">
        矢量追踪前会自动缩放到 {{ imageMeta.targetWidth }} × {{ imageMeta.targetHeight }}
      </span>
      <span v-else-if="imageMeta && convertMode === CONVERT_MODES.TRACE">
        当前尺寸无需缩放
      </span>
      <span v-else-if="imageMeta">
        图片将按原始尺寸嵌入 SVG
      </span>
    </div>
    <div class="panel-grid">
      <section class="panel-card">
        <div class="panel-head">
          <div>
            <h3>原图预览</h3>
            <!-- <p>支持点击选择，也可以直接拖拽图片到预览区上传。</p> -->
          </div>
        </div>
        <div
          class="preview-stage checkerboard upload-stage"
          :class="{ 'is-drag-active': isDragActive }"
          @click="triggerSelectFile"
          @keydown.enter.prevent="triggerSelectFile"
          @keydown.space.prevent="triggerSelectFile"
          @dragenter="handleDragEnter"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
          role="button"
          tabindex="0"
        >
          <img v-if="originalPreviewUrl" :src="originalPreviewUrl" alt="原图预览" class="preview-image">
          <div v-else class="empty-state">
            <strong>拖拽图片到这里上传</strong>
            <span>或点击此区域选择文件</span>
          </div>
          <div v-if="originalPreviewUrl" class="upload-tip">
            {{ isDragActive ? '松手即可替换当前图片' : '拖拽新图片到这里可直接替换' }}
          </div>
        </div>
      </section>
      <section class="panel-card">
        <div class="panel-head">
          <div>
            <h3>SVG 预览</h3>
            <!-- <p>{{ currentModeDescription }}</p> -->
          </div>
          <span v-if="isConverting" class="status-text">转换中...</span>
        </div>
        <div class="preview-stage checkerboard">
          <div v-if="svgText" class="svg-preview" v-html="svgText"></div>
          <div v-else class="empty-state">
            {{ isConverting ? '正在生成 SVG，请稍候...' : '转换完成后将在这里预览 SVG' }}
          </div>
        </div>
        <div v-if="conversionMeta" class="result-meta">
          <span>输出方式：{{ currentModeText }}</span>
          <span>输出尺寸：{{ conversionMeta.width }} × {{ conversionMeta.height }}</span>
          <span v-if="convertMode === CONVERT_MODES.TRACE && conversionMeta.scaleRatio < 1">
            缩放比例：{{ Math.round(conversionMeta.scaleRatio * 100) }}%
          </span>
        </div>
      </section>
    </div>
    <div class="tips-card">
      <h4>说明</h4>
      <ul>
        <li>默认使用图片包 SVG，适合优先保证正常尺寸下的显示平滑度。</li>
        <li>矢量追踪模式会生成路径，复杂图片的 SVG 体积可能更大，也可能出现边缘毛刺。</li>
      </ul>
    </div>

  </div>
</ClientOnly>

<style scoped>
.img-to-svg-page {
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

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hidden-input {
  display: none;
}

.file-summary,
.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.panel-card,
.tips-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.panel-head h3,
.tips-card h4 {
  margin: 0;
}

.panel-head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.status-text {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  white-space: nowrap;
}

.preview-stage {
  min-height: 360px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
}

.upload-stage {
  position: relative;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.upload-stage:hover,
.upload-stage:focus-visible {
  border-color: var(--vp-c-brand-1);
}

.upload-stage:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}

.upload-stage.is-drag-active {
  border-color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 6%, #fff);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}

.checkerboard {

  background-image:
    linear-gradient(45deg, #f2f3f5 25%, transparent 25%),
    linear-gradient(-45deg, #f2f3f5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f2f3f5 75%),
    linear-gradient(-45deg, transparent 75%, #f2f3f5 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

.preview-image,
.svg-preview {
  width: 100%;
  height: 100%;
}

.preview-image {
  object-fit: contain;
}

.svg-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-preview :deep(svg) {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  text-align: center;
}

.empty-state strong {
  color: var(--vp-c-text-1);
}

.upload-tip {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
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
  .panel-grid {
    grid-template-columns: 1fr;
  }

  .preview-stage {
    min-height: 280px;
  }
}
</style>
