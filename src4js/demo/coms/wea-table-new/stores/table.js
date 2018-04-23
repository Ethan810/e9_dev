import { observable, action } from 'mobx';
import * as API_TABLE from '../apis/table';
import { Modal } from 'antd';

export default class TableStore {
  @observable dataKey = '';
  @observable requireTimes = 0;
  @observable loading = false;
  @observable datas = [];
  @observable columns = [];
  @observable operates = [];
  @observable sortParams = [];
  @observable selectedRowKeys = [];
  @observable showCheck = false;
  @observable pageAutoWrap = false;
  // pagination
  @observable count = 0;
  @observable current = 1;
  @observable pageSize = 10;
  // 自定义列
  @observable colSetVisible = false;
  @observable colSetdatas = [];
  @observable colSetKeys = [];
  @observable rootMap = undefined;
  @observable browser = [];

  constructor() {
    this.tableUpdate = this.tableUpdate.bind(this);
    this.getDatas = this.getDatas.bind(this);
    this.setSelectedRowKeys = this.setSelectedRowKeys.bind(this);
    this.tableColSet = this.tableColSet.bind(this);
    this.setColSetVisible = this.setColSetVisible.bind(this);
  }

  @action
  tableUpdate(object) {
    if (Object.prototype.toString.call(object) === '[object Object]') {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          this[key] = object[key];
        }
      }
    }
    return this;
  }
  getDatas(sessionkey, currentNow, pageSizeNow, sorter = '') {
    const requireTimes = this.requireTimes;
    // 初始化table && 清理部分状态
    this.tableUpdate({
      loading: true,
      selectedRowKeys: [],
      requireTimes: requireTimes + 1,
    });
    // 已初始化
    const dataKey = sessionkey || this.dataKey;
    const pageSizeChange = pageSizeNow && pageSizeNow !== this.pageSize;
    const pageSize = pageSizeNow || this.pageSize;
    const current = pageSizeChange ? 1 : (currentNow || this.current);
    const sortParams = sorter && sorter.column
      ? [{ orderkey: sorter.column.orderkey, sortOrder: sorter.order }] : [];

    const doGetAPI = () => {
      Promise.all([
        API_TABLE.getTableDatas({
          dataKey,
          current,
          sortParams: JSON.stringify(sortParams),
        }).then(data => {
          const requireTimesNow = this.requireTimes;
          if (requireTimesNow === requireTimes + 1) {
            this.tableUpdate({
              dataKey,
              loading: false,
              datas: data.datas,
              columns: data.columns,
              operates: data.ops,
              showCheck: data.haveCheck,
              pageAutoWrap: data.pageAutoWrap,
              // pagination
              pageSize: data.pageSize,
              current,
              sortParams,
              rootMap: data.rootMap,
              browser: data.browser,
            });
            return data;
          }
        }),
        API_TABLE.getTableCounts({ dataKey }).then(data => {
          const requireTimesNow = this.requireTimes;
          if (requireTimesNow === requireTimes + 1) {
            this.tableUpdate({
              count: data.count,
            });
            return data;
          }
        }),
      ]).then(result => {
        if (result[0]) {
          const { haveCheck, ops } = result[0];
          if (haveCheck || (ops && ops.length > 0)) {
            const { columns, datas } = result[0];
            const newDatas = [];
            datas.forEach(data => {
              const newData = {};
              columns.forEach(column => {
                if ((column.from && column.from === 'set')
                  || column.dataIndex === 'randomFieldId') {
                  newData[column.dataIndex] = data[column.dataIndex];
                }
              });
              newDatas.push(newData);
            });
            API_TABLE.getTableChecks({
              dataKey,
              randomDatas: JSON.stringify(newDatas),
            }).then(data => {
              const requireTimesNow = this.requireTimes;
              if (requireTimesNow === requireTimes + 1) {
                const resetDatas = datas.map(d => {
                  const _d = { ...d };
                  data.datas && data.datas.forEach(n => {
                    if (n.randomFieldId === d.randomFieldId) {
                      for (const p in n) {
                        if (n.hasOwnProperty(p)) {
                          _d[p] = n[p];
                        }
                      }
                    }
                  });
                  return _d;
                });
                this.tableUpdate({ datas: resetDatas });
              }
            });
          }
        }
      });
    };
    pageSizeChange ? API_TABLE.setTablePageSize({
      dataKey,
      pageSize,
    }).then(() => {
      doGetAPI();
    }) : doGetAPI();
    return this;
  }
  setSelectedRowKeys(selectedRowKeys = []) {
    this.tableUpdate({ selectedRowKeys });
    return this;
  }
  tableColSet(isInit) {
    const { dataKey, colSetKeys } = this;
    const method = isInit ? 'GET' : 'POST';

    this.tableUpdate({ loading: true });

    API_TABLE.tableColSet(isInit ? {
      dataKey,
    } : {
      dataKey,
      systemIds: `${colSetKeys.toJS()}`,
    }, method).then(data => {
      if (data.status) {
        if (data.destdatas) {
          const keys = [];
          data.destdatas.forEach(d => { keys.push(d.id); });
          const datas = [].concat(data.destdatas).concat(data.srcdatas);
          const newDatas = [];
          datas.map(d => newDatas.push({ key: d.id, name: d.name, description: d.name }));
          this.tableUpdate({
            colSetKeys: keys,
            colSetdatas: newDatas,
            loading: false,
          });
        } else {
          this.tableUpdate({
            colSetVisible: false,
            colSetKeys: [],
            loading: false,
          });
          this.getDatas(dataKey);
        }
      } else {
        Modal.error({
          title: '接口错误，请重新提交',
        });
      }
    });
    return this;
  }
  setTableColSetkeys(colSetKeys = []) {
    this.tableUpdate({ colSetKeys });
    return this;
  }
  setColSetVisible(colSetVisible = false) {
    this.tableUpdate({ colSetVisible });
    return this;
  }
}
