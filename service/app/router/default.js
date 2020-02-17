// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index); // 获取首页
  router.get('/default/getArticleList', controller.default.home.getArticleList); // 获取文章列表
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById); // 根据id 传值配置的路由
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo); // 文章列表信息
  router.get('/default/getListById/:id', controller.default.home.getListById); // 根据列类别ID获取 文章列表
};
// 前台连接中台
