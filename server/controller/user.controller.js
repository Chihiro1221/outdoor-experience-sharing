const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { getOpenId } = require('../utils/http');
const { validationRequestParams } = require('../middleware/validation.middleware');

/**
 * 创建用户
 */
router.post('/', (req, res) => {
  const { nickname, phone, password, avatar } = req.body;
  // 密码加密
  const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
  User.create({
    nickname,
    phone,
    password: bcrypt.hashSync(password, salt),
    avatar,
  })
    .then(result => {
      if (result) {
        result.password = undefined;
        res.send(result);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * 更新用户
 */
router.put('/:id', async (req, res) => {
  const { nickname, phone, avatar } = req.body;
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(400).send({ msg: '用户不存在' });
  }
  // 密码加密
  User.update(
    { nickname, phone, avatar },
    {
      where: { id: req.params.id },
    }
  )
    .then(result => {
      if (result) {
        res.send({ msg: 'ok' });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * 用户列表
 */
router.get('/', (req, res) => {
  User.findAll({})
    .then(result => {
      if (result) {
        res.send(result);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * 删除用户
 */
router.delete('/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(400).send({ msg: '用户不存在' });
  }
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(result => {
      if (result) {
        res.send({ msg: 'ok' });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * 用户登录
 */
router.post(
  '/login',
  [
    body('phone').isMobilePhone().notEmpty().withMessage('手机号不合法'),
    body('password').notEmpty().isLength({ min: 6, mx: 18 }).withMessage('密码不合法'),
  ],
  validationRequestParams,
  (req, res) => {
    const { phone, password } = req.body;
    // 检测是否注册过
    User.findOne({ where: { phone } })
      .then(user => {
        if (!user) {
          return res.status(400).json({ msg: '用户不存在' });
        }
        // 校验密码
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(400).json({ msg: '密码错误' });
          }
          if (isMatch) {
            // 密码正确，生成token并返回
            const token = jwt.sign({ phone, userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
            res.send({
              token,
            });
          } else {
            return res.status(400).json({ msg: '密码错误' });
          }
        });
      })
      .catch(e => {
        console.log(e);
        res.status(400).send({ msg: '用户不存在' });
      });
  }
);

/**
 * 用户注册
 */
router.post(
  '/register',
  body('phone').isMobilePhone().notEmpty().withMessage('手机号不合法'),
  body('password').notEmpty().isLength({ min: 6, mx: 18 }).withMessage('密码不合法'),
  async (req, res) => {
    const errors = validationResult(req);
    const { phone, password, code } = req.body;
    // 如果校验出现错误直接返回异常
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // 先查询用户
    const user = await User.findOne({ where: { phone } });
    if (user) {
      return res.status(400).send({ msg: '用户已存在' });
    }
    // 将用户注册信息存储到数据库中
    const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
    console.log('salt:', salt);
    const bcryptPassword = bcrypt.hashSync(password, salt);
    // 默认头像与随机用户名
    User.create({
      phone,
      password: bcryptPassword,
      nickname: Math.random().toString(36),
      avatar: 'https://heart-sky-take-out.oss-cn-beijing.aliyuncs.com/%E9%B1%BC%E8%81%AA%E6%98%8EAI%E7%BB%98%E7%94%BB%20%281%29.jpeg',
    }).then(result => {
      if (result) res.send({ msg: '注册成功' });
      else res.send({ msg: '注册失败' });
    });
  }
);

/**
 * 获取用户个人信息
 */
router.get('/profile', async (req, res, next) => {
  const user = await User.findOne({ where: { phone: req.auth.phone } });
  if (!user) {
    return res.status(400).send({ msg: '用户不存在' });
  }
  user.password = undefined;
  res.send(user);
});

/**
 * 根据id获取用户信息
 */
router.get('/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(400).send({ msg: '用户不存在' });
  }
  user.password = undefined;
  res.send(user);
});

module.exports = router;
