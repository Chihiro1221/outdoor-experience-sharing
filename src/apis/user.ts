import http from '@/plugins/axios';
import { LoginFormData } from '@/views/login.vue';
import { CreateUserForm } from '@/views/user.vue';

type UpdateUserForm = Omit<CreateUserForm, 'password'>;

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data: LoginFormData) {
  return http.request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

/**
 * 获取用户信息
 * @param
 * @returns
 */
export function getProfile() {
  return http.request({
    url: '/user/profile',
  });
}

/**
 * 获取用户列表
 * @param
 * @returns
 */
export function getUserList() {
  return http.request({
    url: '/user',
  });
}

/**
 * 创建用户
 * @param
 * @returns
 */
export function createUser(data: CreateUserForm) {
  return http.request({
    url: '/user',
    method: 'post',
    data,
  });
}

/**
 * 更新用户
 * @param
 * @returns
 */
export function updateUser(id: number, data: UpdateUserForm) {
  return http.request({
    url: `/user/${id}`,
    method: 'put',
    data,
  });
}

/**
 * 删除用户
 * @param
 * @returns
 */
export function deleteUser(id: number) {
  return http.request({
    url: `/user/${id}`,
    method: 'delete',
  });
}

/**
 * 获取指定id用户信息
 */
export function getOneById(id: number) {
  return http.request({
    url: `/user/${id}`,
  });
}
