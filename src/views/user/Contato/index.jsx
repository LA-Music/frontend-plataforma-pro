import React, { useState } from 'react';
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { Container } from './styles';

function Index() {
  const [ state, setState ] = useState({ nome: '', email: '', assunto: '', mensagem: ''})

  const debugSubmit = async e => {
    e.preventDefault()
    console.log(this.state)
  }    

  return (
    <div className="content">
    <Container >
      <Form onSubmit={debugSubmit}>
        <h1>Contato</h1>
        <Row>
          <Col>
            <FormGroup>
              <label>Nome</label>
              <Input
                placeholder="Nome Completo"
                type="text"
                onChange={e => setState({...state, nome: e.target.value })}
              />
            </FormGroup>
          </Col>
          </Row>
        <Row>
          <Col>
            <FormGroup>
              <label> Email </label>
              <Input
                placeholder="contato@dominio.com"
                type="email"
                onChange={e => setState({...state, email: e.target.value})} 
                />
            </FormGroup>
          </Col>
        </Row>                        
        <Row>
          <Col>
            <FormGroup>
              <label> Assunto</label>
              <Input 
                placeholder="Assunto"
                type="text"
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
                type="textarea"
                rows="10"
                onChange={e => setState({...state,mensagem: e.target.value})} 
              />
            </FormGroup>
          </Col>
        </Row> 
        <FormGroup className="mb-4">
          <Button type="submit" className="submit">Enviar</Button>
        </FormGroup>
      </Form>
    </Container>
    </div>
  );
}

export default Index;