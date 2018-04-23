import React from 'react';
import { toJS } from 'mobx';
import { WeaTable } from 'ecCom';

import { observer } from 'mobx-react';

@observer
class WeaTableMobx extends React.Component {
  getRowSel() {
    const { comsWeaTableStore } = this.props;
    const { selectedRowKeys } = comsWeaTableStore;
    return {
      selectedRowKeys: toJS(selectedRowKeys),
      onChange(sRowKeys) {
        comsWeaTableStore.setSelectedRowKeys(sRowKeys);
      },
    };
  }

  getColumns() {
    const { comsWeaTableStore, getColumns } = this.props;
    const { columns } = comsWeaTableStore;
    let newColumns = toJS(columns);
    newColumns = newColumns.map(column => {
      const newColumn = { ...column };
      newColumn.render = (text, record) => { // 前端元素转义
        const valueSpan = record[`${newColumn.dataIndex}span`] !== undefined
          ? record[`${newColumn.dataIndex}span`] : record[newColumn.dataIndex];
        return (
          <div className='wea-url' dangerouslySetInnerHTML={{ __html: valueSpan }} />
        );
      };
      return newColumn;
    });
    if (typeof getColumns === 'function') {
      newColumns = getColumns(newColumns);
    }
    return newColumns;
  }

  render() {
    const { comsWeaTableStore, hasOrder, needScroll,
      onOperatesClick = '', getRender } = this.props;
    const {
      // table
      datas,
      browser,
      operates,
      sortParams,
      loading,
      showCheck,
      pageAutoWrap,
      // 自定义列
      colSetVisible,
      colSetdatas,
      colSetKeys,
      // pagination
      count,
      current,
      pageSize,
      rootMap,
    } = comsWeaTableStore;
    if (getRender && typeof getRender === 'function') {
      return getRender(comsWeaTableStore, this.props);
    }
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
        datas={toJS(datas)}
        columns={this.getColumns()}
        rowSel={this.getRowSel()}
        operates={toJS(operates)}
        sortParams={toJS(sortParams)}
        onChange={(p, f, s) => comsWeaTableStore.getDatas('', p.current, p.pageSize, s)}

        colSetVisible={colSetVisible}
        colSetdatas={toJS(colSetdatas)}
        colSetKeys={toJS(colSetKeys)}
        showColumnsSet={bool => comsWeaTableStore.setColSetVisible(bool)}
        onTransferChange={keys => comsWeaTableStore.setTableColSetkeys(keys)}
        saveColumnsSet={() => comsWeaTableStore.tableColSet()}

        onOperatesClick={onOperatesClick}
      />
    );
  }
}

export default WeaTableMobx;
