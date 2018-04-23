import LinkCardItem from './LinkCardItem';
import {Card,Icon} from 'antd';
import isEqual from 'lodash/isEqual';
import * as mobx from 'mobx'


class MLinkCard extends React.Component {
	shouldComponentUpdate(nextProps) {
		const _c = !isEqual(mobx.toJS(this.props.types), mobx.toJS(nextProps.types));
		const _e = !isEqual(mobx.toJS(this.props.importDataShow), mobx.toJS(nextProps.importDataShow)); 
        return _c || _e || this.props.isAbc !== nextProps.isAbc
			|| !isEqual(this.props.wfOperateInfo,nextProps.wfOperateInfo);
    }
	render() {
		const {types,importDataShow,isAbc,wfOperateInfo,actions,user} = this.props;
		return (
			<div>
			{
           		types.map((type)=>{
           			const {prjbeans,img,color,letter,selected,typeName} = type;
					const icontype ="icon-base " +img;
					return (
						<Card id={letter} style={selected ? {"border-top-color":color,background:'#fff',boxShadow:'0 1px 6px hsla(0,0%,39%,.2)'} : {"border-top-color":color}}>
				 			<div style={{padding:'5px 0 25px 0',textAlign:'center'}}>
								{isAbc ?
									<span style={{fontSize:26,color:color}}>{letter}</span>
									:
									<div className="wf-card-type-name">
										<span style={{color:color,fontSize:26,marginRight:10}}><i className={icontype}/></span>
										<span style={{height:36,lineHeight:'36px'}}>{typeName}{prjbeans && ('(' + prjbeans.length + ')')}</span>
									</div>
								}
							</div>
							{
								prjbeans.map((obj)=><LinkCardItem user={user} prjbean={obj} importDataShow={importDataShow} iscommon={false} wfOperateInfo={wfOperateInfo} actions={actions} />)
							}
						</Card>
					)
           		})
            }
			</div>
		)
	}
}

export default MLinkCard
