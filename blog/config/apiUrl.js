// 编写统一中台API配置文件
const ipUrl = 'http://127.0.0.1:7001/default/';
const servicePath = {
    getArticleList: ipUrl  + 'getArticleList',   // 首页接口
    getArticleById: ipUrl + 'getArticleById/',  // 详情页接口
    getTypeInfo: ipUrl + 'getTypeInfo',        //   得到分类信息
    getListById: ipUrl + 'getListById/',      // 根据列类别ID获取 文章列表
}

export default servicePath;