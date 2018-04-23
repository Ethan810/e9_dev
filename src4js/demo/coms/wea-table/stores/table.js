import { observable, action, autorun } from 'mobx';
import * as API_TABLE from '../apis/table'
import {Modal} from 'antd';

export default class TableStore {
	@observable state = {
		init: {
			dataKey: '',
			requireTimes: 0,
			loading: true,// fix by caoyun 初始化改为加载中
			datas: [],
			columns: [],
			operates: [],
			sortParams: [],
			selectedRowKeys: [],
			showCheck: false,
			pageAutoWrap: false,
			//pagination
			count: 0,
			current: 1,
			pageSize: 10,
			//自定义列
			colSetVisible: false,
			colSetdatas: [],
			colSetKeys: [],
      rootMap: undefined,
      browser: []
		}
	}

	//	@observable dataKey = '';
	//	@observable requireTimes = 0;
	//	@observable loading = false;
	//	@observable datas = [];
	//	@observable columns = [];
	//	@observable operates = [];
	//	@observable sortParams = [];
	//	@observable selectedRowKeys = [];
	//	@observable showCheck = false;
	//	@observable pageAutoWrap = false;
	//
	//	//pagination
	//	@observable count = 0;
	//	@observable current = 1;
	//	@observable pageSize = 10;
	//
	//	//自定义列
	//	@observable colSetVisible = false;
	//	@observable colSetdatas = [];
	//	@observable colSetKeys = [];

	constructor() {
		this.tableUpdate = this.tableUpdate.bind(this);
		this.getDatas = this.getDatas.bind(this);
		this.setSelectedRowKeys = this.setSelectedRowKeys.bind(this);
		this.tableColSet = this.tableColSet.bind(this);
		this.setColSetVisible = this.setColSetVisible.bind(this);
	}
	@action 
	tableUpdate(name, value) {
		this.state = {...this.state , [name] : { ...this.state.init, ...(this.state[name] || {}),...value }}
	}
	getDatas(sessionkey, currentNow, pageSizeNow, sorter = '') {
		const name = sessionkey ? sessionkey.split('_')[0] : 'init';
		const requireTimes = this.state[name] && this.state[name].requireTimes || 0;
		//初始化table && 清理部分状态
		this.tableUpdate(name,{
			loading: true,
			selectedRowKeys: [],
			requireTimes: requireTimes + 1
		});
		//已初始化
		const dataKey = sessionkey ? sessionkey : this.state[name].dataKey;
		const pageSizeChange = pageSizeNow && pageSizeNow !== this.state[name].pageSize;
		const pageSize = pageSizeNow ? pageSizeNow : this.state[name].pageSize;
		const current = pageSizeChange ? 1 : (currentNow ? currentNow : this.state[name].current);
		const sortParams = sorter && sorter.column ? [{ orderkey: sorter.column.orderkey, sortOrder: sorter.order }] : [];

		const doGetAPI = () => {
			Promise.all([
				API_TABLE.getTableDatas({
					dataKey,
					current,
					sortParams: JSON.stringify(sortParams)
				}).then((data) => {
					const requireTimesNow = this.state[name].requireTimes;
					//console.log('requireTimesNow: ',requireTimesNow,'requireTimes: ',requireTimes,'dataKey: ',dataKey);
					if(requireTimesNow === requireTimes + 1) {
						this.tableUpdate(name,{
							dataKey,
							loading: false,
							datas: data.datas,
							columns: data.columns,
							operates: data.ops,
							showCheck: data.haveCheck,
							pageAutoWrap: data.pageAutoWrap,
							//pagination
							pageSize: data.pageSize,
							current,
							sortParams,
              rootMap: data.rootMap,
              browser: data.browser
						});
						return data;
					}
				}),
				API_TABLE.getTableCounts({
					dataKey
				}).then((data) => {
					const requireTimesNow = this.state[name].requireTimes;
					//console.log('requireTimesNow: ',requireTimesNow,'requireTimes: ',requireTimes,'dataKey: ',dataKey);
					if(requireTimesNow === requireTimes + 1) {
						this.tableUpdate(name,{
							count: data.count
						});
						return data;
					}
				})
			]).then(result => {
				if(result[0]){
					const { haveCheck, ops } = result[0];
					if(haveCheck || (ops && ops.length > 0)) {
						const { columns, datas } = result[0];
						let newDatas = [];
						datas.map(data => {
							let newData = {};
							columns.map(column => {
								if((column.from && column.from === "set") || column.dataIndex === "randomFieldId") {
									newData[column.dataIndex] = data[column.dataIndex];
								}
							})
							newDatas.push(newData);
						});
						API_TABLE.getTableChecks({
							dataKey,
							randomDatas: JSON.stringify(newDatas),
						}).then(data => {
							const requireTimesNow = this.state[name].requireTimes;
							//console.log('requireTimesNow: ',requireTimesNow,'requireTimes: ',requireTimes,'dataKey: ',dataKey);
							if(requireTimesNow === requireTimes + 1) {
								let resetDatas = datas.map(d => {
									data.datas && data.datas.map(n => {
										if(n.randomFieldId === d.randomFieldId) {
											for(let p in n) {
												d[p] = n[p];
											}
										}
									})
									return d
								});
								this.tableUpdate(name,{ datas: resetDatas });
							}
						});
					}
				}
			});
		}
		pageSizeChange ? API_TABLE.setTablePageSize({
			dataKey,
			pageSize
		}).then(data => {
			doGetAPI();
		}) : doGetAPI();
	}
	setSelectedRowKeys(sessionkey, selectedRowKeys = []) {
		const name = sessionkey ? sessionkey.split('_')[0] : 'init';
		this.tableUpdate(name,{ selectedRowKeys});
	}
	tableColSet(sessionkey, isInit) {
		const name = sessionkey ? sessionkey.split('_')[0] : 'init';
		const { dataKey, colSetKeys } = this.state[name];
		const method = isInit ? 'GET' : 'POST';
		
		this.tableUpdate(name,{ loading: true });
		
		API_TABLE.tableColSet(isInit ? {
			dataKey
		} : {
			dataKey,
			systemIds: `${colSetKeys.toJS()}`
		}, method).then(data => {
			if(data.status) {
				if(data.destdatas) {
					let keys = [];
					data.destdatas.map(d => { keys.push(d.id) });
					let datas = [].concat(data.destdatas).concat(data.srcdatas);
					newDatas = [];
					datas.map(d => newDatas.push({ key: d.id, name: d.name, description: d.name }))
					this.tableUpdate(name,{
						colSetKeys: keys,
						colSetdatas: newDatas,
						loading: false
					});
				} else {
					this.tableUpdate(name,{
						colSetVisible: false,
						colSetKeys: [],
						loading: false
					});
					this.getDatas(dataKey);
				}
			} else {
				Modal.error({
					title: '接口错误，请重新提交',
				});
			}
		});
	}
	setTableColSetkeys(sessionkey,colSetKeys = []) {
		const name = sessionkey ? sessionkey.split('_')[0] : 'init';
		this.tableUpdate(name, { colSetKeys });
	}
	setColSetVisible(sessionkey,colSetVisible = false) {
		const name = sessionkey ? sessionkey.split('_')[0] : 'init';
		this.tableUpdate(name, { colSetVisible });
	}
}
