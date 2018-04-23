import { observable, action, autorun,toJS } from 'mobx';
import {WeaTools} from "ecCom"
import objectAssign from 'object-assign';
import {message} from 'antd';
import isEqual from 'lodash/isEqual';
import {WeaTableNew,WeaForm} from 'comsMobx'
const {TableStore} = WeaTableNew;
const {ls} = WeaTools;
import * as  Apis from '../../apis/task';

class TaskCardStore {
    tabDatas = [
        { key: 'taskinfo',title: '任务信息'},
        {key: 'tasksub', title: '子任务'},
        {key: 'exchange', title: '相关交流'},
        {key: 'taskshare', title: '共享设置'},
        {key: 'req', title: '相关流程'},
        {key: 'doc', title: '相关文档'},
        {key: 'crm', title: '相关客户'},
        {key: 'cpt', title: '相关资产'}
    ];
    @observable selectTabKey = "taskinfo"
	@observable form = new WeaForm();
    fieldInfo=[
		{
			"title": "基本信息",
			"items": [
				{
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 1,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 3,
					"length": 80,
					"value": "代码开发",
					"conditionType": "INPUT",
					"domkey": [
						"subject"
					],
					"fieldcol": 14,
					"label": "任务名称"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"value": "179",
					"conditionType": "BROWSER",
					"domkey": [
						"hrmid"
					],
					"browserType": "17",
					"fieldcol": 14,
					"label": "负责人",
					"browserConditionParam": {
						"isAutoComplete": 1,
						"isDetail": 0,
						"title": "负责人",
						"linkUrl": "/hrm/resource/HrmResource.jsp?id=",
						"isMultCheckbox": false,
						"hasAdd": false,
						"viewAttr": 3,
						"dataParams": {},
						"hasAdvanceSerach": true,
						"isSingle": false,
						"replaceDatas": [
							{
								"id": "179",
								"name": "杨光-t"
							}
						],
						"type": "17"
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"value": "4",
					"conditionType": "BROWSER",
					"domkey": [
						"prjid"
					],
					"browserType": "8",
					"fieldcol": 14,
					"label": "所属项目",
					"browserConditionParam": {
						"isAutoComplete": 1,
						"isDetail": 0,
						"title": "所属项目",
						"linkUrl": "/proj/data/ViewProject.jsp?isrequest=1&ProjID=",
						"isMultCheckbox": false,
						"hasAdd": false,
						"viewAttr": 2,
						"dataParams": {},
						"hasAdvanceSerach": true,
						"isSingle": true,
						"replaceDatas": [
							{
								"id": "4",
								"name": "滴滴打车开发1"
							}
						],
						"type": "8"
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"formatPattern": 2,
					"viewAttr": 2,
					"value": ["2016-08-04",""],
					"conditionType": "DATE_TIME",
					"domkey": [
						"begindate",
						"begintime"
					],
					"fieldcol": 14,
					"label": "开始时间",
					"otherParams":{
						"noInput":true
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"formatPattern": 2,
					"viewAttr": 2,
					"value": "2016-08-11",
					"conditionType": "DATEPICKER",
					"domkey": [
						"enddate"
					],
					"fieldcol": 14,
					"label": "结束时间"
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 2,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 20,
					"value": "6.00",
					"conditionType": "INPUT",
					"domkey": [
						"workday"
					],
					"fieldcol": 14,
					"label": "工期"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"formatPattern": 2,
					"viewAttr": 2,
					"value": "",
					"conditionType": "DATEPICKER",
					"domkey": [
						"actualbegindate"
					],
					"fieldcol": 14,
					"label": "实际开始时间"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"formatPattern": 2,
					"viewAttr": 2,
					"value": "",
					"conditionType": "DATEPICKER",
					"domkey": [
						"actualenddate"
					],
					"fieldcol": 14,
					"label": "实际结束时间"
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 2,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 20,
					"value": "0.00",
					"conditionType": "INPUT",
					"domkey": [
						"realmandays"
					],
					"fieldcol": 14,
					"label": "实际工期"
				}, {
					"otherParams": {
						"qfws": 2,
						"style": {},
						"inputType": "form",
						"detailtype": 3,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 20,
					"value": "0.00",
					"conditionType": "INPUT",
					"domkey": [
						"fixedcost"
					],
					"fieldcol": 14,
					"label": "项目预算"
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 2,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 20,
					"value": "100",
					"conditionType": "INPUT",
					"domkey": [
						"finish"
					],
					"fieldcol": 14,
					"label": "进度"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"conditionType": "CHECKBOX",
					"domkey": [
						"islandmark"
					],
					"value": "0",
					"fieldcol": 14,
					"label": "里程碑任务"
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 1,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 40,
					"value": "0",
					"conditionType": "INPUT",
					"domkey": [
						"prefinish"
					],
					"fieldcol": 14,
					"label": "前置任务"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"conditionType": "ATTACHEMENT",
					"domkey": [
						"accessory"
					],
					"value": "",
					"fieldcol": 14,
					"label": "相关附件"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 0,
					"value": "",
					"conditionType": "TEXTAREA",
					"domkey": [
						"content"
					],
					"fieldcol": 14,
					"label": "任务说明"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 3,
					"conditionType": "SELECT",
					"domkey": [
						"a4"
					],
					"value": "",
					"fieldcol": 14,
					"label": "选择框内容",
					"options": [
						{
							"key": "",
							"selected": true,
							"showname": ""
						}
					]
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 1,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 50,
					"value": "",
					"conditionType": "INPUT",
					"domkey": [
						"dhwenben"
					],
					"fieldcol": 14,
					"label": "单行文本"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 0,
					"value": "",
					"conditionType": "TEXTAREA",
					"domkey": [
						"dhwenb"
					],
					"fieldcol": 14,
					"label": "多行文本"
				}, {
					"otherParams": {
						"qfws": 0,
						"style": {},
						"inputType": "form",
						"detailtype": 2,
						"format": {}
					},
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"length": 20,
					"value": "",
					"conditionType": "INPUT",
					"domkey": [
						"zhengshu"
					],
					"fieldcol": 14,
					"label": "整数"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"value": "",
					"conditionType": "BROWSER",
					"domkey": [
						"zdydx1w"
					],
					"browserType": "161",
					"fieldcol": 14,
					"label": "自定义单选",
					"browserConditionParam": {
						"isAutoComplete": 1,
						"isMultCheckbox": false,
						"linkUrl": "",
						"dataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"viewAttr": 2,
						"isSingle": true,
						"type": "161",
						"isDetail": 0,
						"title": "自定义单选",
						"completeParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"hasAdd": false,
						"hasAdvanceSerach": true,
						"conditionDataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						}
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"value": "",
					"conditionType": "BROWSER",
					"domkey": [
						"duoxuantest2"
					],
					"browserType": "162",
					"fieldcol": 14,
					"label": "多选测试1",
					"browserConditionParam": {
						"isAutoComplete": 1,
						"isMultCheckbox": false,
						"linkUrl": "",
						"dataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"viewAttr": 2,
						"isSingle": false,
						"type": "162",
						"isDetail": 0,
						"title": "多选测试1",
						"completeParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"hasAdd": false,
						"hasAdvanceSerach": true,
						"conditionDataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						}
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"value": "",
					"conditionType": "BROWSER",
					"domkey": [
						"zdy0524"
					],
					"browserType": "161",
					"fieldcol": 14,
					"label": "0524任务单选",
					"browserConditionParam": {
						"isAutoComplete": 1,
						"isMultCheckbox": false,
						"linkUrl": "",
						"dataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"viewAttr": 2,
						"isSingle": true,
						"type": "161",
						"isDetail": 0,
						"title": "0524任务单选",
						"completeParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						},
						"hasAdd": false,
						"hasAdvanceSerach": true,
						"conditionDataParams": {
							"selectedids": "",
							"mouldID": "crm",
							"type": "|"
						}
					}
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"viewAttr": 2,
					"conditionType": "CHECKBOX",
					"domkey": [
						"check1"
					],
					"value": "",
					"fieldcol": 14,
					"label": "check框"
				}, {
					"labelcol": 5,
					"colSpan": 2,
					"formatPattern": 1,
					"viewAttr": 2,
					"value": "",
					"conditionType": "TIMEPICKER",
					"domkey": [
						"shijian"
					],
					"fieldcol": 14,
					"label": "shijian"
				}
			],
			"defaultshow": true
		}
	];

    @observable loading = false;
    @observable taskid ="";
    taskname="";

    @observable showSearchAd = false  // 高级搜索显示
    @observable taskSubStore = new TableStore();
    @observable tasksubform  = new WeaForm();
    @observable rightMenu = [];
    @observable condition = [];

	@observable taskShareStore =  new TableStore();
	@observable isShowTaskShare = false;
	shareCondition = [
		{
			"colSpan": 2,
			"conditionType": "SELECT",
			"domkey": [
				"sharetype"
			],
			"fieldcol": 18,
			"isQuickSearch": false,
			"label": "对象类型",
			"labelcol": 6,
			"options": [
				{
					"key": "1",
					"selected": true,
					"showname": "人力资源"
				}, {
					"key": "5",
					"selected": false,
					"showname": "分部"
				}, {
					"key": "2",
					"selected": false,
					"showname": "部门"
				}, {
					"key": "11",
					"selected": false,
					"showname": "岗位"
				}, {
					"key": "3",
					"selected": false,
					"showname": "角色"
				}, {
					"key": "4",
					"selected": false,
					"showname": "所有人"
				}
			],
			"viewAttr": 2
		}, {
			"2": [[
					{
						"browserConditionParam": {
							"completeParams": {},
							"conditionDataParams": {},
							"dataParams": {},
							"destDataParams": {},
							"hasAddBtn": false,
							"hasAdvanceSerach": true,
							"idSeparator": ",",
							"isAutoComplete": 1,
							"isDetail": 0,
							"isMultCheckbox": false,
							"isSingle": false,
							"pageSize": 10,
							"quickSearchName": "",
							"type": "57",
							"viewAttr": 3
						},
						"colSpan": 2,
						"conditionType": "BROWSER",
						"domkey": [
							"deptid"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "对象",
						"labelcol": 6,
						"viewAttr": 3
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "INPUT_INTERVAL",
						"domkey": [
							"seclevel",
							"seclevelMax"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "安全级别",
						"labelcol": 6,
						"value": [
							10,
							100
						],
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			],
			"5": [[
					{
						"browserConditionParam": {
							"completeParams": {},
							"conditionDataParams": {},
							"dataParams": {},
							"destDataParams": {},
							"hasAddBtn": false,
							"hasAdvanceSerach": true,
							"idSeparator": ",",
							"isAutoComplete": 1,
							"isDetail": 0,
							"isMultCheckbox": false,
							"isSingle": false,
							"pageSize": 10,
							"quickSearchName": "",
							"type": "194",
							"viewAttr": 3
						},
						"colSpan": 2,
						"conditionType": "BROWSER",
						"domkey": [
							"subcomid"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "对象",
						"labelcol": 6,
						"value": 3,
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "INPUT_INTERVAL",
						"domkey": [
							"seclevel",
							"seclevelMax"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "安全级别",
						"labelcol": 6,
						"value": [
							10,
							100
						],
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			],
			"1": [[
					{
						"browserConditionParam": {
							"completeParams": {},
							"conditionDataParams": {},
							"dataParams": {},
							"destDataParams": {},
							"hasAddBtn": false,
							"hasAdvanceSerach": true,
							"idSeparator": ",",
							"isAutoComplete": 1,
							"isDetail": 0,
							"isMultCheckbox": false,
							"isSingle": false,
							"pageSize": 10,
							"quickSearchName": "",
							"type": "17",
							"viewAttr": 3
						},
						"colSpan": 2,
						"conditionType": "BROWSER",
						"domkey": [
							"resourceid"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "对象",
						"labelcol": 6,
						"viewAttr": 3
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			],
			"11": [[
					{
						"browserConditionParam": {
							"completeParams": {},
							"conditionDataParams": {},
							"dataParams": {},
							"destDataParams": {},
							"hasAddBtn": false,
							"hasAdvanceSerach": true,
							"idSeparator": ",",
							"isAutoComplete": 1,
							"isDetail": 0,
							"isMultCheckbox": false,
							"isSingle": false,
							"pageSize": 10,
							"quickSearchName": "",
							"type": "278",
							"viewAttr": 3
						},
						"colSpan": 2,
						"conditionType": "BROWSER",
						"domkey": [
							"jobtitleid"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "对象",
						"labelcol": 6,
						"viewAttr": 3
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT_LINKAGE",
						"domkey": [
							"joblevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "岗位级别",
						"labelcol": 6,
						"options": [
							{
								"key": "0",
								"selected": true,
								"showname": "总部"
							}, {
								"key": "2",
								"selected": false,
								"showname": "指定分部"
							}, {
								"key": "1",
								"selected": false,
								"showname": "指定部门"
							}
						],
						"selectLinkageDatas": {
							"1": {
								"browserConditionParam": {
									"completeParams": {},
									"conditionDataParams": {},
									"dataParams": {},
									"destDataParams": {},
									"hasAddBtn": false,
									"hasAdvanceSerach": true,
									"idSeparator": ",",
									"isAutoComplete": 1,
									"isDetail": 0,
									"isMultCheckbox": false,
									"isSingle": false,
									"pageSize": 10,
									"quickSearchName": "",
									"type": "57",
									"viewAttr": 3
								},
								"colSpan": 2,
								"conditionType": "BROWSER",
								"domkey": [
									"scopedeptid"
								],
								"fieldcol": 18,
								"isQuickSearch": false,
								"label": "",
								"labelcol": 6,
								"viewAttr": 3
							},
							"2": {
								"browserConditionParam": {
									"completeParams": {},
									"conditionDataParams": {},
									"dataParams": {},
									"destDataParams": {},
									"hasAddBtn": false,
									"hasAdvanceSerach": true,
									"idSeparator": ",",
									"isAutoComplete": 1,
									"isDetail": 0,
									"isMultCheckbox": false,
									"isSingle": false,
									"pageSize": 10,
									"quickSearchName": "",
									"type": "194",
									"viewAttr": 3
								},
								"colSpan": 2,
								"conditionType": "BROWSER",
								"domkey": [
									"scopesubcomid"
								],
								"fieldcol": 18,
								"isQuickSearch": false,
								"label": "",
								"labelcol": 6,
								"viewAttr": 3
							}
						},
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			],
			"4": [[
					{
						"colSpan": 2,
						"conditionType": "INPUT_INTERVAL",
						"domkey": [
							"seclevel",
							"seclevelMax"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "安全级别",
						"labelcol": 6,
						"value": [
							10,
							100
						],
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			],
			"3": [[
					{
						"browserConditionParam": {
							"completeParams": {},
							"conditionDataParams": {},
							"dataParams": {},
							"destDataParams": {},
							"hasAddBtn": false,
							"hasAdvanceSerach": true,
							"idSeparator": ",",
							"isAutoComplete": 1,
							"isDetail": 0,
							"isMultCheckbox": false,
							"isSingle": false,
							"pageSize": 10,
							"quickSearchName": "",
							"type": "65",
							"viewAttr": 3
						},
						"colSpan": 2,
						"conditionType": "BROWSER",
						"domkey": [
							"roleid"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "对象",
						"labelcol": 6,
						"viewAttr": 3
					}, {
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"rolelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "级别",
						"labelcol": 6,
						"options": [
							{
								"key": "0",
								"selected": true,
								"showname": "总部"
							}, {
								"key": "1",
								"selected": false,
								"showname": "分部"
							}, {
								"key": "2",
								"selected": false,
								"showname": "总部"
							}
						],
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "INPUT_INTERVAL",
						"domkey": [
							"seclevel",
							"seclevelMax"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "安全级别",
						"labelcol": 6,
						"value": [
							10,
							100
						],
						"viewAttr": 2
					}
				],[
					{
						"colSpan": 2,
						"conditionType": "SELECT",
						"domkey": [
							"sharelevel"
						],
						"fieldcol": 18,
						"isQuickSearch": false,
						"label": "权限",
						"labelcol": 6,
						"options": [
							{
								"key": "1",
								"selected": true,
								"showname": "查看"
							}, {
								"key": "2",
								"selected": false,
								"showname": "编辑"
							}
						],
						"viewAttr": 2
					}
				]
			]
		}
	]

	@observable taskReqStore =  new TableStore(); //流程
	@observable taskDocStore = new TableStore();  //文档
	@observable taskCrmStore = new TableStore();  //客户
	@observable taskCptStore = new TableStore();   //资产

	@observable relateList ={} ; // 查询结果集

	@observable exchangeform = new WeaForm();
	@observable exchangeContent = {}  //相关交流内容

	@observable verified = false;
	@observable hasRight = false; //权限
	 
    @action 
    //设置选中按钮
    changeTab=(key)=>{
	   this.selectTabKey = key;
       if(key == "tasksub"){
            this.getTaskSubList();
            Apis.getTaskSubCondition({conditiontype:'tasksub'}).then(data=>{
                this.condition = data.condition;
                this.tasksubform && !this.tasksubform.isFormInit && this.tasksubform.initFormFields(data.condition);
            });
       }
       if(key == "taskshare"){
            this.getTaskShareList();
	   }
	   if(key == "req" || key == "doc" ||key == "crm" ||key == "cpt"){
			this.getTaskReference(key);
		}
		if(key == "exchange"){
			this.getRelateExchangeInfo();
			Apis.getTaskExchangeCondition({conditiontype:"discuss"}).then(data=>{
				this.condition = data.condition;
				this.exchangeform && !this.exchangeform.isFormInit && this.exchangeform.initFormFields(data.condition);
			})
	    }
    }

    getTaskForm=(params={})=>{
		this.loading = true;
        Apis.getTaskForm(params).then(data=>{
			// this.fieldInfo = data.fieldinfo;
			if(!data.isright && typeof(data.isright) !== "undefined"){
				this.hasRight = data.isright;
				this.verified = true;
			}else{
				this.hasRight = true;
				this.verified = true;
				this.taskid = data.taskid ||params.taskid ;
				this.taskname = data.taskname;
				this.loading = false;
				this.form && !this.form.isFormInit && this.form.initFormFields(this.fieldInfo);
			}
        })
        
    }
    //子任务列表
    getTaskSubList=(params={})=>{
         //获取表单的参数值
         this.loading = true;
		 const searchParamsAd = this.tasksubform.getFormParams();
		 const newParams = { taskid:this.taskid, ...searchParamsAd, ...params };
        Apis.getTaskSubList(newParams).then(data=>{
            this.taskSubStore.getDatas(data.sessionkey,  1);
            this.rightMenu = data.rightMenus;
            this.loading = false;
        });
    }
    //高级搜索设值
    setFormFields=(value)=>{
        if(this.selectTabKey == "tasksub"){
            this.tasksubform.updateFields(value, true);    //true代表完全覆盖方式更新条件值
		}
		if(this.selectTabKey == "exchange"){
            this.exchangeform.updateFields(value, true);    //true代表完全覆盖方式更新条件值
        }
    }
    //共享
    getTaskShareList=(params={})=>{
        //获取表单的参数值
        this.loading = true;
        const newParams = { taskid:this.taskid, ...params };
       Apis.getTaskShareList(newParams).then(data=>{
           this.taskShareStore.getDatas(data.sessionkey,  1);
           this.rightMenu = data.rightMenus;
           this.loading = false;
       });
	}
	showTaskShare=(bool)=>{
		this.isShowTaskShare = bool;
	}
	//相关流程-文档-资产-客户
	getTaskReference=(type)=>{
		this.loading = true;
		const newParams = { taskid:this.taskid, reftype:type};
		Apis.getTaskReference(newParams).then(data=>{
			if(type== "req"){
				this.taskReqStore.getDatas(data.sessionkey,1);
				this.relateList = data;
				this.rightMenu = data.rightMenus;
			}else if(type== "doc"){
				this.taskDocStore.getDatas(data.sessionkey,1);
				this.relateList = data;
				this.rightMenu = data.rightMenus;
			}else if(type == "crm"){
				this.taskCrmStore.getDatas(data.sessionkey,1);
				this.rightMenu = data.rightMenus;
			}else if(type == "cpt"){
				this.taskCptStore.getDatas(data.sessionkey,1);
				this.rightMenu = data.rightMenus;
			}
			this.loading = false;
		});

	}
	//相关交流内容
	getRelateExchangeInfo=(params={})=>{
		this.loading = true;
		const searchParamsAd = this.exchangeform.getFormParams();
		const newParams = { types:"pt",sortid:this.taskid, ...searchParamsAd, ...params };
		Apis.getTaskExchange(newParams).then(data=>{
			this.rightMenu = data.rightMenus;
			this.exchangeContent =data;
			this.loading = false;
		})
	}
		//form 重置
    clearFormFields=()=>{
        if(this.selectTabKey == "tasksub"){
            this.tasksubform.reset();      //清除查询条件值
		}
		if(this.selectTabKey == "exchange"){
            this.exchangeform.reset();      //清除查询条件值
        }
       
    }
    //高级搜索显隐
    setShowSearchAd=(bool)=>{
        this.showSearchAd = bool
    }
    onShowColumn=()=>{   //显示定制列
        if(this.selectTabKey == "tasksub"){
            this.taskSubStore.setColSetVisible(true);
            this.taskSubStore.tableColSet(true)
        }
        
    }



}
const taskCardStore = new TaskCardStore()
export default taskCardStore;