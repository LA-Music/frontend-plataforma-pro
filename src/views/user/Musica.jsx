import React, { Component } from "react";
import api from '../../services/api'
// import logo from '../../assets/img/logo.png'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";

class ContatoForm extends Component {
    state = {
        nome: "",
        email: "",
        assunto:"",
        mensagem:"",
        error: ""
      };
      
      handleSubmit = async e => {
          e.preventDefault();
          const { nome, email, assunto, mensagem } = this.state;
          if (!nome || !email) {
          this.setState({ error: "Preencha nome e e-mail e senha para continuar!" });
          } else {
          try {
              await api.post("/contato", { 
                  nome, 
                  email,
                  assunto,
                  mensagem,
                  tipo:0 
                });              
              alert("Enviado com sucesso!")
          } catch (err) {
              this.setState({
              error:
                  "Houve um problema com o envio, verifique os campos."
              });
          }
          }
      }
    debugSubmit = e => {
        e.preventDefault()
        console.log(this.state)
    }    
    render(){
        return (
            <>
              <Row style={{paddingTop:"10em"}}>
                <Col md="8" style={{margin:"0 auto"}} >
                  <Card className="card-user update ml-auto mr-auto">
                    <div className="image">
                      <img
                        alt="..."
                        src={require("assets/img/concert.png")}
                      />
                    </div>
                  </Card>
                </Col>
                </Row>
                <Row >
                <Col md="8" style={{margin:"0 auto"}}>
                  <Card className="card-user">
                    <CardHeader>
                      <CardTitle tag="h5">Cadastro de Música</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={this.debugSubmit}>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>Nome</label>
                              <Input
                                placeholder="Nome Completo"
                                type="text"
                                onChange={e => this.setState({ nome: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>
                                Subtitulo
                              </label>
                              <Input 
                                type="text"
                                onChange={e => this.setState({email: e.target.value})} 
                                />
                            </FormGroup>
                          </Col>
                        </Row>                        
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>
                                Estilo
                              </label>
                              <Input 
                                type="text"
                                onChange={e => this.setState({assunto: e.target.value})} 
                                />
                            </FormGroup>
                          </Col>
                        </Row> 
                        <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Autores</label>
                          <Input
                            
                            type="text"
                            onChange={e => this.setState({ email: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Interpretes</label>
                          <Input
                            type="text"
                            onChange={e => this.setState({ telefone: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label>
                                Letra
                              </label>
                              <Input 
                                type="textarea"
                                onChange={e => this.setState({mensagem: e.target.value})} 
                                />
                            </FormGroup>
                          </Col>
                        </Row> 
                        <Row>
                          <div className="update ml-auto mr-auto">
                            <Button
                              className="btn-round"
                              color="primary"
                              type="submit"
                            >
                              Enviar
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          </>
        );
    }
}

export default ContatoForm;
