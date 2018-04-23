
import { inject, observer} from 'mobx-react';
import {Row,Col,Input,Button,Alert,Spin,Icon} from 'antd'
import {WeaTop} from "ecCom"

import MLinkCard from './MLinkCard';
import OLinkCard from './OLinkCard';

@inject('prjAddStore')
@observer
class PrjAdd extends React.Component {

    componentDidMount() {
		const {prjAddStore} = this.props;
		prjAddStore.initDatas();
		this.scrollheigth();
	}
    scrollheigth(){
    	let top = jQuery(".wea-prj-add-content").offset() ? (jQuery(".wea-prj-add-content").offset().top ? jQuery(".wea-prj-add-content").offset().top : 0) : 0;
        let scrollheigth = document.documentElement.clientHeight - top;
        jQuery(".wea-prj-add-content").height(scrollheigth-30);
    }

  render() {
      const {prjAddStore} = this.props;
     

      const {showDatas = {},value,tabkey,mulitcol,isAbc,loading,importDataShow,wfOperateInfo} = prjAddStore;
      
      const {setImportSearchValue,importWf,doAddWfToColl,setShowBeagenters,setShowImportWf,getImportData} = prjAddStore;

      const {typesShow,typesCols,usedBeans,abcBtns,user} = showDatas;
      const actions  = {setImportSearchValue,importWf,doAddWfToColl,setShowBeagenters,setShowImportWf,getImportData};
    return (
        <div className="prj-create-main">
            <WeaTop 
                loading={loading} 
                icon={<i className='icon-coms-project' />}
                iconBgcolor='#217346'
                title='新建项目' 
                buttons={this.getButtons()} 
                showDropIcon={false}/>
                <div className="wea-prj-add-content">
                    {isAbc  && (
                        <div className="abcbtn-group">
                        {
                            abcBtns.map(abcBtn => <Button className={abcBtn.selected ? 'btn-selected' : ''} type='ghost' key={abcBtn.letter}
                                disabled={abcBtn.disabled} onClick={this.goABC.bind(this,abcBtn.letter)}>{abcBtn.letter}</Button>)
                        }
                        </div>)
                    }
                    {
                        typesShow.length == 0 && !loading ? <Alert message="提示" description="数据为空" type="info" showIcon /> :(
                            mulitcol ?
                            <Row>
                                {typesCols.map(c=>{
                                    return <Col span={24 / typesCols.length} style={{padding:'0 10px'}}>
                                     <MLinkCard types={c} user={user} mulitcol={mulitcol} importDataShow={importDataShow} isAbc={isAbc} wfOperateInfo={wfOperateInfo} actions={actions}/>
                                 </Col>
                                })}
                            </Row>
                         :
                         <Row>
                             <Col span="24" style={{paddingLeft:10,paddingRight:10}}>
                                 <OLinkCard user={user} types={typesShow} mulitcol={mulitcol} importDataShow={importDataShow} isAbc={isAbc} wfOperateInfo={wfOperateInfo} actions={actions}/>
                             </Col>
                         </Row>)
                    }
                </div>

        </div>
    );
  }
  getButtons(){
    const {prjAddStore} = this.props;
    const {isAbc,mulitcol} = prjAddStore;
        return [
            <i className={"icon-button icon-New-Flow-Letter" + (isAbc ? ' wea-new-top-btn-clicked' : '')} onClick={this.showABC.bind(this)}/>,
            <i className={"icon-button icon-New-Flow-1" + (mulitcol ? ' wea-new-top-btn-clicked' : '')} onClick={this.showMulitcol.bind(this)}/>
        ]
    }
    goABC(letter){
		const {prjAddStore} = this.props;
		prjAddStore.setAbcSelected(letter);
	  	let topheight = jQuery('#'+letter).position().top;
	  	jQuery(".wea-prj-add-content").scrollTop(topheight);
    }
    showMulitcol(){
		const {prjAddStore} = this.props;
		const mulitcol = prjAddStore.mulitcol;
		prjAddStore.setMulitcol(!mulitcol);
		jQuery(".wea-wf-add-content").scrollTop(0);
	}
	showABC(){
		const {prjAddStore} = this.props;
		const {isAbc} = prjAddStore;
		prjAddStore.setIsAbc(!isAbc);
		jQuery(".wea-wf-add-content").scrollTop(0);
	}
}

export default PrjAdd