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

const fileInputRef = ref(null)
const selectedFile = ref(null)
const originalPreviewUrl = ref('')
const svgText = ref('')
const isConverting = ref(false)
const imageMeta = ref(null)
const conversionMeta = ref(null)

let imageTracerPromise = null

const hasFile = computed(() => Boolean(selectedFile.value && originalPreviewUrl.value))
const hasResult = computed(() => Boolean(svgText.value))
const fileName = computed(() => selectedFile.value?.name || '未选择文件')
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

function clearAll() {
  selectedFile.value = null
  imageMeta.value = null
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

async function handleFileChange(event) {
  const file = event.target.files?.[0]
  event.target.value = ''

  if (!file) {
    return
  }

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

async function startConvert() {
  if (!hasFile.value) {
    ElMessage.warning('请先选择一张图片')
    return
  }

  isConverting.value = true
  clearResult()

  try {
    const [imageTracer, image] = await Promise.all([
      getImageTracer(),
      loadImage(originalPreviewUrl.value),
    ])

    const { width, height } = getImageDimensions(image)
    const { width: targetWidth, height: targetHeight, scaleRatio } = calculateTargetSize(width, height)
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
      width: targetWidth,
      height: targetHeight,
      scaleRatio,
    }
    ElMessage.success('SVG 转换完成')
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
      <p>支持 <code>png / jpg / jpeg / webp</code>，单张图片最大 5MB，超大图片会自动缩放后再矢量化。</p>
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
      <el-button type="success" :loading="isConverting" :disabled="!hasFile" @click="startConvert">
        开始转换
      </el-button>
      <el-button :disabled="!hasResult" @click="copySvg">复制 SVG</el-button>
      <el-button :disabled="!hasResult" @click="downloadSvg">下载 SVG</el-button>
      <el-button :disabled="!hasFile && !hasResult" @click="clearAll">清空</el-button>
    </div>
    <div class="file-summary">
      <span>当前文件：{{ fileName }}</span>
      <span v-if="imageMeta">文件大小：{{ imageMeta.sizeText }}</span>
      <span v-if="imageMeta">
        原图尺寸：{{ imageMeta.width }} × {{ imageMeta.height }}
      </span>
      <span v-if="imageMeta && imageMeta.scaleRatio < 1">
        转换前会自动缩放到 {{ imageMeta.targetWidth }} × {{ imageMeta.targetHeight }}
      </span>
      <span v-else-if="imageMeta">
        当前尺寸无需缩放
      </span>
    </div>
    <div class="panel-grid">
      <section class="panel-card">
        <div class="panel-head">
          <div>
            <h3>原图预览</h3>
            <p>上传后点击“开始转换”才会执行矢量化。</p>
          </div>
        </div>
        <div class="preview-stage checkerboard">
          <img v-if="originalPreviewUrl" :src="originalPreviewUrl" alt="原图预览" class="preview-image">
          <div v-else class="empty-state">
            请选择一张图片开始
          </div>
        </div>
      </section>
      <section class="panel-card">
        <div class="panel-head">
          <div>
            <h3>SVG 预览</h3>
            <p>默认使用偏保真的转换参数，保留透明背景。</p>
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
          <span>输出尺寸：{{ conversionMeta.width }} × {{ conversionMeta.height }}</span>
          <span v-if="conversionMeta.scaleRatio < 1">
            缩放比例：{{ Math.round(conversionMeta.scaleRatio * 100) }}%
          </span>
        </div>
      </section>
    </div>
    <div class="tips-card">
      <h4>说明</h4>
      <ul>
        <li>当前是一键转换版本，代码里已经预留了后续扩展参数的位置。</li>
        <li>如果原图特别复杂，生成的 SVG 体积可能会比较大，这是矢量化保真模式的正常现象。</li>
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
  color: var(--vp-c-text-3);
  font-size: 14px;
  text-align: center;
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
