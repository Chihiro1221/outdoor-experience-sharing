const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Goods = require('../model/goods');
const User = require('../model/user');
const { validationRequestParams } = require('../middleware/validation.middleware');

/**
 * 创建商品
 */
router.post(
  '/',
  [
    body('goods_name').notEmpty().isLength({ max: 50 }).withMessage('商品名称不合法'),
    body('cover_img').notEmpty().isURL().withMessage('封面不合法'),
    body('description').notEmpty().withMessage('描述必须存在'),
    body('price').notEmpty().isNumeric().withMessage('价格不合法'),
  ],
  validationRequestParams,
  async (req, res) => {
    const { goods_name, description, price, cover_img } = req.body;
    const goods = await Goods.create({
      goods_name,
      description,
      price,
      cover_img,
    });
    if (!goods) {
      return res.status(400).send({ msg: '创建商品失败' });
    }

    res.send(goods);
  }
);

/**
 * 商品列表
 */
router.get('/', async (req, res) => {
  const goodsList = await Goods.findAll({});
  if (!goodsList) {
    return res.status(400).send({ msg: '获取商品列表失败' });
  }

  res.send(goodsList);
});

/**
 * 根据id获取商品
 */
router.get('/:id', async (req, res) => {
  const goods = await Goods.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!goods) {
    return res.status(400).send({ msg: '获取商品失败' });
  }

  res.send(goods);
});

/**
 * 根据id更新商品
 */
router.put('/:id', async (req, res) => {
  // 执行更新操作
  const result = await Goods.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (result[0] !== 1) {
    return res.status(400).send({ msg: '更新商品失败' });
  }
  res.send({ msg: '更新成功' });
});

/**
 * 根据id删除商品
 */
router.delete('/:id', async (req, res) => {
  const result = await Goods.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (result !== 1) {
    return res.status(400).send({ msg: '删除商品失败' });
  }

  res.send({ msg: '删除成功' });
});
module.exports = router;
