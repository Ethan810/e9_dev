import LinkCardItem from './LinkCardItem';
import {Card,Icon} from 'antd';
import isEqual from 'lodash/isEqual';
class OLinkCard extends React.Component{

	render() {
		const {types,importDataShow,isAbc,wfOperateInfo,actions,user} = this.props;
		return (
			<div>
			{
           		types.map((type)=>{
           			const {prjbeans,img,color,letter,selected,typeName} = type;
					const icontype ="icon-base " +img;
					return (
						<Card id={letter} className='clearfix' style={selected? {"border-top-color":color,overflow:'visible',background:'#fff',boxShadow:'0 1px 6px hsla(0,0%,39%,.2)'} : {"border-top-color":color,overflow:'visible'}}>
							<div style={{"width":"100%","margin-bottom":"20px"}}>
								<div className="one-card-title">
									<div style={{"display": "table","height":"100%","width":"100%"}}>  
										<div style={{"display": "table-cell",padding:'5px 0 25px 0',textAlign:'center'}}>
											{isAbc ?
												<span style={{fontSize:26,color:color}}>{letter}</span>
												:
												<div className="wf-card-type-name">
													<span style={{color:color,fontSize:26,marginRight:10}}><i className={icontype}/></span>
													<span style={{height:36,lineHeight:'36px'}}>{typeName}{prjbeans && ('(' + prjbeans.length + ')')}</span>
												</div>
											}
										</div>
									</div>
								</div>
								<div className="one-card-content">
									<ul>
										{
											prjbeans.map((obj)=>
												<li>
													<LinkCardItem user={user} prjbean={obj} importDataShow={importDataShow} iscommon={false} wfOperateInfo={wfOperateInfo} actions={actions} />
												</li>			
											)
										}
									</ul>
								</div>
							</div>
						</Card>
					)
           		})
            }
			</div>
		)
	}


}

export default OLinkCard