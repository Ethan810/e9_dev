import {Row, Col, Icon} from 'antd';
import './index.less'

class PrjShowGroup extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            showGroup: props.showGroup ? props.showGroup : true
        }
    }

	render() {
        const {title,leftComponent=[],rightComponent=[], children,btnspace} = this.props;
        const {showGroup} = this.state;
        return (
            <div className={`${this.props.className || ''}`}>
                <Row className="prj-exchange-title">
                    <Col span="20" className="prj-exchange-title-left">
                        <div>{leftComponent}</div>
                    </Col>
                    <Col span="4" className="prj-exchange-title-right" >
                        <span style={{marginRight:"10px"}}>{rightComponent}</span>
                        <i className={showGroup ? 'icon-coms-up' : 'icon-coms-down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="prj-exchange-content" style={{display:showGroup ? "block":"none"} }>
                    {
                        children
                    }
                </Row>
            </div>
        )
    }

}

export default PrjShowGroup