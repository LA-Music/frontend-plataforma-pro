import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import { isAuthenticated } from "../services/auth";
import { validToken, ErrorSystem } from 'utils'
import { perfil as apiPerfil } from 'services/endpoint'

import routes from "routes";

var ps;

class DashboardUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {

    apiPerfil.find().then( async r => {
     
      if(!r) {
        ErrorSystem()
       
        return false
      }
      await validToken(r)
      
      r.data && this.props.dispatch({ type: 'SET_SETTINGS', payload:  {...r.data}})
    })


    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }


  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />

          <Switch>
            {routes.map((prop, key) => {
           
             return (
                <this.PrivateRoute
                  path={prop.path}
                  component={prop.component}
                  key={key}
             />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect()(DashboardUser);
