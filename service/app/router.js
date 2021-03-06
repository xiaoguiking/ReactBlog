'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/list', controller.home.list);
  //   引入 http://127.0.0.1:7001/default/index(效果)
  require('./router/default')(app); // 前台和中台路由
  require('./router/admin')(app); // 中台和后台路由
};
