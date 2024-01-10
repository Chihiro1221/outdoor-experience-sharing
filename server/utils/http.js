const http = require('axios');

/**
 * 获取openid
 * @param {string} code 唯一凭证
 * @returns
 */
const getOpenId = async code => {
  const res = await http.get({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      appid: process.env.APPID,
      secret: process.env.SECRET,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });
  if (!res.data || res.data.errcode) return null;
  return res.data.openid;
};

module.exports = {
  getOpenId,
};
