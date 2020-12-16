import React from "react";
import '../../assets/css/Login.css'
import {
    Container,
    Row,
    Col
  } from "reactstrap";
import {useSelector } from 'react-redux'
import Login from './login'
import Register from './register'
import Recover from './recover'

import {isAuthenticated} from 'services/auth'

function Index (props) {
  
  isAuthenticated() && props.history.push("/credito-retido")


  const { type } = useSelector(state => state.data);

  return (
      <Container style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Row className="w-100">
          <Col className="px-0 d-flex justify-content-center flex-column align-items-center">

            {type === 'Login' && (
              <Login {...props} />
            )}
            {type === 'Register' && (
              <Register {...props} />
            )}
            {type === 'Recover' && (
              <Recover {...props} />
            )}
          </Col>
        </Row>
      </Container>
  );
}

export default (Index);