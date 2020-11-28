import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Container, Row, Col, Button} from 'reactstrap'
import api from '../../services/api'
// import '../../assets/css/Page.css';
import logo from '../../assets/img/logo.png'

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
              const response = await api.post("/contato", { 
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
    render(){
        return (
            <div>
            <div className="jumbotron text-center">
            <h1>
                <img 
                    alt="La-Music" 
                    title="La-Music" 
                    style={{width:"120px", height:"auto"}}
                    src={logo}/>
            </h1>
            </div>
                <Container>  
                    <h1>Contato</h1> 
                    <Row>  
                        <Col>
                        <Form onSubmit={this.handleSubmit}>
                        {this.state.error && <p>{this.state.error}</p>}
                        <Form.Group controlId="contatoForm.Nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={e => this.setState({ nome: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="contatoForm.Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="" onChange={e => this.setState({ email: e.target.value })}/>
                        </Form.Group>
                        <Form.Group controlId="contatoForm.Assunto">
                            <Form.Label>Assunto</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={e => this.setState({ assunto: e.target.value })}/>
                        </Form.Group>
                        <Form.Group controlId="contatoForm.Mensagem">
                            <Form.Label>Mensagem</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={e => this.setState({ mensagem: e.target.value })}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                                Enviar
                        </Button>
                        </Form>
                        </Col>    
                    </Row>
                </Container>
                </div>
        );
    }
}

export default withRouter(ContatoForm);
