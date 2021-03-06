import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'store'

import { Message, MessageGeral } from 'utils'

import 'bootstrap/dist/css/bootstrap.css'
import 'assets/scss/paper-dashboard.scss?v=1.1.0'
import 'assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import {isAuthenticated} from 'services/auth'

import Login from 'views/Login'
import Reset from 'views/Login/NewPassword'
import UserLayout from 'layouts/Pro.jsx'

import { GlobalStyle } from "styles/GlobalStyles";

const hist = createBrowserHistory()
// const { settings } = useSelector(state => state)
export const PrivateRoute = ({component: Component, ...rest}) => (

  <Route 
    {...rest}
    render={ props =>
      
     isAuthenticated() ? (
        <Component {...props} />
        ) : (
        <Redirect 
          to={{
            pathname: '/',
            state: {from: props.location}
          }}
        />
      )
    }
  />
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={hist} basename="/pro">
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/reset" component={Reset}/>
        <PrivateRoute path="/" component={UserLayout}  />
        <Route path="*" component={() => <h1>404 - Página não encontrada =/</h1>} />
      </Switch>
    </BrowserRouter>
    <Message />
    <MessageGeral />
    <GlobalStyle />
  </Provider>,
  document.getElementById("root")
);
