import {Table, Icon, Button, Spin, Row, Col,Menu, Dropdown,} from 'antd';
import { WeaTools,WeaInput,WeaTextarea,WeaSelect,WeaBrowser,WeaDatePicker,WeaTimePicker,WeaCheckbox} from "ecCom"

import classNames from 'classnames'
import isEqual from 'lodash/isEqual';
import './index.less'

//国际化 zxt- 20170419
const defaultLocale = {
	total: '共',
	totalUnit: '条',
};


class Main extends React.Component {
	//国际化 zxt- 20170419
	static contextTypes = {
		antLocale: React.PropTypes.object,
	}
	getLocale() {
		let locale = {};
		if(this.context.antLocale && this.context.antLocale.Table) {
			locale = this.context.antLocale.WeaTableEdit;
		}
		return {
			...defaultLocale,
			...locale,
			...this.props.locale
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			columns: [],
			datas: [],
			selectedRowKeys: [],
			current: 1
		}
		this.onEdit = this.onEdit.bind(this);
	}
	componentDidMount() {
		const { datas = [], columns = [] } = this.props;
		columns.length > 0 && this.setState(datas.length > 0 ? {datas: this.addKeytoDatas(datas),columns} : {columns})
	}
	componentWillReceiveProps(nextProps) {
		const { columns = [], datas = [], selectedRowKeys = [] } = this.props;
		const _columns = nextProps.columns || [];
		const _datas = nextProps.datas || [];
		const _selectedRowKeys = nextProps.selectedRowKeys || [];
		!isEqual(columns,_columns) && this.setState({columns: _columns});
		!isEqual(datas,_datas) && this.setState({datas: this.addKeytoDatas(_datas)});
		!isEqual(selectedRowKeys,_selectedRowKeys) && this.setState({selectedRowKeys: _selectedRowKeys});
	}
	componentDidUpdate() {

	}
	addKeytoDatas(datas){
		let _datas = datas.map((data, i) => {
			let _data = {...data};
			_data.key = i
			return _data
		})
		return _datas
	}
	render() {
		const { datas } = this.state;
        const {tableProps} = this.props;
		return(
			<div className="wea-table-edit" >
                <Table
                	columns={this.getColumns()}
                	dataSource={datas}
                	pagination={this.getPagination()}
                    {...tableProps}
                />
            </div>
		)
	}
	getColumns(){
		const { columns } = this.state;
		let _columns = [].concat(columns);
		_columns = _columns.map(col => {
			let _col = { ...col };
			_col.render || (_col.render = ( text, record, index ) => {
				return this.getColRender( _col, text, record, index );
			})
			return _col
		});
		return _columns
	}
	getColRender( _col, text, record, index ){
		const { com } = _col;
		let _com = [];
		com.map(c => {
			if(typeof c.props === 'object'){
				_com.push(c);
			}else{
				const { key, label = '', type = 'INPUT', options = [], browserConditionParam = {}, innerStyle = {width: "100%"},
                 viewAttr = 2 ,showTime = false ,format = "yyyy-MM-dd",otherParams } = c;
				const _type = type.toUpperCase();
                let style = _type === 'BROWSER' ? {...innerStyle}:{...innerStyle, display: 'inline-block'}
				_com.push(
					<span >
						{label && <span style={{marginLeft: 5}}>{label}</span>}
						{ _type === 'INPUT' &&
							<WeaInput
                                {...otherParams}
								defaultValue={record[key]}
								value={record[key]}
								style={style}
								viewAttr={ viewAttr }
								onBlur={value => this.onEdit(record, index, key, value)} />
						}
						{ _type === 'TEXTAREA' &&
							<WeaTextarea
                                 {...otherParams}
								defaultValue={record[key]}
								value={record[key]}
								style={style}
								viewAttr={ viewAttr }
								onBlur={value => this.onEdit(record, index, key, value)} />
						}
						{ _type === 'DATEPICKER' &&
							<WeaDatePicker
                                 {...otherParams}
								showTime = {showTime}
								format = {format}
								defaultValue={record[key]}
								value={record[key]}
								style={style}
								viewAttr={ viewAttr }
								onChange={value => this.onEdit(record, index, key, value)} />
						}
						{ _type === 'TIMEPICKER' &&
							<WeaTimePicker
                                 {...otherParams}
								defaultValue={record[key]}
								value={record[key]}
								style={style}
								viewAttr={ viewAttr }
								onChange={value => this.onEdit(record, index, key, value)} />
						}
						{ _type === 'SELECT' &&
							<WeaSelect
                                {...otherParams}
								defaultValue={record[key]}
								value={record[key]}
								options={options}
								style={style}
								viewAttr={ viewAttr }
								onChange={value => this.onEdit(record, index, key, value)} />
						}
						{ _type === 'BROWSER' &&
							<WeaBrowser
                                 {...otherParams}
								replaceDatas={this.getBrowerDatas(record, key)}
								{...browserConditionParam}
								inputStyle={style}
								viewAttr={ viewAttr }
								onChange={(ids, names, bDatas) => this.onEdit(record, index, key, ids, names, bDatas)} />
						}
						{ _type === 'CHECKBOX' &&
							<WeaCheckbox
                                {...otherParams}
                                style={style}
                                value={record[key]}
                                viewAttr={ viewAttr }
                                onChange={(value) => this.onEdit(record, index, key, value)}
                            />
						}
						{
                            _type == "LINK_WF" &&
							<span className="prj-link-a">
								<a href="javascript:void(0)">{record[key]}</a>({record.requiredWFCount})
								<span className="prj-content-must" style={{display:(Number(record.requiredWFCount)<=0 &&record.isNecessary=="1" ) ?"inline-block":"none"}}>!</span>
							</span>
						}
						{
                            _type == "LINK_DOC" &&
							<span className="prj-link-a">
								<a href="javascript:void(0)">{record[key]}</a>({record.requiredDocCount})
								<span className="prj-content-must" style={{display:(Number(record.requiredDocCount)<=0 &&record.isNecessary=="1" ) ?"inline-block":"none"}}>!</span>
							</span>
                        }
                        {
                            _type == "OPERATE" &&
                            <Dropdown overlay={this.getMenu(options,record["ismanager"])} onClick={()=>this.onMenuClick(record,options)}>
                                <a className="ant-dropdown-link" href="#">
                                操作 <Icon type="caret-down" />
                                </a>
                            </Dropdown> 
                        }
					</span>
				)
			}
		});
		return (
			<div>
				{_com}
			</div>
		)
	}
	getBrowerDatas(record, key){
		let replaceDatas = [];
		if(record[key + 'span'] !== undefined) {
			let keys = record[key].split(',');
			let values = record[key + 'span'].split(',');
			if(keys.length === values.length){
				keys.map((k, i) => {
					if (k != '' && values[i] != '') replaceDatas.push({id: k, name: values[i]});
				});
			}else{
				console.log('浏览按钮数据有误！！，显示名中不能包含有英文逗号" , "');
			}
		}
		return replaceDatas
	}
	getPagination() {
		const { pageSize = 0, paginationSize = ''} = this.props;
		if( !pageSize ) return false;
		const { current } = this.state;
		const locale = this.getLocale();
		let obj = {
			size: paginationSize,
			current,
			pageSize,
		};
		return obj
	}
	onEdit(record, index, key, value, names, bDatas){
		const { pageSize = 0 } = this.props;
		const { datas, current } = this.state;
		let _datas = [].concat(datas);
		_datas[pageSize * (current - 1) + index][key] = value;
		if(names) _datas[pageSize * (current - 1) + index][key + 'span'] = names;
		this.setState({datas: _datas});
		this.onChange(_datas);
	}
	onChange(datas){
		const { columns } = this.state;
		let _datas = datas.map((data, i) => {
			let _data = {...data}
			delete _data.key
			return _data
		})
		typeof this.props.onChange === 'function' && this.props.onChange(_datas, columns);
    }
    getMenu(options,bool){
		let menu = [];
        if(options && bool){
            options.map(item=>{
                menu.push(
                    <Menu.Item>
                    <a  href="javascript:void(0)" key={item.key}>{item.showname}</a>
                    </Menu.Item>
                )
            })
            return <Menu>
                {menu}
            </Menu>
        }
        return menu
    }
    onMenuClick(record,options){
        console.log(record,options)
    }
}

export default Main;

