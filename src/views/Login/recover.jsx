import React, { useState } from 'react';
import { reset_password } from 'services/endpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'assets/css/Login.css'
import {
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Row,
    Col
  } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Dcard, BtLogin, Label, TitleCard, InpText } from './styles'

const Recover = (props) => {
    const { Recover } = useSelector(r => r)
    const dispatch = useDispatch();

    const [ state, setState ] = useState({ email: '', senha: '', error: '',  }) 

    const [ loading, setLoading ] = useState(false)

    async function confirm() {
      setState({...state, error: ''})
    }

    async function handleRecover (e) {
        e.preventDefault();
        await setLoading(true)
        const { email } = state;

        if (!email) {
          await setState({...state, error: "Preencha e-mail e senha para continuar!" });
          await setLoading(false)

          return false
        } else {
          try {
              await reset_password({ email}).then(async r => {
                if(r.status === 200 ){
                  window.alert(r.data.message)
                  await setLoading(false)
                  window.location.assign('/pro')
                }
              });
            } catch (err) {
              setState({...state,
              error:
                  "Houve um problema"
              });
              await setLoading(false)
          }
        }
    }
  return (

          <Dcard className="card-user px-0 px-md-3">
            <CardHeader>
              <TitleCard tag="h5">Esqueceu sua senha?</TitleCard>
            </CardHeader>
            <CardBody>
              <Form autoComplete="off" onSubmit={handleRecover}>
                {Recover.inputs.map((e,index) => 
                    <Row key={index}>
                      <Col>
                        <FormGroup>
                          <Label>{e.label}</Label>
                          <InpText
                            autoComplete="email"
                            placeholder={e.placeholder}
                            type={e.type}
                            name={e.name}
                            onChange={e => setState({[e.target.name]: e.target.value })} />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                <Row className="mb-3">
                  <Col className="d-flex justify-content-between">
                    <Link onClick={() => dispatch({ type: 'TYPE_FORM', payload: 'Register'})}>Não tenho uma conta</Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <BtLogin disbled={loading} type="submit">{ !loading ? `Enviar` : 'Aguarde...'}</BtLogin>
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
  );
}

export default Recover;