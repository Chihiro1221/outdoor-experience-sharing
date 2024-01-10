//1.导入Sequelize模块
const Sequelize = require('sequelize');
//2.使用Sequelize模块配置和数据库的连接信息
const mysql_Sequelize = new Sequelize('outdoor_experience_sharing', 'root', 'youzhi..', {
  host: 'localhost', //数据库服务器的IP地址或域名
  port: '3306', //数据库使用的端口号，MySQL数据库默认端口号3306
  dialect: 'mysql', //数据库的类型
  pool: {
    //数据库连接池：可以放若干个数据库的连接对象，提高数据库访问效率
    max: 20, //数据库连接池中连接对象的最大个数
    min: 3, //数据库连接池中连接对象的最少个数
  },
  define: {
    charset: 'utf8', //处理MySQL中中文字符的问题
  },
});
// 3.导出数据库的连接对象
module.exports = mysql_Sequelize;
