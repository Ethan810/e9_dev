import {inject, observer} from 'mobx-react';
import {WeaTable} from 'ecCom';

//@inject('comsWeaTableStore')

export default //@observer
class WeaTableMobx extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {comsWeaTableStore, sessionkey, hasOrder, needScroll, onOperatesClick = '', getRender} = this.props;
    const tablekey = sessionkey ? sessionkey.split('_')[0] : 'init';
    const tableNow = comsWeaTableStore.state[tablekey] || comsWeaTableStore.state['init'];
    const {
      //table
      datakey,
      datas,
      columns,
      browser,
      operates,
      sortParams,
      selectedRowKeys,
      loading,
      showCheck,
      pageAutoWrap,
      //自定义列
      colSetVisible,
      colSetdatas,
      colSetKeys,
      //pagination
      count,
      current,
      pageSize,
      rootMap,
    } = tableNow;
    if (getRender && typeof(getRender) == 'function') {
      return getRender(tableNow, this.props);
    }
    //console.log("tableNow:",tablekey);
    //console.log(tableNow);
    return (
      <WeaTable
        {...this.props}
        browser={browser}
        hasOrder={hasOrder}
        needScroll={needScroll}
        loading={loading}
        tableCheck={showCheck}
        pageAutoWrap={pageAutoWrap}

        count={count}
        current={current}
        pageSize={pageSize}

        rootMap={rootMap}
        datas={datas.slice()}
        columns={this.getColumns()}
        rowSel={this.getRowSel()}
        operates={operates.slice()}
        sortParams={sortParams.slice()}
        onChange={(p, f, s) => comsWeaTableStore.getDatas(sessionkey, p.current, p.pageSize, s)}

        colSetVisible={colSetVisible}
        colSetdatas={colSetdatas.slice()}
        colSetKeys={colSetKeys.slice()}
        showColumnsSet={bool => comsWeaTableStore.setColSetVisible(sessionkey, bool)}
        onTransferChange={keys => comsWeaTableStore.setTableColSetkeys(sessionkey, keys)}
        saveColumnsSet={() => comsWeaTableStore.tableColSet(sessionkey)}

        onOperatesClick={onOperatesClick}
      />
    )
  }

  getRowSel() {
    const {comsWeaTableStore, sessionkey} = this.props;
    const tablekey = sessionkey ? sessionkey.split('_')[0] : 'init';
    const tableNow = comsWeaTableStore.state[tablekey] || comsWeaTableStore.state['init'];
    const {selectedRowKeys} = tableNow;
    return {
      selectedRowKeys: selectedRowKeys.slice(),
      onChange(sRowKeys, selectedRows) {
        comsWeaTableStore.setSelectedRowKeys(sessionkey, sRowKeys);
      },
      onSelect(record, selected, selectedRows) {
      },
      onSelectAll(selected, selectedRows, changeRows) {
      }
    };
  }

  getColumns() {
    const {comsWeaTableStore, sessionkey, getColumns} = this.props;
    const tablekey = sessionkey ? sessionkey.split('_')[0] : 'init';
    const tableNow = comsWeaTableStore.state[tablekey] || comsWeaTableStore.state['init'];
    const {columns} = tableNow;
    let newColumns = columns.slice();
    newColumns = newColumns.map(column => {
      let newColumn = column;
      newColumn.render = (text, record, index) => { //前端元素转义
        let valueSpan = record[newColumn.dataIndex + "span"] !== undefined ? record[newColumn.dataIndex + "span"] : record[newColumn.dataIndex];
        return (
          <div className="wea-url" dangerouslySetInnerHTML={{__html: valueSpan}}/>
        )
      }
      return newColumn;
    });
    if (typeof getColumns === 'function') {
      newColumns = getColumns(newColumns);
    }
    return newColumns
  }
}
