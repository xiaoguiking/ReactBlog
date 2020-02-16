// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/index', controller.default.home.index); // 获取首页
};
// 中台连接后台
