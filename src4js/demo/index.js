import { Route } from 'react-router'
import {IndexRedirect} from 'react-router';
import { WeaErrorPage } from 'ecCom'

import store from './stores';
import './index.css'
import './style/index';

import Home from './components/Home'
import Demo from './components/Demo';

window.prj_store = store; 

class Error extends React.Component {
    render() { 
      return (
        <WeaErrorPage msg="对不起，无法找到该页面！" />
      )
    }
  }


const  Routes = (
    <Route path="prj" component={Home}>
        
        <Route path="demo" component={Demo} ></Route>
        <Route path="*" component={Error}></Route>
    </Route>
    );

export default {
    Route:Routes,
    store,
}