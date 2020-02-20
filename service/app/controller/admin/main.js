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
	  const result = this.app.mysql.insert('article', tmpArticle);
	  const insertId = result.insertId;
	  const insertSuccess = result.affectedRows === 1;
	  
	  this.ctx.body = {
		  isSuccess: insertSuccess,
		  insertId: insertId
	  }
  }
}

module.exports = MainController;
