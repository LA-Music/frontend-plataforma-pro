import React, { useState, useRef  } from "react";
import NotificationAlert from "react-notification-alert";
import { Button, FormText, Label ,FormGroup, Form, Input } from "reactstrap";
import { Checkbox, Radio, InputAdornment, IconButton, FormControl, RadioGroup } from '@material-ui/core'
import api from 'services/api'
import { getEmail } from 'services/auth'
import { cpfMask } from 'components/Mask'
import AddCircle from 'assets/img/addCircle.svg'
import { Container, RadioInput, InputButtom, TagLabel, CloseTag, ButtonConsulta } from './styles'

function Index (props) {
    let notificationAlert = useRef();
    const initial_state = {
      nome: "",
      email: getEmail(),
      cpf:"",
      telefone:"",
      nome_artistico:[],
      associacao:"",
      error: "",
      lista_musicas: [],
      redes_sociais: [],
      visible:true,
      termos: false,
      newsletter: false 
    }
    const initial_musica = ''
    const initial_sociais = ''
    const initial_nome_artistico = ''
    const [ state, setState ] = useState(initial_state);

    const [ nomeArtistico, setNomeArtistico ] = useState(initial_nome_artistico)
    const [ musicas, setMusicas ] = useState(initial_musica)
    const [ sociais, setSociais ] = useState(initial_sociais)
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

    function removeArtista(e){
      let index = state.nome_artistico.indexOf(`${e}`);
      index !== -1 && state.nome_artistico.splice(index,1);
      setState({...state, nome_artistico: state.nome_artistico})
    }
      

      const notify = (place, message, color) => {
        // var color = Math.floor(Math.random() * 5 + 1);
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

        const { nome, email, cpf, telefone, nome_artistico, associacao, lista_musicas, redes_sociais } = state;
        if (!nome) {
            notify("tc", "Preencha nome e e-mail para continuar", 3)
            setState({...state, error: "Preencha nome para continuar!" });
        } else {
          try {
              await api.post("/credito-retido", {
                  nome,
                  email,
                  cpf,
                  telefone,
                  nome_artistico,
                  associacao,
                  lista_musicas,
                  redes_sociais
              }).then(r => {
                if (r.data.msg === 'ok'){
                  notify("tc", `Consulta realizada com sucesso`, 2)

                  setState(initial_state);
                  setMusicas(initial_musica)
                  setSociais(initial_sociais)
                }})
              .catch((error) => {
                if(error.response && error.response.status === 400) {
                  notify("tc", error.response.data.creditomessage || error, 3)
                }else {
                  notify("tc", error.response.data.message || error, 3)
                }
              })
          } catch (err) {
            notify("tc", "Houve um problema com o envio, verifique os campos.", 3)
          }
        }
    }
    return (
      <div className="content">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <ButtonConsulta onClick={() => props.handleView('solicitacao')}>Lista de Solicitações</ButtonConsulta>
        </div>
        <Container >
          <Form onSubmit={e => handleSubmit(e)}>
            <NotificationAlert ref={notificationAlert} />
            <p>{state.error}</p>
            <h1>Dados do Artista</h1>    
            <FormGroup className="mb-4">
              <Label>Nome</Label>
              <Input type="text" value={state.nome} onChange={e =>  setState({...state, nome: e.target.value})} name="nome" placeholder="Nome do artista" />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label>CPF:</Label>
              <Input type="text" name="cpf" value={state.cpf} onChange={ e => setState({...state, cpf: cpfMask(e.target.value)})} placeholder="999.999.999-99" />
              <FormText color="muted">
                Facultativo, mas ajuda para evitar homônio
              </FormText>
            </FormGroup>
            <FormControl className="mb-4 w-100">
              <Label className="mb-3">Nome Artístico, Banda ou Coletivo:</Label>
              <InputButtom
                value={nomeArtistico}
                onChange={ async e => setNomeArtistico(e.target.value)}
                placeholder="Nome da banda ou artista"
                id="filled-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={ () => {
                        nomeArtistico && setState({...state, nome_artistico: [...state.nome_artistico, nomeArtistico]}) 
                        nomeArtistico && setNomeArtistico(initial_nome_artistico)}}
                    >
                    <img src={AddCircle} alt="add" />
                    </IconButton>
                  </InputAdornment>
                } 
              />
              <div className="w-100 d-flex row mx-auto">
              {state.nome_artistico.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeArtista(r)} title="Remover">x</CloseTag></TagLabel>))}
            </div>
            </FormControl>
            <FormGroup className="mb-4">
              <Label>É vinculado a alguma associação do ECAD (Abramus, UBC, etc) ?:</Label>
              <RadioGroup name="associado" value={state.associacao} onChange={e => setState({...state, associacao: e.target.value})} >
                {association.map((ass, index) => (
                  <RadioInput value={ass} key={index} control={<Radio color="default"/>} label={ass} />
                ))}
              </RadioGroup>
            </FormGroup>
            <FormControl className="mb-4 w-100">
              <Label className="mb-3">Redes sociais:</Label>
              <InputButtom
                value={sociais}
                onChange={ async e => setSociais(e.target.value)}
                placeholder="@rede_social"
                id="filled-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={ () => {
                        sociais && setState({...state, redes_sociais: [...state.redes_sociais, sociais]}) 
                        sociais && setSociais(initial_sociais)}}
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
                      onClick={ () => {
                        musicas && setState({...state, lista_musicas: [...state.lista_musicas, musicas]}) 
                        musicas && setMusicas(initial_musica)}}
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
              <RadioInput 
                control={<Checkbox 
                  color="default"
                  checked={state.newsletter}
                  onChange={() => setState({...state, newsletter: !state.newsletter })}
                />} 
                label={'Aceito receber novidades e contato da LA Music por e-mail'} />
              <RadioInput 
                control={<Checkbox 
                  color="default"
                  checked={state.termos}
                  onChange={() => setState({...state, termos: !state.termos})}
                />} 
                label={'Aceito os Termos de Uso e Política de privacidade'} />
            </FormGroup>
            </FormGroup>
            <FormGroup className="mb-4">
              <Button type="submit" disabled={!state.termos} className="submit">Finalizar</Button>
            </FormGroup>
            </Form>
          </Container>
      </div>
  )
}
export default Index;
