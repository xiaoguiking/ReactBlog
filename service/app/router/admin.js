// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/index', controller.admin.main.index); // 获取首页
  router.post('/admin/checkLogin', controller.admin.main.checkLogin); // 获取登录
};
// 中台连接后台
