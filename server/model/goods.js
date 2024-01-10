const { Sequelize, DataTypes } = require('sequelize');
//1.导入数据库的配置对象
const mysql_Sequelize = require('../dao');

// 2.创建模型与数据库中的表实现映射
const Goods = mysql_Sequelize.define(
  'goods',
  {
    id: {
      type: DataTypes.INTEGER, //表示int类型
      autoIncrement: true, //表示id的值在表中是否自增
      primaryKey: true, // 设置为主键
      allowNull: false, //表示id对象的值不能为空
      fields: 'id', //实现模型的属性名和表的列名之间的映射关系(对应关系)
    },
    goods_name: {
      type: DataTypes.STRING,
      autoIncrement: false,
      allowNull: false,
      fields: 'goods_name',
    },
    cover_img: {
      type: DataTypes.STRING,
      autoIncrement: false,
      allowNull: false,
      fields: 'cover_img',
    },
    description: {
      type: DataTypes.TEXT,
      autoIncrement: false,
      allowNull: false,
      fields: 'description',
    },
    price: {
      type: DataTypes.DECIMAL,
      autoIncrement: false,
      allowNull: false,
      fields: 'price',
    },
  },
  {
    freezeTableName: true, //不使用Sequelize给模型自定义的表名(自定义表名的命名规则：模型名后加s)
  }
);

mysql_Sequelize.sync({ force: false });

// 导出模型
module.exports = Goods;
