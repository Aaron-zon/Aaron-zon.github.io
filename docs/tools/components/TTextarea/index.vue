<template> 
  <div class="textarea-container">
    <el-input 
      :rows="10" 
      type="textarea" 
      v-model="text" 
      :placeholder="props.placeholder"
      :disabled="props.disabled !== undefined"
    />
  </div>
</template>

<script setup>
const props = defineProps(['placeholder', 'disabled'])
const text = defineModel('text')
</script>

<style scoped>
.textarea-container {
  margin: 20px 0;
}
.textarea-container :deep(.el-textarea__inner) {
  resize: none;
}
</style>