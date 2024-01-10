<script setup lang="ts">
import { createGoods, deleteGoods, getOneById, getGoodsList, updateGoods } from '@/apis/goods';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import useUserStore from '@/store/userStore';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, FormInstance, UploadProps } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import WangEditor from '../components/wangEditor.vue';

export interface CreateGoodsForm {
  goods_name: string;
  description: string;
  cover_img: string;
  price: number;
}

const createGoodsFormRef = ref<FormInstance>();
const useStore = useUserStore();
// 表格数据
const tableData = ref();
// 是否处于编辑状态
const isEditStatus = ref(false);
// 编辑的商品id
const goodsIdInEdit = ref();
// 对话框显隐控制
const dialogFormVisible = ref(false);
// 创建商品表格行宽度
const formLabelWidth = '80px';
// 创建商品数据
const form = reactive<CreateGoodsForm>({
  goods_name: '',
  description: '',
  cover_img: '',
  price: useStore.profile?.id,
});
// token
const token = computed(() => `Bearer ${localStorage.getItem(LocalStoreKey.TOKEN_KEY)}`);

const columns = reactive({
  id: {
    id: 'id',
    label: 'ID',
    width: 50,
  },
  goods_name: {
    id: 'goods_name',
    label: '商品名称',
    width: 200,
  },
  description: {
    id: 'description',
    label: '描述',
    width: 150,
    showOverflowTooltip: true,
  },
  price: {
    id: 'price',
    label: '价格',
    width: 100,
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
 * 获取商品列表
 */
tableData.value = await getGoodsList();

/**
 * 取消创建商品
 */
const onCancel = () => {
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  goodsIdInEdit.value = null;
  createGoodsFormRef.value?.resetFields();
};

/**
 * 提交创建或者编辑商品
 */
const onConfirm = async () => {
  const { ...Uform } = form;
  const res = isEditStatus.value ? await updateGoods(goodsIdInEdit.value, Uform) : await createGoods(form);
  if (res) ElMessage({ type: 'success', message: isEditStatus.value ? '更新成功' : '创建成功' });
  else ElMessage({ type: 'error', message: isEditStatus.value ? '更新失败' : '创建失败' });
  tableData.value = await getGoodsList();
  dialogFormVisible.value = false;
  isEditStatus.value = false;
  goodsIdInEdit.value = null;
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
 * 删除商品
 * @param id
 */
const onDeleteGoods = (id: number) => {
  ElMessageBox.confirm('确定删除商品？删除之后将不可恢复！', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await deleteGoods(id);
      if (!res) throw new Error();
      tableData.value = await getGoodsList();
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
  goodsIdInEdit.value = id;
  dialogFormVisible.value = true;

  const goods = await getOneById(id);
  form.goods_name = goods.goods_name;
  form.description = goods.description;
  form.cover_img = goods.cover_img;
  form.price = goods.price;
};

/**
 * 确认编辑
 */
</script>

<template>
  <div class="goods">
    <el-button type="primary" size="default" @click="dialogFormVisible = true">新增商品</el-button>
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
        <template v-if="col.id === 'operation'" #default="{ row }">
          <el-button type="primary" size="small" @click="onEdit(row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="onDeleteGoods(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 创建商品对话框 -->
    <el-dialog v-model="dialogFormVisible" description="创建商品">
      <el-form ref="createGoodsFormRef" :model="form">
        <el-form-item prop="goods_name" label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goods_name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="description" label="描述" :label-width="formLabelWidth">
          <WangEditor v-model="form.description" />
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" />
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
