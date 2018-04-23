

import React from 'react'
import ReactDOM from 'react-dom';

import { createHistory, useBasename, createHashHistory } from 'history'
import { Router, Route, useRouterHistory, Redirect ,IndexRedirect} from 'react-router'

import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';


const routingStore = new RouterStore();

const browserHistory = useRouterHistory(createHashHistory)({
    queryKey: '_key',
    basename: '/'
});


import Prj from './index.js';
const PrjStore = Prj.store;
const PrjRoute = Prj.Route;

const history = syncHistoryWithStore(browserHistory, routingStore);
window.weaHistory = history;


let store = {
    // Key can be whatever you want
    routing: routingStore,
    ...PrjStore
}

const Home = props => props.children;

class Root extends React.Component {
   
    render() {
        return (
            <Provider {...store}>
                <Router history={history}>
                    <Route name="main" breadcrumbName="入口" path="main" component={Home}>
                        {PrjRoute}
                    </Route>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('container'));


