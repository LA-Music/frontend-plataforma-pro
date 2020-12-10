import React, { useState, useRef, useEffect } from 'react';
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { notify as notifyComp } from 'components/Notify'
import { perfil as apiPerfil } from 'services/endpoint'
import { phoneMask } from 'components/Mask'
import { Container } from './styles';


function Index() {
  let notificationAlert = useRef();
  const [ state, setState ] = useState({ nome: '', nome_empresa: '', senha: '', telefone: ''})

  const notify = (place, message, color) => {
    notificationAlert.current.notificationAlert(notifyComp(place, message, color));
  }

  useEffect(() => {
    apiPerfil.find().then( r => {
      r.data && setState({...state, nome: r.data.nome})
    })
  }, [])//eslint-disable-line

  const debugSubmit = async e => {
    e.preventDefault()
    notify("tc", "Função em desenvolvimento.", 3)
  }    

  return (
    <div className="content">
      <Container>
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
              <label>Telefone</label>
              <Input
                required
                placeholder="(41) 0 0000-0000"
                type="tel"
                value={state.telefone}
                onChange={e => setState({...state, telefone: phoneMask(e.target.value) })}
              />
            </FormGroup>
            <FormGroup>
              <label>Senha</label>
              <Input
                autoComplete="new-password"
                required
                placeholder="****"
                type="password"
                value={state.senha}
                onChange={e => setState({...state, senha: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <label>Confirmar Senha</label>
              <Input
                required
                placeholder="****"
                type="password"
                value={state.confirma_senha}
                onChange={e => setState({...state, confirma_senha: e.target.value })}
              />
            </FormGroup>
          </Col>
          </Row>                        
        <FormGroup className="mb-4">
          <Button type="submit" className="submit">Salvar</Button>
        </FormGroup>
      </Form>
      </Container>
    </div>
  );
}

export default Index;