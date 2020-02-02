'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    //  获取用户表的数据blog_content
    const result = await this.app.mysql.get('blog_content', {});
    console.log(result);
    this.ctx.body = result;
  }
}

module.exports = HomeController;
