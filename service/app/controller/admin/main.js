'use strict';

const Controller = require('egg').Controller;
// 中台后台连接页面
class MainController extends Controller {
  // index测试
  async index() {
    this.ctx.body = 'Hi 测试成功';
  }


  // 登录
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "'AND password='" + password + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  // 获取文章类别
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  
  // 添加文章
  async addArticle () {
	  const tmpArticle = this.ctx.request.body;
	  // 将tmpArticle插入article表中
	  const result = await this.app.mysql.insert('article', tmpArticle);
	  const insertSuccess = result.affectedRows === 1; // 返回true/ false判断是否成功
	  const insertId = result.insertId;
	  
	  this.ctx.body = {
		  isSuccess: insertSuccess,
		  insertId: insertId
	  }
  }
 
  // 修改文章
  async updateArticle() {
	  const tmpArticle = this.ctx.request.body;
	  const result = await this.app.mysql.update('article', tmpArticle);
	  const updateSuccess = result.affectedRows === 1; // bool
	  console.log(updateSuccess, 'updateSuccess');
	 this.ctx.body = {
		 isSuccess: updateSuccess,
	 }
  }
  
  // 获取文章列表
  async getArticleList () {
	   const sql = 'SELECT article.id as id,'+
	                  'article.title as title,'+
	                  'article.introduce as introduce,'+
	                  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
	                  'type.typeName as typeName '+
	                  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
	                  'ORDER BY article.id DESC ';
	  const resList = await this.app.mysql.query(sql);
	  
	  this.ctx.body = {data: resList}
	  
  }
  
  // 删除文章
  async deleteArticle () {
	  const id = this.ctx.params.id;
	  const res = await this.app.mysql.delete('article', {'id': id});
	  this.ctx.body = {data: res}
  }
  
  //  修改文章
  async getArticleById() {
	  const id  = this.ctx.params.id;
	  const sql = 'SELECT article.id as id,'+
	                 'article.title as title,'+
	                 'article.introduce as introduce,'+
	                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
	                 'type.typeName as typeName '+
	                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
	                 'WHERE type_id' + id;
	const res = this.app.mysql.query(sql);
	this.ctx.body = {data: res}
  }
}

module.exports = MainController;
