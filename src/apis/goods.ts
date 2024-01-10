import http from '@/plugins/axios';

// type UpdateGoodsForm = Omit<CreateGoodsForm, 'password'>;

/**
 * 获取商品列表
 * @param
 * @returns
 */
export function getGoodsList() {
  return http.request({
    url: '/goods',
  });
}

/**
 * 创建商品
 * @param
 * @returns
 */
export function createGoods(data: any) {
  return http.request({
    url: '/goods',
    method: 'post',
    data,
  });
}

/**
 * 更新商品
 * @param
 * @returns
 */
export function updateGoods(id: number, data: any) {
  return http.request({
    url: `/goods/${id}`,
    method: 'put',
    data,
  });
}

/**
 * 删除商品
 * @param
 * @returns
 */
export function deleteGoods(id: number) {
  return http.request({
    url: `/goods/${id}`,
    method: 'delete',
  });
}

/**
 * 获取指定id商品信息
 */
export function getOneById(id: number) {
  return http.request({
    url: `/goods/${id}`,
  });
}
