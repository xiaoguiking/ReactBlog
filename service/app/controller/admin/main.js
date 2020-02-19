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
    const passWord = this.ctx.request.body.passWord;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "'AND passWord='" + passWord + "'";
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
}

module.exports = MainController;
