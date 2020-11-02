import React, { useState, useEffect } from 'react'
import {
  Container,
  CardHeader,
  CardBody,
  FormGroup,
  FormFeedback,
  Form,
  Row,
  Col
} from "reactstrap"
import 'assets/css/Login.css'
import { reset_token } from 'services/endpoint'
import { Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Index = (props) => {
  const [ state, setState ] = useState({ confirm_password: '', password: '', error: '', userValid: false, token: props.match.params.token }) 

  useEffect(() => {
    reset_token({token: state.token}).then(async r => { 
      if(r) {
        await setState({...state, userValid: r.data.user.email ? true : false})
      } else {
       window.alert('Token inválido')
       window.location.assign('/')
      }
    })
  }, [state.token]) //eslint-disable-line
 console.log(state)
  async function handleSignIn (e) {
      e.preventDefault();
      const { confirm_password, password, token } = state;
      
      if (confirm_password  !== password) {
        setState({...state, error: "As senhas não conferem!" });
        return false

      } else {
        try {
            const response = await reset_token({senha: password, token});
            if(response.status === 200) {
              window.alert(response.data.message)
              window.location.assign('/')
            }
          } catch (err) {
            setState({...state,
            error:
                "Houve um problema, tente novamente."
            });
        }
      }
  }

  const validPassword = () => {
    return (state.confirm_password !== '' && state.password !== '') && (state.confirm_password === state.password)
  }

  return (
    <Container style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Row className="w-100">
        <Col className="px-0 d-flex justify-content-center">
          <Dcard className="card-user">
            <CardHeader className="px-0 px-md-3">
              <TitleCard tag="h5">Redefinir senha</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleSignIn}>
                {state.error && <p>{state.error}</p>}
                  <Row >
                    <Col className="px-0 px-md-3">
                      <FormGroup>
                        <Label>Nova senha</Label>
                        <InpText
                          autoComplete="off"
                          placeholder={'Nova senha'}
                          invalid={state.confirm_password !== state.password}
                          valid={validPassword()}
                          type={'password'}
                          name={'password'}
                          onChange={e => setState({...state, [e.target.name]: e.target.value })} />
                          <FormFeedback invalid>As senhas não conferem</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label>Confirmar senha</Label>
                        <InpText
                          autoComplete="off"
                          placeholder={'Confirmar senha'}
                          invalid={state.confirm_password !== state.password}
                          valid={validPassword()}
                          type={'password'}
                          name={'confirm_password'}
                          onChange={e => setState({...state, [e.target.name]: e.target.value })} />
                          <FormFeedback invalid>As senhas não conferem</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-0 px-md-3">
                      <BtLogin disabled={!validPassword()} type="submit">Redefinir minha senha</BtLogin>
                    </Col>
                  </Row>
              </Form>
            </CardBody>
          </Dcard>
        </Col>
      </Row>
    </Container>
  )
}

export default Index
