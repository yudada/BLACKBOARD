const sideMenuData = [
  // 首页
  {
    entity: {
      id: 0,
      name: '#home',
      icon: 'icon-diannao1',
      alias: '校园大脑',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'index1',
          icon: 'icon-xuexiao2',
          alias: '全校数据',
        },
      },
      {
        entity: {
          id: 1,
          name: 'index2',
          icon: 'icon-jiangbei',
          alias: '一年级(案例)',
        },
      },
      // {
      //   entity: {
      //     id: 2,
      //     name: 'index3',
      //     icon: 'icon-jiangbei',
      //     alias: '二年级',
      //   },
      // },
      // {
      //   entity: {
      //     id: 3,
      //     name: 'index4',
      //     icon: 'icon-jiangbei',
      //     alias: '三年级',
      //   },
      // },
      {
        entity: {
          id: 4,
          name: 'index5',
          icon: 'icon-shetuanhuodong',
          alias: '兴趣社团(案例)',
        },
      },
    ],
  },
  // 智慧课本
  {
    entity: {
      id: 1,
      name: 'wisdomBook',
      icon: 'icon-kebiao',
      alias: '智慧课本',
    },
  },
  // 互动课堂
  {
    entity: {
      id: 2,
      name: 'classroom',
      icon: 'icon-ketang',
      alias: '互动课堂',
    },
  },
  // 超级作业
  {
    entity: {
      id: 3,
      name: '#Submenu2',
      icon: 'icon-zuoye',
      alias: '超级作业',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'publish',
          icon: 'icon-fabu',
          alias: '发布作业',
        },
      },
      {
        entity: {
          id: 1,
          name: 'prepareTask',
          icon: 'icon-xunke',
          alias: 'VR模型',
        },
      },
      {
        entity: {
          id: 2,
          name: 'readTask',
          icon: 'icon-yuedu',
          alias: '课本阅读',
        },
      },
      {
        entity: {
          id: 3,
          name: 'courseware',
          icon: 'icon-kaoqin',
          alias: '精选题库',
        },
      },
      {
        entity: {
          id: 4,
          name: 'exercitation',
          icon: 'icon-shixi-A',
          alias: '仿真实验',
        },
      },
      {
        entity: {
          id: 5,
          name: 'mistakes',
          icon: 'icon-cuoti',
          alias: '错题锦囊',
        },
      },
    ],
  },
  // 在线研学
  {
    entity: {
      id: 4,
      name: 'onlineStudies',
      icon: 'icon-yanjiuzhulu',
      alias: '在线研学',
    },
  },
  // 我的班级
  {
    entity: {
      id: 5,
      name: 'myclass',
      icon: 'icon-banji',
      alias: '我的班级',
    },
  },
  // 班级管理
  {
    entity: {
      id: 6,
      name: '#Uidesign',
      icon: 'icon-banjiguanli',
      alias: '班级管理',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'classroomList',
          icon: 'icon-cengji',
          alias: '班级列表',
        },
      },
      {
        entity: {
          id: 1,
          name: 'users-list',
          icon: 'icon-yonghuqunzu',
          alias: '班级学生列表',
        },
      },
      {
        entity: {
          id: 2,
          name: 'papers-list',
          icon: 'icon-wenjian',
          alias: '试卷列表',
        },
      },
      {
        entity: {
          id: 3,
          name: 'ware-list',
          icon: 'icon-PPT',
          alias: '课件列表',
        },
      },
      {
        entity: {
          id: 4,
          name: 'progress',
          icon: 'icon-tongji',
          alias: '作业统计',
        },
      },
      {
        entity: {
          id: 5,
          name: 'performance',
          icon: 'icon-baogao',
          alias: '成绩报告',
        },
      },
      {
        entity: {
          id: 6,
          name: 'faq',
          icon: 'icon-biji',
          alias: '阅读笔记',
        },
      },
    ],
  },
  // 学生管理
  {
    entity: {
      id: 7,
      name: '#pages',
      icon: 'icon-xueshengliebiao',
      alias: '学生管理',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'crypto-currencies',
          icon: 'icon-xueshengliebiao',
          alias: '学生列表',
        },
      },
      {
        entity: {
          id: 1,
          name: 'editprofile',
          icon: 'icon-tianjiajiahaoyoutianjiapengyou',
          alias: '添加新学生',
        },
      },
      {
        entity: {
          id: 2,
          name: 'blog',
          icon: 'icon-shenghuo',
          alias: '学生风彩',
        },
      },
    ],
  },
  // 学科工具
  {
    entity: {
      id: 8,
      name: 'drawing',
      icon: 'icon-boshimao',
      alias: '学科工具',
    },
  },
  // 题库资源
  {
    entity: {
      id: 9,
      name: '#Question',
      icon: 'icon-tiku',
      alias: '题库资源',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'establish',
          icon: 'icon-chuangjianv',
          alias: '创建题库',
        },
      },
      {
        entity: {
          id: 1,
          name: 'expand',
          icon: 'icon-qita',
          alias: '练习题',
        },
      },
      {
        entity: {
          id: 2,
          name: 'textbook',
          icon: 'icon-biaoqian',
          alias: '自检题',
        },
      },
      {
        entity: {
          id: 3,
          name: 'history',
          icon: 'icon-zhiban',
          alias: '历年考题',
        },
      },
    ],
  },
  // 系统设置
  {
    entity: {
      id: 10,
      name: '#Apps',
      icon: 'icon-xitong',
      alias: '系统设置',
    },
    childs: [
      {
        entity: {
          id: 0,
          name: 'information',
          icon: 'icon-gerenxinxi',
          alias: '学校资料',
        },
      },
      {
        entity: {
          id: 1,
          name: 'role',
          icon: 'icon-juese',
          alias: '角色管理',
        },
      },
      {
        entity: {
          id: 2,
          name: 'account',
          icon: 'icon-zizhanghaoguanli',
          alias: '账号管理',
        },
      },
      {
        entity: {
          id: 3,
          name: 'operationLog',
          icon: 'icon-caozuorizhi',
          alias: '操作日志',
        },
      },
    ],
  },
]

export default sideMenuData;