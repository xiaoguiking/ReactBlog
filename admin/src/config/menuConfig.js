const menuList = [
    {
        title: '首页',// 菜单名称
        key: '/index',  // 对应path
        icon: 'home' ,   // 对应图标
    },
    {
        title: '用户管理',
        key: '/index/user',
        icon: 'user',
    },    {
        title: '添加文章',
        key: '/index/add',
        icon: 'user',
    },
    {
        title: '文章管理',
        key: '/file',
        icon: 'file',
        children: [
            {
                title: '添加文章',
                key: '/index/add/:id',
                icon: '',
            },
            {
                title: '文章列表',
                key: '/index/list',
                icon: '',
            },
        ]
    },
    {
        title: '图表echarts',
        key: '/charts',
        icon: 'home',
        children: [// 子菜单列表
            {
                title: '折线图',
                key: '/index/charts/line',
                icon: 'line-chart',
            },
            {
                title: '饼图',
                key: '/index/charts/pie',
                icon: 'pie-chart',
            },
            {
                title: '条形图',
                key: '/index/charts/bar',
                icon: 'pie-chart',
            },
        ]
    },
]

export default menuList;