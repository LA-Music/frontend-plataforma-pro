import React, { useState, useRef  } from "react";
import NotificationAlert from "react-notification-alert";
import { Button, FormText, Label ,FormGroup, Form, Input } from "reactstrap";
import { Checkbox, InputAdornment, IconButton, FormControl } from '@material-ui/core'
import api from 'services/api'
import AddCircle from 'assets/img/addCircle.svg'
import { Container, RadioInput, InputButtom, TagLabel, CloseTag } from './styles'

function Index () {
    const [ state, setState ] = useState({
        nome: "",
        email: "",
        cpf:"",
        telefone:"",
        nome_artistico:"",
        associacao:"",
        error: "",
        lista_musicas: [],
        redes_sociais: [],
        visible:true
      });

      const [ musicas, setMusicas ] = useState([])
      const [ sociais, setSociais ] = useState([])
      const [ association ] = useState(['ABRAMUS', 'UBC', 'SOCIMPRO', 'SICAM', 'AMAR', 'ASSIM', 'SBACEM', 'Não tenho certeza', 'Ainda não sou filiado'])

      function removeMusic(e){
        let index = state.lista_musicas.indexOf(`${e}`);
            index !== -1 && state.lista_musicas.splice(index,1);
            setState({...state, lista_musicas: state.lista_musicas})
          }
          
          function removeSociais(e){
            let index = state.redes_sociais.indexOf(`${e}`);
            index !== -1 && state.redes_sociais.splice(index,1);
            setState({...state, redes_sociais: state.redes_sociais})
      }

      let notificationAlert = useRef();

      const notify = (place, message) => {
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
        notificationAlert.current.notificationAlert(options);
      }


    const handleSubmit = async e => {
        e.preventDefault();
        const { nome, email, cpf, telefone, nome_artistico, associacao } = state;
        if (!nome || !email) {
            setState({...state, error: "Preencha nome e e-mail e senha para continuar!" });
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
                notify("tc", "Enviado com Sucesso!")
        } catch (err) {
            console.log(JSON.stringify(err))
            notify("tc", "Houve um problema com o envio, verifique os campos.")
        }
        }
    }
    return (
      <div className="content">
        <Container >
        <Form onSubmit={handleSubmit}>
          <NotificationAlert ref={notificationAlert} />
          <h1>Dados do Artista</h1>    
          <FormGroup className="mb-4">
            <Label>Nome</Label>
            <Input type="text" name="nome" placeholder="Nome do artista" />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label>CPF:</Label>
            <Input type="text" name="cpf" placeholder="999.999.999-99" />
            <FormText color="muted">
              Facultativo, mas ajuda para evitar homônio
            </FormText>
          </FormGroup>
          <FormGroup className="mb-4">
            <Label>Nome Artístico, Banda ou Coletivo:</Label>
            <Input type="text" name="nome_banda" placeholder="Nome da banda ou artista" />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label>É vinculado a alguma associação do ECAD (Abramus, UBC, etc) ?:</Label>
            <div className="d-flex flex-column">
              {association.map( e => 
                <RadioInput value={e} key={e} control={<Checkbox color="default"/>} label={e} />
              )}
            </div>
          </FormGroup>
          <FormControl className="mb-4 w-100">
            <Label className="mb-3">Redes sociais:</Label>
            <InputButtom
              value={sociais}
              onChange={ async e => setSociais(e.target.value)}
              placeholder="@musica123_"
              id="filled-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={ () => setState({...state, redes_sociais: [...state.redes_sociais, sociais]}) }
                  >
                  <img src={AddCircle} alt="add" />
                  </IconButton>
                </InputAdornment>
              } 
            />
            <div className="w-100 d-flex row mx-auto">
            {state.redes_sociais.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeSociais(r)} title="Remover">x</CloseTag></TagLabel>))}
          </div>
          </FormControl>
          <FormControl className="mb-4 w-100">
            <Label className="mb-0">Lista de Músicas:</Label>
            <FormText className="mb-3" color="muted">
            Inserir nome das músicas e links para identificação (youtube, spotify, deezer, etc)<br />
            Ex.: "Nome da Música" - [inserir link do youtube]
            </FormText>
            <InputButtom
              value={musicas}
              onChange={ async e => setMusicas(e.target.value)}
              placeholder="Nome da música"
              id="filled-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={ () => setState({...state, lista_musicas: [...state.lista_musicas, musicas]}) }
                  >
                  <img src={AddCircle} alt="add" />
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className="w-100 d-flex row mx-auto">
            {state.lista_musicas.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeMusic(r)} title="Remover">x</CloseTag></TagLabel>))}
          </div>
          </FormControl>
          <FormGroup className="mb-4">
          <FormGroup>
            <RadioInput control={<Checkbox color="default"/>} label={'Aceito receber novidades e contato da LA Music por e-mail'} />
            <RadioInput control={<Checkbox color="default"/>} label={'Aceito os Termos de Uso e Política de privacidade'} />
          </FormGroup>
          </FormGroup>
          <FormGroup className="mb-4">
            <Button className="submit">Finalizar</Button>
          </FormGroup>
          </Form>
        </Container>
      </div>
  )
}
export default Index;
