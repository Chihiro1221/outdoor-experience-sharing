<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onChange="onChange"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const emit = defineEmits(['update:modelValue', 'update']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref();
// setTimeout(() => {
//   valueHtml.value = props.modelValue;
// }, 500);

watch(
  () => props.modelValue,
  val => {
    valueHtml.value = val;
  },
  { immediate: true }
);
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const onChange = value => {
  emit('update:modelValue', editorRef.value.getHtml());
  // console.log(value);
};
</script>
