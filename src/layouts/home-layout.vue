<script setup lang="ts">
import useUserStore from '@/store/userStore';
const userStore = useUserStore();
</script>

<template>
  <div class="home flex min-h-screen">
    <el-menu :default-active="$route.path" router class="el-menu-vertical-demo">
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>欢迎页面</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon><Menu /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/topic">
        <el-icon><document /></el-icon>
        <span>帖子管理</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <el-icon><setting /></el-icon>
        <span>商品管理</span>
      </el-menu-item>
    </el-menu>
    <div class="flex-1 main-content">
      <div class="w-full border-b min-h-14 gap-2 flex items-center justify-end px-4">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div>{{ userStore.profile?.nickname }}</div>
        <el-dropdown>
          <el-icon class="cursor-pointer" size="20px"><Setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userStore.logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <router-view #default="{ Component }">
        <div class="flex-1 p-4">
          <suspense>
            <Component :is="Component" />
          </suspense>
        </div>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
