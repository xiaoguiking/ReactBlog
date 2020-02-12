'use strict';
//  外部插件 组件需要配置在这个里面
/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

//  开启解决跨域问题插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
