/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580122462340_8151';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //  把exports 修改成config
  config.mysql = {
    // database configuration
    client: {
      // host   需要修改成localhost
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database  填写数据库对应的名字
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  /**
   * @安全机制  跨域配置
   */
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    // origin: '*',
    // 允许访问的类型全部需要大写
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, UPDATE',
    origin: 'http://localhost:3000', //  只允许这个域进行访问接口
    credentials: true, // 开启认证允许cookie可以跨域
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };


  return {
    ...config,
    ...userConfig,
  };
};
