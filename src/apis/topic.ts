import http from '@/plugins/axios';

// type UpdateTopicForm = Omit<CreateTopicForm, 'password'>;

/**
 * 获取帖子列表
 * @param
 * @returns
 */
export function getTopicList() {
  return http.request({
    url: '/topic',
  });
}

/**
 * 创建帖子
 * @param
 * @returns
 */
export function createTopic(data: any) {
  return http.request({
    url: '/topic',
    method: 'post',
    data,
  });
}

/**
 * 更新帖子
 * @param
 * @returns
 */
export function updateTopic(id: number, data: any) {
  return http.request({
    url: `/topic/${id}`,
    method: 'put',
    data,
  });
}

/**
 * 删除帖子
 * @param
 * @returns
 */
export function deleteTopic(id: number) {
  return http.request({
    url: `/topic/${id}`,
    method: 'delete',
  });
}

/**
 * 获取指定id帖子信息
 */
export function getOneById(id: number) {
  return http.request({
    url: `/topic/${id}`,
  });
}
