import { getProfile } from '@/apis/user';
import { LocalStoreKey } from '@/enums/LocalStoreKey';
import router from '@/router';
import { rejects } from 'assert';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('userStore', () => {
  const profile = ref();

  function getUserProfile() {
    return new Promise(async (resolve, reject) => {
      const user = await getProfile();
      if (user.role !== 1) {
        return reject('非管理员无法登录');
      }
      profile.value = user;
      return resolve('获取成功');
    });
  }

  function logout() {
    localStorage.removeItem(LocalStoreKey.TOKEN_KEY);
    profile.value = null;
    router.push({ name: 'login' });
  }
  return { profile, getUserProfile, logout };
});
