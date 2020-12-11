import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { notify as notifyComp } from 'components/Notify'
import { perfil as apiPerfil } from 'services/endpoint'
import { cpfMask } from 'components/Mask'
import { Container } from './styles';
import { NAME_KEY } from 'services/auth'

function Index() {
  let notificationAlert = useRef();
  const [ state, setState ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const notify = (place, message, color) => {
    notificationAlert.current.notificationAlert(notifyComp(place, message, color));
  }

  useEffect(() => {
    apiPerfil.find().then( r => {
      r.data && setState({...state, ...r.data})
    })
  }, [])//eslint-disable-line

  const debugSubmit = async e => {
    e.preventDefault()
    
    setLoading(true)

    apiPerfil.update(state)
      .then( res => {
        if (res.data) {
          if (res.data.message === 'ok') {
            notify("tc", "Dados alterados.", 2)
            Cookies.set(NAME_KEY, state.nome)
          } else {
            notify("tc", "Não foi possĩvel alterar seus dados, tente novamente mais tarde.", 3)
          }
        } else {
          notify("tc", "Não foi possĩvel alterar seus dados, tente novamente mais tarde.", 3)
        } 
        setLoading(false)
      })
    
  }    

  return (
    <div className="content">
      <Container>
        {console.log(state)}
      <Form onSubmit={debugSubmit}>
      <NotificationAlert ref={notificationAlert} />
        <h1>Perfil</h1>
        <Row>
          <Col>
            <FormGroup>
              <label>Nome da empresa</label>
              <Input
                required
                placeholder="Nome da empresa"
                type="text"
                value={state.nome_empresa}
                onChange={e => setState({...state, nome_empresa: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <label>Nome do responsável</label>
              <Input
                required
                placeholder="Nome do responsável"
                type="text"
                value={state.nome}
                onChange={e => setState({...state, nome: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <label>Cpf</label>
              <Input
                required
                placeholder="000.000.000-00"
                type="text"
                value={state.cpf}
                onChange={e => setState({...state, cpf: cpfMask(e.target.value) })}
              />
            </FormGroup>
          </Col>
          </Row>                        
        <FormGroup className="mb-4">
          <Button type="submit" disabled={loading} className="submit">Salvar {loading && <i class="fa fa-spinner fa-spin" /> }</Button>
        </FormGroup>
      </Form>
      </Container>
    </div>
  );
}

export default Index;