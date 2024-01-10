const express = require('express');
const mysql = require('./dao');
const app = express();
const userController = require('./controller/user.controller');
const TopicController = require('./controller/topic.controller');
const GoodsController = require('./controller/goods.controller');
const dotenv = require('dotenv');
const { expressjwt: jwt } = require('express-jwt');
const Topic = require('./model/topic');
const User = require('./model/user');
const { authAdmin } = require('./middleware/auth.middleware');
const { validationRequestParams } = require('./middleware/validation.middleware');
const { resolve } = require('path');

// 上传文件服务
const multer = require('multer');
// 配置存储位置以及文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, './uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});
const upload = multer({ storage });
// 配置跨域
const cors = require('cors');
app.use(cors());
// 支持解析json格式数据
app.use(express.json());
// 读取.env配置文件
dotenv.config();
// 配置静态资源
app.use(express.static(resolve(__dirname, './uploads')));

// 测试数据库连接
mysql
  .authenticate()
  .then(() => {
    console.log('mysql connected!');
  })
  .catch(error => {
    console.log(error);
  });

// token解析
app.use(
  jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: [
      /^\/user\/login/,
      /^\/user\/register/,
      { url: '/topic', methods: ['GET'] },
      { url: '/goods', methods: ['GET'] },
      { url: /\/topic\/(?!=1)(.*)/, methods: ['GET'] },
      { url: /\/goods\/(?!=1)(.*)/, methods: ['GET'] },
    ],
  })
);

/**
 * 服务器路由
 */
app.use('/user', userController);
app.use('/topic', TopicController);
app.use('/goods', authAdmin, GoodsController);
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('上传成功:', req.file, req.body);
  res.send({ url: `http://127.0.0.1:8000/${req.file.filename}` });
});

/**
 * 表关联配置
 */
Topic.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false,
  targetKey: 'id',
});

/**
 * 错误中间件
 */
app.use((err, req, res, next) => {
  // 因为 token 解析失败导致的错误
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      msg: '无效的 token',
    });
  }
  console.log(err);
  // 其他错误
  res.status(500).send({ msg: '未知的错误' });
});

app.listen(8000, () => {
  console.log('Node Server running at http://127.0.0.1:8000');
});
