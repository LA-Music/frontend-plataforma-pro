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

function Index (props) {
  console.log(window.location.hash)

  const { type } = useSelector(state => state.data);

  return (
      <Container style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Row className="w-100">
          <Col className="px-0 d-flex justify-content-center flex-column align-items-center">

            {type === 'Login' && window.location.hash !== '#register' && (
              <Login {...props} />
            )}
            {(type === 'Register' || window.location.hash === '#register') && (
              <Register {...props} />
            )}
            {type === 'Recover' && window.location.hash !== '#register' && (
              <Recover {...props} />
            )}
          </Col>
        </Row>
      </Container>
  );
}

export default (Index);