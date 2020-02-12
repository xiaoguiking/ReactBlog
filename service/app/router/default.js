// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  // 根据id 传值配置的路由
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);

};
