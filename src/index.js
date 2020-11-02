import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'store'
import 'bootstrap/dist/css/bootstrap.css'
import 'assets/scss/paper-dashboard.scss?v=1.1.0'
import 'assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import Login from 'views/Login'
import Reset from 'views/Login/NewPassword'
import UserLayout from 'layouts/User.jsx'
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/reset/:token" exact render={ props => <Reset {...props} />}/>
          <Route path="/user"  render={props => <UserLayout {...props} />}  />
        <Route path="*" component={() => <h1>404 - Página não encontrada =/</h1>} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
