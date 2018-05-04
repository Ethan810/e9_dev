exports.default = {
  // 入口
  main: {
    entry: '/src4js/pc4mobx/amain/index.js',
    output: '/spa/main/index-mobx.js',
  },
  // 主题
  theme: {
    entry: '/src4js/pc/portal4theme/index.js',
    output: '/wui/theme/ecology9/js/index.js',
    styleUrl: '/wui/theme/ecology9/css/index.css',
    outputlib: {
      library: 'weaPortalTheme',
      libraryTarget: 'umd',
    },
  },
  // 门户
  portal: {
    entry: '/src4js/pc/portal/index.js',
    output: '/spa/portal/index.js',
    styleUrl: '/spa/portal/index.css',
    outputlib: {
      library: 'weaPortal',
      libraryTarget: 'umd',
    },
  },
  // 流程
  workflow: {
    entry: '/src4js/pc4mobx/workflow/index.js',
    output: '/spa/workflow/index_mobx.js',
    styleUrl: '/spa/workflow/index_mobx.css',
    outputlib: {
      library: 'weaWorkflow',
      libraryTarget: 'umd',
    },
  },
  // 流程单页
  workflow_single: {
    entry: '/src4js/pc4mobx/workflow/single.js',
    output: '/spa/workflow/index4single_mobx.js',
  },
  // 流程表单(PC及移动端)
  workflowForm: {
    entry: '/src4js/pc4mobx/workflowForm/index.js',
    output: '/spa/workflow/index_form.js',
    styleUrl: '/spa/workflow/index_form.css',
    outputlib: {
      library: 'weaWorkflowForm',
      libraryTarget: 'umd',
    },
  },
  // 流程表单单页
  workflowForm_single: {
    entry: '/src4js/pc4mobx/workflowForm/single.js',
    output: '/spa/workflow/index4single_form.js',
  },
  // 流程 redux （即将废弃）
  workflow_redux: {
    entry: '/src4js/pc/workflow/index.js',
    output: '/spa/workflow/index.js',
    styleUrl: '/spa/workflow/index.css',
    outputlib: {
      library: 'weaWorkflow',
      libraryTarget: 'umd',
    },
  },
  // 流程 redux 单页入口（即将废弃）
  workflow_redux_single: {
    entry: '/src4js/pc/workflow/single.js',
    output: '/spa/workflow/index4single.js',
  },
  // 邮件
  email: {
    entry: '/src4js/pc4mobx/email/index.js',
    output: '/spa/email/index_mobx.js',
    styleUrl: '/spa/email/index_mobx.css',
    outputlib: {
      library: 'weaEmail',
      libraryTarget: 'umd',
    },
  },
  // 邮件单页入口
  email_single: {
    entry: '/src4js/pc4mobx/email/single.js',
    output: '/spa/email/index4single_mobx.js',
  },
  // 微搜
  esearch: {
    entry: '/src4js/pc4mobx/esearch/index.js',
    output: '/spa/esearch/index_mobx.js',
    styleUrl: '/spa/esearch/index_mobx.css',
    outputlib: {
      library: 'weaESearch',
      libraryTarget: 'umd',
    },
  },
  // 微搜单页入口
  esearch_single: {
    entry: '/src4js/pc4mobx/esearch/single.js',
    output: '/spa/esearch/index4single_mobx.js',
  },
  // 公文
  odoc: {
    entry: '/src4js/pc4mobx/odoc/index.js',
    output: '/spa/odoc/index_mobx.js',
    styleUrl: '/spa/odoc/index_mobx.css',
    outputlib: {
      library: 'weaOdoc',
      libraryTarget: 'umd',
    },
  },
  // 公文单页入口
  odoc_single: {
    entry: '/src4js/pc4mobx/odoc/single.js',
    output: '/spa/odoc/index4single_mobx.js',
  },
  // 小模块
  smallApp: {
    entry: '/src4js/pc4mobx/smallApp/index.js',
    output: '/spa/smallApp/index_mobx.js',
    styleUrl: '/spa/smallApp/index_mobx.css',
    outputlib: {
      library: 'weaSmallApp',
      libraryTarget: 'umd',
    },
  },
  // 小模块 单页入口
  smallApp_single: {
    entry: '/src4js/pc4mobx/smallApp/single.js',
    output: '/spa/smallApp/index4single_mobx.js',
  },
  // 文档
  document: {
    entry: '/src4js/pc4mobx/document/index.js',
    output: '/spa/document/index_mobx.js',
    styleUrl: '/spa/document/index_mobx.css',
    outputlib: {
      library: 'weaDoc',
      libraryTarget: 'umd',
    },
  },
  // 文档单页入口
  document_single: {
    entry: '/src4js/pc4mobx/document/single.js',
    output: '/spa/document/index4single_mobx.js',
  },
  // 文档 redux
  document_redux: {
    entry: '/src4js/pc/document/index.js',
    output: '/spa/document/index.js',
    styleUrl: '/spa/document/index.css',
    outputlib: {
      library: 'weaDoc',
      libraryTarget: 'umd',
    },
  },
  // 文档 redux 单页入口（即将废弃）
  document_redux_single: {
    entry: '/src4js/pc/document/single.js',
    output: '/spa/document/index4single.js',
  },
 
  //财务流程
	'fnaSpecial':{
        entry: '/src4js/pc/fna/public/index.js',
        output: '/spa/fna/fnaSpecial/index.js',
        outputlib: {
            library: 'weaFnaSpecial',
            libraryTarget: 'umd'
        },
	},
	//财务
	'fna_mobx': {
      entry:  '/index.js',
      output: '/spa/fna/index_mobx.js',
      styleUrl: '/spa/fna/index_mobx.css',
	  outputlib: {
		  library: 'weaFna',
		  libraryTarget: 'umd'      
	  }
    },
    'fna4single_mobx': {
      entry: '/single.js',
      output:  '/spa/fna/index4single_mobx.js',
    },
	'fnaback_mobx': {
      entry: '/index.js',
      output: '/spa/fna/fnaback/index_mobx.js',
      styleUrl: '/spa/fna/fnaback/index_mobx.css',
	  outputlib: {
	  library: 'weaFnaEngine',
	  libraryTarget: 'umd'      
	  }
    },
	'fnaback4single_mobx': {
	      entry: '/single.js',
	      output:  '/spa/fna/fnaback/index4single_mobx.js',    
	},		  
  // 人力
  hrm: {
    entry: '/src4js/pc4mobx/hrm/index.js',
    output: '/spa/hrm/index_mobx.js',
    styleUrl: '/spa/hrm/index_mobx.css',
    outputlib: {
      library: 'weaHrm',
      libraryTarget: 'umd',
    },
  },
  // 人力单页入口
  hrm_single: {
    entry: '/src4js/pc4mobx/hrm/single.js',
    output: '/spa/hrm/index4single_mobx.js',
  },
  // 集成
  inte: {
    entry: '/src4js/pc4mobx/inte/index.js',
    output: '/spa/inte/index_mobx.js',
    styleUrl: '/spa/inte/index_mobx.css',
    outputlib: {
      library: 'weaInte',
      libraryTarget: 'umd',
    },
  },
  // 集成单页入口
  inte_single: {
    entry: '/src4js/pc4mobx/inte/single.js',
    output: '/spa/inte/index4single_mobx.js',
  },
  // 日程
  workplan: {
    entry: '/src4js/pc4mobx/workplan/index.js',
    output: '/spa/workplan/index_mobx.js',
    styleUrl: '/spa/workplan/index_mobx.css',
    outputlib: {
      library: 'weaWorkplan',
      libraryTarget: 'umd',
    },
  },
  workplan_single: {
    entry: '/src4js/pc4mobx/workplan/single.js',
    output: '/spa/workplan/index4single_mobx.js',
  },
  // 相册
  album_redux: {
    entry: '/src4js/pc/album/index.js',
    output: '/spa/album/index.js',
    styleUrl: '/spa/album/index.css',
    outputlib: {
      library: 'weaAlbum',
      libraryTarget: 'umd',
    },
  },
  // 协作
  cowork: {
    entry: '/src4js/pc4mobx/cowork/index.js',
    output: '/spa/cowork/index_mobx.js',
    styleUrl: '/spa/cowork/index_mobx.css',
    outputlib: {
      library: 'weaCowork',
      libraryTarget: 'umd',
    },
  },
  // 协作单页入口
  cowork_single: {
    entry: '/src4js/pc4mobx/cowork/single.js',
    output: '/spa/cowork/index4single_mobx.js',
  },
  // 会议
  meeting: {
    entry: '/src4js/pc4mobx/meeting/index.js',
    output: '/spa/meeting/mobx/index_mobx.js',
    styleUrl: '/spa/meeting/mobx/index_mobx.css',
    outputlib: {
      library: 'weaMeeting',
      libraryTarget: 'umd',
    },
  },
  // 会议单页入口
  meeting_single: {
    entry: '/src4js/pc4mobx/meeting/single.js',
    output: '/spa/meeting/mobx/index4single_mobx.js',
  },
  // 微博
  blog: {
    entry: '/src4js/pc4mobx/blog/index.js',
    output: '/spa/blog/mobx/index_mobx.js',
    styleUrl: '/spa/blog/mobx/index_mobx.css',
    outputlib: {
      library: 'weaBlog',
      libraryTarget: 'umd',
    },
  },
  // 微博单页入口
  blog_single: {
    entry: '/src4js/pc4mobx/blog/single.js',
    output: '/spa/blog/mobx/index4single_mobx.js',
  },
  // 项目
  prj: {
    entry: '/src4js/pc4mobx/prj/index.js',
    output: '/spa/prj/index_mobx.js',
    styleUrl: '/spa/prj/index_mobx.css',
    outputlib: {
      library: 'weaPrj',
      libraryTarget: 'umd',
    },
  },
  // 项目单页入口
  prj_single: {
    entry: '/src4js/pc4mobx/prj/single.js',
    output: '/spa/prj/index4single_mobx.js',
  },
  // 资产
  cpt: {
    entry: '/src4js/pc4mobx/cpt/index.js',
    output: '/spa/cpt/index_mobx.js',
    styleUrl: '/spa/cpt/index_mobx.css',
    outputlib: {
      library: 'weaCpt',
      libraryTarget: 'umd',
    },
  },
  // 资产单页入口
  cpt_single: {
    entry: '/src4js/pc4mobx/cpt/single.js',
    output: '/spa/cpt/index4single_mobx.js',
  },
  // 客户
  crm: {
    entry: '/src4js/pc4mobx/crm/index.js',
    output: '/spa/crm/index_mobx.js',
    styleUrl: '/spa/crm/index_mobx.css',
    outputlib: {
      library: 'weaCrm',
      libraryTarget: 'umd',
    },
  },
  // 客户单页入口
  crm_single: {
    entry: '/src4js/pc4mobx/crm/single.js',
    output: '/spa/crm/index4single_mobx.js',
  },
    // 车辆
    car: {
      entry: '/src4js/pc4mobx/car/src/index.js',
      output: '/spa/car/index_mobx.js',
      styleUrl: '/spa/car/index_mobx.css',
      outputlib: {
        library: 'weaCar',
        libraryTarget: 'umd',
      },
    },
  demo: {
    entry: '/src4js/demo/index.js',
    output: '/spa/demo/index_mobx.js',
    styleUrl: '/spa/demo/index_mobx.css',
    outputlib: {
      library: 'weaDemo',
      libraryTarget: 'umd',
    },
  },

};
