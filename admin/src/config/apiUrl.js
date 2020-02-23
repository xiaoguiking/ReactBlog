const ipUrl = 'http://127.0.0.1:7001/admin/';

const servicePath = {
    checkLogin: ipUrl + 'checkLogin',  // 检查用户登录
	getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别
	addArticle: ipUrl + 'addArticle', // 添加文章
	updateArticle: ipUrl + 'updateArticle', // 更新修改文章
	getArticleList: ipUrl + 'getArticleList', // 获取文章列表
	deleteArticle: ipUrl + 'deleteArticle/',  // 删除文章
}

export default servicePath;