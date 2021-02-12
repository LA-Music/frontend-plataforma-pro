import React, { useState, useRef } from 'react';
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { contato as apiContato } from 'services/endpoint'
import { Container } from './styles';
import { getEmail } from 'services/auth'

import { validToken, ErrorSystem } from 'utils'

function Index() {
  let notificationAlert = useRef();
  const [ state, setState ] = useState({ nome: '', email: getEmail(), assunto: '', mensagem: '', tipo: 0})
  const [ load, setLoad ] = useState(false)

  const notify = (place, message, color) => {
    var type;
    switch (color) {
      case 1: type = "primary"; break;
      case 2: type = "success"; break;
      case 3: type = "danger";  break;
      case 4: type = "warning"; break;
      case 5: type = "info";    break;
      default: break;
    }
    
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
  }

  const debugSubmit = async e => {
    e.preventDefault()
    await setLoad(true)

    apiContato.register(state)
    .then( async res =>  {
      if(!res) {
        ErrorSystem()
       
        return false
      }

      await validToken(res)
      
      if (res && res.data.message === 'ok') {
        notify("tc", "Enviado com Sucesso!", 2)
        setState({ nome: '', email: getEmail(), assunto: '', mensagem: '', tipo: 0})
      } else {
        notify("tc", res.data.message, 3) 
      }
      setLoad(false)
    })
    .catch(function(error) {
      notify("tc", error.data.message, 3)
      setLoad(false)
    })
  }    

  return (
    <div className="content">
    <Container className="p-3 p-lg-5" >
      <Form onSubmit={debugSubmit}>
      <NotificationAlert ref={notificationAlert} />
        <h1>Entre em contato</h1>
        <Row>
          <Col>
            <FormGroup>
              <label>Nome</label>
              <Input
                required
                placeholder="Nome Completo"
                type="text"
                value={state.nome}
                onChange={e => setState({...state, nome: e.target.value })}
              />
            </FormGroup>
          </Col>
          </Row>                        
        <Row>
          <Col>
            <FormGroup>
              <label> Assunto</label>
              <Input 
                required
                placeholder="Assunto"
                type="text"
                value={state.assunto}
                onChange={e => setState({...state,assunto: e.target.value})} 
                />
            </FormGroup>
          </Col>
        </Row> 
        <Row>
          <Col>
            <FormGroup className="d-flex flex-column">
              <label>Mensagem</label>
              <textarea 
                required
                type="textarea"
                rows="5"
                value={state.mensagem}
                onChange={e => setState({...state,mensagem: e.target.value})} 
              />
            </FormGroup>
          </Col>
        </Row> 
        <FormGroup className="mb-4">
          <Button type="submit" className="submit">
            {load ? 
                  <> 
                    Enviando <i class="fa fa-spinner fa-spin" /> 
                  </> : 'Enviar'
                }</Button>
        </FormGroup>
      </Form>
    </Container>
    </div>
  );
}

export default Index;