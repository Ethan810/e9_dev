import React from 'react'
import Draggable from './Draggable';
import './index.less';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: props.columns || [],
            _columns: [],
            key: 0,

        }
        this._columns = props.columns;
    }
    handleStart = (column, _, { $target }) => {
        let $columnplaceholder = $(this.refs._columnplaceholder);
        let $columnstore = $(this.refs._columnstore);
        this._dragColumn = column;
        $columnplaceholder.show().css({ width: $target.width(), height: $target.height(), ...$target.offset() })
        $target.after($columnplaceholder).appendTo($columnstore);
    }
    handleMove = (e) => {
        let $target = $(e.target);
        //let columnKey = e.columnKey;
        let { left } = $target.offset();
        let width = $target.width();
        let children = $(this.refs._columns).children();
        let first = children.eq(0);
        let { left: firstLeft } = $(first).offset();
        if (left < (firstLeft + width / 2)) {
            first.children().appendTo($(this.refs._columnplaceholder).parent())
            first.append($(this.refs._columnplaceholder));
            this._columns = this.swapColumn(this._columns, 0, this.getIndex(this._columns, this._dragColumn))
        } else {
            children.each((index, ele) => {
                const { left: currentLeft } = $(ele).offset();
                if (left + width > currentLeft + width / 2 && left < currentLeft + width / 2) {
                    $(ele).children().appendTo($(this.refs._columnplaceholder).parent())
                    $(ele).append($(this.refs._columnplaceholder))
                    this._columns = this.swapColumn(this._columns, index, this.getIndex(this._columns, this._dragColumn))
                }
            })
        }
    }
    getIndex = (columns, column) => {
        for (let index = 0; index < columns.length; index++) {
            if (columns[index].key == column.key) {
                return index;
            }
        }
    }
    swrapColumnByKey = (columns, key1, key2) => {
        let index1 = 0, index2 = 0;
        for (let index = 0; index < columns.length; index++) {
            if (columns[index].key == key1) {
                index1 = index;
            }
            if (columns[index].key == key2) {
                index2 == index;
            }
        }
        return this.swapColumn(columns, index1, index2);
    }
    swapColumn = (columns, index1, index2) => {
        let _columns = [];
        for (let index = 0; index < columns.length; index++) {
            if (index == index1) {
                _columns.push(columns[index2]);
            } else if (index == index2) {
                _columns.push(columns[index1]);
            } else {
                _columns.push(columns[index]);
            }
        }
        return _columns;
    }
    handleStop = () => {
        $(this.refs._columnstore).empty();
        $(this.refs._columnplaceholder).removeAttr('style');
        $(this.refs._columnplaceholder).appendTo($(this.refs._columnstore).parent());
        this.setState({ columns: this._columns, key: this.state.key + 1 });
    }

    handleItemStart = (column, item, _, { $target }) => {
        this._dragColumn = column;
        this._dragItem = item;
        let $itemplaceholder = $(this.refs._itemplaceholder);
        $itemplaceholder.show().css({ width: $target.width(), height: $target.height(), ...$target.offset() })
        $target.after($itemplaceholder).appendTo($(this.refs._itemstore));
    }
    handleItemMove = (e) => {
        const { left, top } = $(e.target).offset();
        const width = $(e.target).width();
        const height = $(e.target).height();
        const thisId = $(e.target).attr("id");

        $("[id^=drag-item-]").each((_, ele) => {
            if ($(ele).attr("id") == thisId) {
                return;
            }
            const { left: currentLeft, top: currentTop } = $(ele).offset();
            const currentWidth = $(ele).width();
            const currentHeight = $(ele).height();

            if (left + width > currentLeft + currentWidth / 2 && left < currentLeft + currentWidth / 2) {
                if (top + height > currentTop + currentHeight / 2) {
                    if (top < currentTop + currentHeight / 2) {
                        $(ele).before($(this.refs._itemplaceholder));
                        this._columns = this.appendItem(this._columns, thisId, $(ele).attr("id"), false);
                    } else {
                        if (this.isLastItemOfColumn($(ele))) {
                            $(ele).after($(this.refs._itemplaceholder));
                            this._columns = this.appendItem(this._columns, thisId, $(ele).attr("id"), true);
                        }
                    }
                }

            }
        })

        $('.wea-draggable-column.column-empty').each((_, ele) => {
            const { left: currentLeft } = $(ele).offset();
            const currentWidth = $(ele).width();
            if (left + width > currentLeft + currentWidth / 2 && left < currentLeft + currentWidth / 2) {
                $(ele).find('.drag-item-wrap').append($(this.refs._itemplaceholder));
                this._columns = this.appendItem(this._columns, thisId, '', false, $(ele).attr('id'));
            }

        })



    }
    handleItemStop = () => {
        $(this.refs._itemstore).empty();
        $(this.refs._itemplaceholder).removeAttr('style');
        $(this.refs._itemplaceholder).appendTo($(this.refs._itemstore).parent());
        console.log(this._columns)
        this.setState({ columns: this._columns, key: this.state.key + 1 });
    }
    isLastItemOfColumn = ($ele) => {
        let silbs = $ele.parent().find("[id^=drag-item-]");
        let last = silbs.last();
        return last.attr("id") == $ele.attr("id");
    }
    appendItem = (columns, fromkey1, tokey2, after, toColumnKey) => {
        let _columns = [];
        for (let i = 0; i < columns.length; i++) {
            let _items = [];
            let items = columns[i].items;
            if (`drag-column-${columns[i].key}` == toColumnKey) {
                _items.push(this._dragItem);
            } else {
                for (let j = 0; j < items.length; j++) {
                    if (!items[j]) {
                        continue;
                    }
                    if (`drag-item-${items[j].key}` == fromkey1) {
                        continue;
                    } else if (`drag-item-${items[j].key}` == tokey2) {
                        let formitem = this._dragItem
                        if (after) {
                            _items.push(items[j]);
                            if (formitem) {
                                _items.push(formitem);
                            }
                        } else {
                            if (formitem) {
                                _items.push(formitem);
                            }
                            _items.push(items[j]);
                        }
                        continue;
                    }
                    _items.push(items[j]);
                }
            }
            console.log(_items)
            _columns.push({ ...columns[i], items: _items })
        }
        return _columns;
    }
    render() {
        console.log(this.state.columns)
        return (
            <div className="mode-kanban">
                <div ref="_columnplaceholder" className="mode-kanban-column-placeholder" />
                <div ref="_columnstore" className="mode-kanban-column-store" />
                <div ref="_itemplaceholder" className="mode-kanban-item-placeholder" />
                <div ref="_itemstore" className="mode-kanban-item-store" />
                <div key={this.state.key} ref="_columns" className="ant-row mode-kanban-column-row">
                    {this.state.columns.map((column) => {
                        return (
                            <div className={`ant-col-${24 / this.state.columns.length}`} >
                                <Draggable
                                    id={`drag-column-${column.key}`}
                                    className={`${column.items.length > 0 ? 'column' : 'column-empty'}`}
                                    defaultClassName="wea-draggable-column"
                                    onStart={this.handleStart.bind(this, column)}
                                    onStop={this.handleStop}
                                    onDrag={this.handleMove}
                                    handle=".column-dragg-handle"
                                    axis="x"
                                >
                                    <div
                                        className="mode-kanban-column"
                                    >
                                        <header className="column-dragg-handle column-header" >
                                            <i className="icon-mode-mode" style={{ fontSize: 18, paddingRight: 10 }} />
                                            <span>{column.title}</span>
                                        </header>
                                        <div className="drag-item-wrap">
                                            {
                                                column.items.map((item) => {
                                                    return (
                                                        <Draggable
                                                            id={`drag-item-${item.key}`}
                                                            defaultClassName="wea-draggable-item mode-kanban-item"
                                                            handle=".item-dragg-handle"
                                                            onStart={this.handleItemStart.bind(this, column, item)}
                                                            onDrag={this.handleItemMove}
                                                            onStop={this.handleItemStop}
                                                        >

                                                            <div
                                                                className="item-dragg-handle"
                                                                style={{ paddingLeft: 24, height: 80, overflow: 'hidden' }}
                                                            >
                                                                <h4 style={{ margin: '16px 0' }}>{item.title}</h4>
                                                                <div>
                                                                    <span>Tag 1</span>
                                                                    <span>>Link</span>
                                                                    <span >Tag 2</span>
                                                                    <span  >Prevent Default</span>
                                                                </div>
                                                            </div>
                                                        </Draggable>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                </Draggable>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}