const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Topic = require('../model/topic');
const User = require('../model/user');
const { validationRequestParams } = require('../middleware/validation.middleware');

/**
 * 帖子删除更新校验
 * @param {*} req
 * @returns
 */
const auth = async (req, res, next) => {
  // 先查询是否存在
  const topic = await Topic.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User }],
  });
  if (!topic) return res.status(400).send({ msg: '帖子不存在' });
  // 如果不是管理员也不是帖子作者则无法删除
  if (topic.user_id !== req.auth.userId && req.auth.role !== 1) {
    return res.status(403).send({ msg: '无权限' });
  }
  next();
};

/**
 * 创建帖子
 */
router.post(
  '/',
  [
    body('title').notEmpty().isLength({ max: 50 }).withMessage('用户名必须存在'),
    body('cover_img').notEmpty().isURL().withMessage('封面必须存在'),
    body('content').notEmpty().withMessage('内容必须存在'),
  ],
  validationRequestParams,
  (req, res) => {
    const user = req.auth;
    if (!user) return res.status(401).send({ msg: '用户未登录' });
    const { title, content, cover_img } = req.body;
    Topic.create({
      user_id: user.userId,
      title,
      content,
      cover_img,
    })
      .then(result => {
        if (result) {
          res.send(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

/**
 * 帖子列表
 */
router.get('/', (req, res) => {
  Topic.findAll({
    include: [{ model: User }],
  })
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
 * 根据id获取帖子
 */
router.get('/:id', (req, res) => {
  Topic.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: User }],
  })
    .then(result => {
      if (result) {
        res.send(result);
      }
    })
    .catch(() => {
      res.status(400).send({ msg: '帖子不存在' });
    });
});

/**
 * 根据id更新帖子
 */
router.put('/:id', auth, (req, res) => {
  // 执行更新操作
  Topic.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(result => {
      if (result) {
        res.send({ msg: '更新成功' });
      }
    })
    .catch(() => {
      res.status(400).send({ msg: '更新帖子失败' });
    });
});

/**
 * 根据id删除帖子
 */
router.delete('/:id', auth, (req, res) => {
  Topic.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(result => {
      if (result) {
        res.send({ msg: '删除成功' });
      }
    })
    .catch(() => {
      res.status(400).send({ msg: '删除帖子失败' });
    });
});
module.exports = router;
