import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Login as apiLogin } from 'services/endpoint'
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

  import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Login = (props) => {
    const { Login } = useSelector(s => s)

    const dispatch = useDispatch()
    const [ state, setState ] = useState({ email: '', senha: '', error: '' }) 
   
    async function handleSignIn (e) {
        e.preventDefault();
        const { email, senha } = state;
        if (!email || !senha) {
          setState({...state, error: "Preencha e-mail e senha para continuar!" });
          return false
        } else {
          try {
              const response = await apiLogin({ email, senha });
              login(response.data.token, response.data.nome);
              if (response.data.papel === 'user'){
                props.history.push("/user/gestao-repositorio");
              }
            } catch (err) {
              setState({...state,
              error:
                  "Houve um problema com o login, verifique suas credenciais. T.T"
              });
          }
        }
    }
  return (
          <Dcard className="card-user">
            <CardHeader className="px-0 px-md-3">
              <TitleCard tag="h5">Acessar minha conta</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleSignIn}>
                {state.error && <p>{state.error}</p>}
                {Login.inputs.map((e, index) => 
                  <Row key={index}>
                    <Col className="px-0 px-md-3">
                      <FormGroup>
                        <Label>{e.label}</Label>
                        <InpText
                          autoComplete="emails"
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
          </Dcard>
  );
}

export default Login;