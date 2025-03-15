<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="50%"
    :before-close="handleClose">
    <div class="markdown-body" v-html="renderedContent"></div>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown.css'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '帮助说明'
  },
  content: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const renderedContent = computed(() => {
  return marked(props.content)
})

const handleClose = () => {
  dialogVisible.value = false
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style> 