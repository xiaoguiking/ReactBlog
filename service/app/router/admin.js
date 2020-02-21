// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index); // 获取首页
  router.post('/admin/checkLogin', controller.admin.main.checkLogin); // 获取登录
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo) // 获取文章类别
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle) //  添加文章内容
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle) //  修改文章内容
};
// 中台连接后台
