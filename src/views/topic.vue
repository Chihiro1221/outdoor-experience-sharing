<script setup lang="ts">
import { createTopic, deleteTopic, getOneById, getTopicList, updateTopic } from '@/apis/topic';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import useUserStore from '@/store/userStore';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormInstance, UploadProps } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import WangEditor from '../components/wangEditor.vue';

export interface CreateTopicForm {
  content: string;
  title: string;
  cover_img: string;
  user_id: number;
}

const createTopicFormRef = ref<FormInstance>();
const useStore = useUserStore();
// 表格数据
const tableData = ref();
// 是否处于编辑状态
const isEditStatus = ref(false);
// 编辑的帖子id
const topicIdInEdit = ref();
// 对话框显隐控制
const dialogFormVisible = ref(false);
// 创建帖子表格行宽度
const formLabelWidth = 'auto';
// 创建帖子数据
const form = reactive<CreateTopicForm>({
  content: '',
  title: '',
  cover_img: '',
  user_id: useStore.profile?.id,
});
// token
const token = computed(() => `Bearer ${localStorage.getItem(LocalStoreKey.TOKEN_KEY)}`);

const columns = reactive({
  id: {
    id: 'id',
    label: 'ID',
    width: 50,
  },
  user_id: {
    id: 'user_id',
    label: '创建人',
    width: 100,
  },
  title: {
    id: 'title',
    label: '标题',
    width: 150,
  },
  content: {
    id: 'content',
    label: '内容',
    width: 200,
    showOverflowTooltip: true,
  },
  cover_img: {
    id: 'cover_img',
    label: '封面',
    width: 130,
  },
  createdAt: {
    id: 'createdAt',
    label: '创建日期',
    width: 220,
  },
  updatedAt: {
    id: 'updatedAt',
    label: '更新日期',
    width: 220,
  },
  operation: {
    id: 'operation',
    label: '操作',
    // width: 160,
  },
});

/**
 * 获取帖子列表
 */
tableData.value = await getTopicList();

/**
 * 取消创建帖子
 */
const onCancel = () => {
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  topicIdInEdit.value = null;
  createTopicFormRef.value?.resetFields();
};

/**
 * 提交创建或者编辑帖子
 */
const onConfirm = async () => {
  const { ...Uform } = form;
  const res = isEditStatus.value ? await updateTopic(topicIdInEdit.value, Uform) : await createTopic(form);
  if (res) ElMessage({ type: 'success', message: isEditStatus.value ? '更新成功' : '创建成功' });
  else ElMessage({ type: 'error', message: isEditStatus.value ? '更新失败' : '创建失败' });
  tableData.value = await getTopicList();
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  topicIdInEdit.value = null;
};

/**
 * 上传图片成功
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.cover_img = response.url;
};

/**
 * 删除帖子
 * @param id
 */
const onDeleteTopic = (id: number) => {
  ElMessageBox.confirm('确定删除帖子？删除之后将不可恢复！', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await deleteTopic(id);
      if (!res) throw new Error();
      tableData.value = await getTopicList();
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};

/**
 * 打开编辑
 */
const onEdit = async (id: number) => {
  isEditStatus.value = true;
  topicIdInEdit.value = id;
  dialogFormVisible.value = true;

  const topic = await getOneById(id);
  form.content = topic.content;
  form.title = topic.title;
  form.cover_img = topic.cover_img;
};

/**
 * 确认编辑
 */
</script>

<template>
  <div class="topic">
    <el-button type="primary" size="default" @click="dialogFormVisible = true">新增帖子</el-button>
    <el-table class="mt-4" :data="tableData" :columns="columns" border stripe>
      <el-table-column align="center" label="序号" type="index" width="60" />
      <el-table-column
        align="center"
        v-for="col in columns"
        :show-overflow-tooltip="col.showOverflowTooltip"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      >
        <template #default="{ row }" v-if="col.id === 'cover_img'">
          <el-image preview-teleported :z-index="999999" :preview-src-list="[row.cover_img]" :size="60" shape="square" :src="row.cover_img" />
        </template>
        <template #default="{ row }" v-if="col.id === 'user_id'"> {{ row.user.nickname }} </template>
        <template #default="{ row }" v-if="col.id === 'role'">
          <el-tag v-if="row.role === 1" type="success">管理员</el-tag>
          <el-tag v-else type="info">普通帖子</el-tag></template
        >
        <template v-if="col.id === 'operation'" #default="{ row }">
          <el-button type="primary" size="small" @click="onEdit(row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="onDeleteTopic(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 创建帖子对话框 -->
    <el-dialog v-model="dialogFormVisible" title="创建帖子">
      <el-form ref="createTopicFormRef" :model="form">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="content" label="内容" :label-width="formLabelWidth">
          <WangEditor v-model="form.content" />
        </el-form-item>
        <el-form-item prop="cover_img" label="封面" :label-width="formLabelWidth">
          <el-upload
            class="cover_img-uploader"
            :headers="{ Authorization: token }"
            action="http://127.0.0.1:8000/upload"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.cover_img" :src="form.cover_img" class="cover_img" />
            <el-icon v-else class="cover_img-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm"> {{ isEditStatus ? '编辑' : '创建' }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.cover_img-uploader .cover_img {
  width: 178px;
  height: 178px;
  display: block;
}
.cover_img-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.cover_img-uploader .el-upload:hover .el-icon.cover_img-uploader-icon {
  border-color: var(--el-color-primary);
}

.el-icon.cover_img-uploader-icon {
  font-size: 28px;
  border: 1px dashed var(--el-border-color);
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
