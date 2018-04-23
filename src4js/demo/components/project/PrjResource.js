import React from 'react';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx"
import { Tree, Menu, TopTitle,Form } from 'modeCom'
import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;

import equals from 'deep-equal';
import classnames from 'classnames';

@inject("prjResourceStore")
@observer
class PrjResource extends React.Component {
	constructor(props) {
        super(props);
    }

    componentDidMount = () => {

	}
    render() {
        const {prjResourceStore} = this.props;
        const {dataKey,tableStore} = prjResourceStore;
        tableStore.readAll();
        return (
            <WeaTable 
                sessionkey={dataKey}
                comsWeaTableStore={tableStore}
                hasOrder={true}
                needScroll={true} />
        )
    }
}

export default PrjResource;