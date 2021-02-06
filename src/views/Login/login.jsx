import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Login as apiLogin, perfil as apiPerfil } from 'services/endpoint'
import { login } from 'services/auth'
import 'assets/css/Login.css'
import {
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
  } from "reactstrap";

import { PreLoad } from 'components/PreLoad'
import { validToken } from 'utils'
import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Login = (props) => {

    const { Login } = useSelector(s => s)
    const [ load, setLoad ] = useState(false)

    const dispatch = useDispatch()
    const [ state, setState ] = useState({ email: '', senha: '', error: '' }) 

    async function confirm() {
      setState({...state, error: ''})
    }
   
    async function handleSignIn (e) {
        e.preventDefault();
        const { email, senha } = state;

        if (!email || !senha) {
          setState({...state, error: "Preencha e-mail e senha para continuar!" });
          return false
        } else {
          try {
              setLoad(true)
              const response = await apiLogin({ email, senha });

              
              
              if (response.data.papel === 'pro'){
                login(response.data.token, '', response.data.nome);

                apiPerfil.find().then(async res => {
                  await validToken(res)
                  login(response.data.token, res.data.email, response.data.nome);
                  props.history.push("/credito-retido");  
                  setLoad(false)
                  setState({...state, error: '' });
                })


              }else{
                setState({...state, error:  "Este usuário não possui permissão para logar." });
                setLoad(false)
              }
            } catch (err) {
              setLoad(false)
              setState({...state, error: err.response.data.message });
          }
        }
    }
  return (
    load ? 
      <PreLoad />
     : (
          <Dcard className="card-user">
            <CardHeader className="px-0 px-md-3">
              <TitleCard tag="h5">Acessar minha conta</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleSignIn}>
                {Login.inputs.map((e, index) => 
                  <Row key={index}>
                    <Col className="px-0 px-md-3">
                      <FormGroup>
                        <Label>{e.label}</Label>
                        <InpText
                          autoComplete={e.autoComplete}
                          placeholder={e.placeholder}
                          type={e.type}
                          name={e.name}
                          onChange={e => setState({...state, [e.target.name]: e.target.value })} />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Row className="mb-3">
                  <Col md="6" className="px-0 px-md-3">
                    <Link onClick={() => dispatch({type: 'TYPE_FORM', payload: 'Register'})}>Não tenho uma conta</Link>
                  </Col>
                  <Col md="6" className="text-md-right px-0 px-md-3">
                    <Link onClick={() => dispatch({type: 'TYPE_FORM', payload: 'Recover'})}>Esqueci minha senha</Link>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-0 px-md-3">
                    <BtLogin type="submit">Login</BtLogin>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <Modal isOpen={state.error} >
              <ModalHeader>Atenção!</ModalHeader>
              <ModalBody>
              {state.error}
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={confirm} >Ok</Button>{' '}
              </ModalFooter>
            </Modal>
          </Dcard>
        )
  );
}

export default Login;