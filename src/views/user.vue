<script setup lang="ts">
import { createUser, deleteUser, getOneById, getUserList, updateUser } from '@/apis/user';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormInstance, UploadProps } from 'element-plus';
import { computed, reactive, ref } from 'vue';

export interface CreateUserForm {
  phone: string;
  password: string;
  nickname: string;
  avatar: string;
}

const createUserFormRef = ref<FormInstance>();
// 表格数据
const tableData = ref();
// 是否处于编辑状态
const isEditStatus = ref(false);
// 编辑的用户id
const userIdInEdit = ref();
// 对话框显隐控制
const dialogFormVisible = ref(false);
// 创建用户表格行宽度
const formLabelWidth = '100px';
// 创建用户数据
const form = reactive<CreateUserForm>({
  phone: '',
  password: '',
  nickname: '',
  avatar: '',
});
// token
const token = computed(() => `Bearer ${localStorage.getItem(LocalStoreKey.TOKEN_KEY)}`);

const columns = reactive({
  id: {
    id: 'id',
    label: 'ID',
    width: 50,
  },
  nickname: {
    id: 'nickname',
    label: '昵称',
    width: 200,
  },
  phone: {
    id: 'phone',
    label: '手机号',
    width: 150,
  },
  avatar: {
    id: 'avatar',
    label: '头像',
    width: 130,
  },
  role: {
    id: 'role',
    label: '角色',
    width: 100,
  },
  createdAt: {
    id: 'createdAt',
    label: '创建日期',
    width: 240,
  },
  updatedAt: {
    id: 'updatedAt',
    label: '更新日期',
    width: 240,
  },
  operation: {
    id: 'operation',
    label: '操作',
    // width: 160,
  },
});

/**
 * 获取用户列表
 */
tableData.value = await getUserList();

/**
 * 取消创建用户
 */
const onCancel = () => {
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  userIdInEdit.value = null;
  createUserFormRef.value?.resetFields();
};

/**
 * 提交创建或者编辑用户
 */
const onConfirm = async () => {
  const { password, ...Uform } = form;
  const res = isEditStatus.value ? await updateUser(userIdInEdit.value, Uform) : await createUser(form);
  if (res) ElMessage({ type: 'success', message: isEditStatus.value ? '更新成功' : '创建成功' });
  else ElMessage({ type: 'error', message: isEditStatus.value ? '更新失败' : '创建失败' });
  tableData.value = await getUserList();
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  userIdInEdit.value = null;
};

/**
 * 上传图片成功
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.avatar = response.url;
};

/**
 * 删除用户
 * @param id
 */
const onDeleteUser = (id: number) => {
  ElMessageBox.confirm('确定删除用户？删除之后将不可恢复！', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await deleteUser(id);
      if (!res) throw new Error();
      tableData.value = await getUserList();
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
  userIdInEdit.value = id;
  dialogFormVisible.value = true;

  const user = await getOneById(id);
  form.phone = user.phone;
  form.nickname = user.nickname;
  form.avatar = user.avatar;
};

/**
 * 确认编辑
 */
</script>

<template>
  <div class="user">
    <el-button type="primary" size="default" @click="dialogFormVisible = true">新增用户</el-button>
    <el-table class="mt-4" :data="tableData" :columns="columns" border stripe>
      <el-table-column align="center" label="序号" type="index" width="60" />
      <el-table-column align="center" v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width">
        <template #default="{ row }" v-if="col.id === 'avatar'">
          <el-image preview-teleported :z-index="999999" :preview-src-list="[row.avatar]" :size="60" shape="square" :src="row.avatar" />
        </template>
        <template #default="{ row }" v-if="col.id === 'role'">
          <el-tag v-if="row.role === 1" type="success">管理员</el-tag>
          <el-tag v-else type="info">普通用户</el-tag></template
        >
        <template v-if="col.id === 'operation'" #default="{ row }">
          <el-button type="primary" size="small" @click="onEdit(row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="onDeleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 创建用户对话框 -->
    <el-dialog v-model="dialogFormVisible" title="创建用户">
      <el-form ref="createUserFormRef" :model="form">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="!isEditStatus" prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :headers="{ Authorization: token }"
            action="http://127.0.0.1:8000/upload"
            name="avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover .el-icon.avatar-uploader-icon {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  border: 1px dashed var(--el-border-color);
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
