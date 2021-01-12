import React from "react";
import '../../assets/css/Login.css'
import {
    // Container,
    Row,
    Col
  } from "reactstrap";
import {useSelector } from 'react-redux'
import Login from './login'
import Register from './register'
import Recover from './recover'

import logoLa from 'assets/img/logo-lamusic.svg'

import {isAuthenticated} from 'services/auth'

import { Header, Container } from './styles'

function Index (props) {
  
  isAuthenticated() && props.history.push("/credito-retido")


  const { type } = useSelector(state => state.data);

  return (
    <>
      <Container >
        <Header>
          <a href="https://lamusic.com.br" without rel="noopener noreferrer"  target="_blank"><img src={logoLa} alt="LA Music" /></a>
        </Header>
        <Row className="mx-auto" style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
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
    </>
  );
}

export default (Index);