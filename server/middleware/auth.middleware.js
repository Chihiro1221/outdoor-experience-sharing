/**
 * 登录校验
 * @param {} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const auth = (req, res, next) => {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ msg: '用户未登录' });
  }

  if (authentication.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({ msg: '用户未登录' });
    }

    next();
  } else {
    return res.status(401).send({ msg: '用户未登录' });
  }
};

/**
 * 管理员校验
 * @param {*} req
 * @returns
 */
const authAdmin = async (req, res, next) => {
  // 如果不是管理员则无权限
  if (req.auth && req.auth.role !== 1) {
    return res.status(403).send({ msg: '无权限' });
  }
  next();
};

module.exports = {
  auth,
  authAdmin,
};
