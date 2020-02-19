// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth;
  router.get('/admin/index', adminauth, controller.admin.main.index); // 获取首页
  router.post('/admin/checkLogin', controller.admin.main.checkLogin); // 获取登录
};
// 中台连接后台
