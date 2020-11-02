import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Container, Row, Col, Button} from 'reactstrap'
import api from '../../services/api'
import logo from '../../assets/img/logo.png'

class CreditoForm extends Component {
    state = {
        nome: "",
        email: "",
        cpf:"",
        telefone:"",
        nome_artistico:"",
        associacao:"",
        error: ""
      };
    
    handleSubmit = async e => {
        e.preventDefault();
        const { nome, email, cpf, telefone, nome_artistico, associacao } = this.state;
        if (!nome || !email) {
        this.setState({ error: "Preencha nome e e-mail e senha para continuar!" });
        } else {
        try {
            const response = await api.post("/credito-retido", { 
                nome, 
                email,
                cpf,
                telefone,
                nome_artistico,
                associacao,
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
            <h1>Credito Retido</h1>
            <Row>  
                <Col>
                <Form onSubmit={this.handleSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                <Form.Group controlId="contatoForm.Nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e => this.setState({ nome: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="contatoForm.Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="" onChange={e => this.setState({ email: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="contatoForm.Cpf">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e => this.setState({ cpf: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="contatoForm.Telefone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e => this.setState({ telefone: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="contatoForm.NomeArtistico">
                    <Form.Label>Nome Artístico</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e => this.setState({ nome_artistico: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Associação</Form.Label>
                    <Form.Control as="select" custom onChange={e => this.setState({ associacao: e.target.value })}>
                        <option>ECAD</option>
                        <option>ABRAMUS</option>
                        <option>UBC</option>
                        <option>SOCIMPRO</option>
                        <option>SICAM</option>
                        <option>AMAR</option>
                        <option>SBACEM</option>
                        <option>Não tenho certeza</option>
                        <option>Não filiado</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Enviar</Button>
                </Form>
                </Col>    
            </Row>
        </Container>
        </div>
  );
}
}
export default withRouter(CreditoForm);
