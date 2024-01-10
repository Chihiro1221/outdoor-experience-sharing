<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { login } from '@/apis/user';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import router from '@/router';
import useUserStore from '@/store/userStore';

const { getUserProfile } = useUserStore();

export interface LoginFormData {
  phone: string;
  password: string;
}
const formData = reactive<LoginFormData>({
  phone: '15933371902',
  password: '123456',
});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
});

/**
 * 提交登录
 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const res = await login(formData);
        // 将token存储到本地
        localStorage.setItem(LocalStoreKey.TOKEN_KEY, res.token);
        // 获取用户信息
        getUserProfile()
          .then(() => {
            // 跳转到管理首页
            router.push({ name: 'home' });
          })
          .catch(e => {
            ElMessage({ type: 'error', message: '非管理员无法登录' });
          });
      } catch (e) {
        console.log(e);

        ElMessage({ type: 'error', message: '登录失败，请稍后重试' });
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<template>
  <div class="login bg-gray-700 w-full h-screen flex flex-col items-center justify-center">
    <div class="form-container w-[500px] bg-white rounded shadow p-4">
      <el-form :model="formData" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <h2 class="text-center text-xl fond-bold mb-8">用户登录</h2>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formData.phone" clearable placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formData.password" clearable placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
