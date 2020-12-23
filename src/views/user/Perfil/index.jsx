import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { notify as notifyComp } from 'components/Notify'
import { perfil as apiPerfil } from 'services/endpoint'
import { phoneMask } from 'components/Mask'
import { validToken } from 'utils'
import { NAME_KEY } from 'services/auth'

import { Container } from './styles';


function Index() {
  let notificationAlert = useRef();

  const [ state, setState ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const notify = (place, message, color) => {
    notificationAlert.current.notificationAlert(notifyComp(place, message, color));
  }

  useEffect(() => {
    apiPerfil.find().then( async r => {
      await validToken(r)

      r.data && setState({...state, ...r.data})
    })
  }, [])//eslint-disable-line

  const debugSubmit = async e => {
    e.preventDefault()
    
    setLoading(true)

    apiPerfil.update(state)
      .then( async res => {
        await validToken(res)

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
        <Form onSubmit={debugSubmit}>
          <NotificationAlert ref={notificationAlert} />
          <h1>Editar dados do Perfil</h1>
          <Row>
            <Col>
              <FormGroup>
                <label>Editora</label>
                <Input
                  required
                  placeholder="Editora"
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
                  placeholder="(00) 00000-0000"
                  type="text"
                  value={state.telefone}
                  onChange={e => setState({...state, telefone: phoneMask(e.target.value) })}
                />
              </FormGroup>
            </Col>
          </Row>                        
          <FormGroup className="mb-4">
            <Button type="submit" disabled={loading} className="submit"> 
              {loading ? 
                <> 
                  Salvando <i class="fa fa-spinner fa-spin" /> 
                </>: 'Salvar' 
              }
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default Index;