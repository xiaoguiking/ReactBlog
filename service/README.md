# service



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### 01中台搭建 egg.js

介绍Egg.js(底层是koa2搭建)
Github地址：https://github.com/eggjs/egg
- 根文件夹（ReactBlog）建立一个service 的中台文件夹
- 全局安装egg.js脚手架工具egg-init;
`
npm i egg-init-g
`
- 脚手架自动生成项目的基本结构
`
egg-init --type=simple
`
- 安装相关的依赖包
`
npm install
`
- 安装完成启动服务查看结果
`
npm run dev 或者yarn dev
open http://localhost:7001
`