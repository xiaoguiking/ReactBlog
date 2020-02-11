'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    //  获取用户表的数据blog_content
    // const result = await this.app.mysql.get('blog_content', {});
    // console.log(result); this.ctx.body = result;
    this.ctx.body = 'API';
  }
  
  //  获取文章列表
  async getArticleList() {

    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
	  // 原代码
      // 'article.addTime as addTime,' +
	  // 新代码修改 时间戳为日期格式
	  "From_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s')as addTime,"+
      'article.view_count as view_count ,' +
      '.type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id';

    const results = await this.app.mysql.query(sql);
    //  前台数据交互可能出现问题点
    this.ctx.body = { data: results };
  }
  
  // 获取指定的id详情页
  
  async getArticleById(){
	   //先配置路由的动态传值，然后再接收值
	  let id = this.ctx.params.id;
	  let sql = 'SELECT article.id as id,'+
	         'article.title as title,'+
	         'article.introduce as introduce,'+
			 // 文章内容
	         'article.article_content as article_content,'+
	         "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
	         'article.view_count as view_count ,'+
	         'type.typeName as typeName ,'+
			 // 文章id查询
	         'type.id as typeId '+
	         'FROM article LEFT JOIN type ON article.type_id = type.Id '+
	         'WHERE article.id='+id
	 
			const result = await this.app.mysql.query(sql);
			this.ctx.body = {data: result}  
	 
  }
  

}

module.exports = HomeController;

// async getArticleList() {
//   let sql = `${SELECT article.id as id},
//   ${article.title as title},
//   ${article.introduce as introduce},
//   ${article.addTime as addTime},
//   ${article.view_count as view_count},
//   ${article.typeName as typeName},
//   FROM article LEFT JOIN type ON article.type_id = typeName.Id
//   `;
//   // this.ctx.body = result;
// }
