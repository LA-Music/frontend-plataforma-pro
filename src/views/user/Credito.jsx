import React from "react";
import NotificationAlert from "react-notification-alert";
import api from '../../services/api'
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
class CreditoForm extends React.Component {
    state = {
        nome: "",
        email: "",
        cpf:"",
        telefone:"",
        nome_artistico:"",
        associacao:"",
        error: "",
        visible:true
      };

      notificationAlert = React.createRef();
      notify(place, message) {
        var color = Math.floor(Math.random() * 5 + 1);
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
        this.notificationAlert.current.notificationAlert(options);
      }


    handleSubmit = async e => {
        e.preventDefault();
        const { nome, email, cpf, telefone, nome_artistico, associacao } = this.state;
        if (!nome || !email) {
            this.setState({ error: "Preencha nome e e-mail e senha para continuar!" });
        } else {
            try {
                await api.post("/credito-retido", {
                    nome,
                    email,
                    cpf,
                    telefone,
                    nome_artistico,
                    associacao,
                    tipo:0
                });
                this.notify("tc", "Enviado com Sucesso!")
        } catch (err) {
            console.log(JSON.stringify(err))
            this.notify("tc", "Houve um problema com o envio, verifique os campos.")
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
        <div className="content">
        <NotificationAlert ref={this.notificationAlert} />
            <Row>
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
            <Row>
                <Col md="8" style={{margin:"0 auto"}}>
                <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Requerir Credito Retido</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Nome Completo</label>
                          <Input
                            placeholder="Nome"
                            type="text"
                            onChange={e => this.setState({ nome: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Nome Artístico</label>
                          <Input
                            placeholder="Nome Artístico"
                            type="text"
                            onChange={e => this.setState({ nome_artistico: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Cpf</label>
                          <Input
                            type="number"
                            onChange={e => this.setState({ cpf: e.target.value })}
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={e => this.setState({ email: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Telefone</label>
                          <Input
                            placeholder="Telefone"
                            type="text"
                            onChange={e => this.setState({ telefone: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Associação</label>
                          <Input
                            placeholder="Associação"
                            type="select"
                            onChange={e => this.setState({ associacao: e.target.value })}
                          >
                            <option> </option>
                            <option defaultChecked value="ECAD">ECAD</option>
                            <option value="ABRAMUS">ABRAMUS</option>
                            <option value="UBC">UBC</option>
                            <option value="SOCIMPRO">SOCIMPRO</option>
                            <option value="SICAM">SICAM</option>
                            <option value="AMAR">AMAR</option>
                            <option value="SBACEM">SBACEM</option>
                            <option value="INCERTO">Não tenho certeza</option>
                            <option value="N/A">Não filiado</option>
                          </Input>
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
        </div>
      </>
  );
}
}
export default CreditoForm;
