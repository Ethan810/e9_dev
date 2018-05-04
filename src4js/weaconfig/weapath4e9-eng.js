exports.default = {
  // 主入口
  bs_main: {
    entry: '/src4js/pc4backstage/amain/index.js',
    output: '/spa/main/engine.js',
  },
  // 主题
  bs_theme: {
    entry: '/src4js/pc4backstage/portal4enginetheme/index.js',
    output: '/wui/theme/ecology9/js/engine.js',
    styleUrl: '/wui/theme/ecology9/css/engine.css',
    outputlib: {
      library: 'weaPortalEngineTheme',
      libraryTarget: 'umd',
    },
  },
  // 门户
  bs_portal: {
    entry: '/src4js/pc4backstage/portal4engine/index.js',
    output: '/spa/portal/engine.js',
    styleUrl: '/spa/portal/engine.css',
    outputlib: {
      library: 'weaPortalEngine',
      libraryTarget: 'umd',
    },
  },
  // 流程
  bs_workflow: {
    entry: '/src4js/pc4backstage/workflow/index.js',
    output: '/spa/workflow/engine.js',
    styleUrl: '/spa/workflow/engine.css',
    outputlib: {
      library: 'weaWorkflowEngine',
      libraryTarget: 'umd',
    },
  },
  // 流程单入口
  bs_workflow_single: {
    entry: '/src4js/pc4backstage/workflow/single.js',
    output: '/spa/workflow/engine4single.js',
  },
  // 人力
  bs_hrm: {
    entry: '/src4js/pc4backstage/hrmengine/index.js',
    output: '/spa/hrm/engine.js',
    styleUrl: '/spa/hrm/engine.css',
    outputlib: {
      library: 'weaHrmEngine',
      libraryTarget: 'umd',
    },
  },
  // 人力单入口
  bs_hrm_single: {
    entry: '/src4js/pc4backstage/hrmengine/single.js',
    output: '/spa/hrm/engine4single.js',
  },
  // 移动建模
  bs_mobilemode: {
    entry: '/src4js/pc4backstage/mobilemode4engine/index.js',
    output: '/spa/mobilemode/engine.js',
    styleUrl: '/spa/mobilemode/engine.css',
    outputlib: {
      library: 'weaMobilemodeEngine',
      libraryTarget: 'umd',
    },
  },
   // 表单建模
   bs_cube: {
    entry: '/src4js/pc4backstage/cube/src/index.tsx',
    output: '/spa/cube/engine.js',
    styleUrl: '/spa/cube/engine.css',
    outputlib: {
      library: 'weaCubeEngine',
      libraryTarget: 'umd',
    },
  },
  // 资产
  bs_cpt: {
    entry: '/src4js/pc4backstage/cpt/index.js',
    output: '/spa/cpt/engine.js',
    styleUrl: '/spa/cpt/engine.css',
    outputlib: {
      library: 'weaCptEngine',
      libraryTarget: 'umd',
    },
  },
  // 资产单入口
  bs_cpt_single: {
    entry: '/src4js/pc4backstage/cpt/single.js',
    output: '/spa/cpt/engine4single.js',
  },
  // 客户
  bs_crm: {
    entry: '/src4js/pc4backstage/crm/index.js',
    output: '/spa/crm/engine.js',
    styleUrl: '/spa/crm/engine.css',
    outputlib: {
      library: 'weaCrmEngine',
      libraryTarget: 'umd',
    },
  },
  // 项目
  // bs_prj: {
  //   entry: '/src4js/pc4backstage/cpt/index.js',
  //   output: '/spa/cpt/engine.js',
  //   styleUrl: '/spa/cpt/engine.css',
  //   outputlib: {
  //     library: 'weaCptEngine',
  //     libraryTarget: 'umd',
  //   },
  // },
  // 小应用
  bs_smallApp: {
    entry: '/src4js/pc4backstage/smallApp/index.js',
    output: '/spa/backstage/smallApp/engine.js',
    styleUrl: '/spa/backstage/smallApp/engine.css',
    outputlib: {
      library: 'weaSmallAppEngine',
      libraryTarget: 'umd',
    },
  },
  // 小应用
  bs_smallApp_single: {
    entry: '/src4js/pc4backstage/smallApp/single.js',
    output: '/spa/backstage/smallApp/engine4single.js',
  },
};
