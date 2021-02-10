import React, { useState, useRef  } from "react";
import NotificationAlert from "react-notification-alert";
import { Button, FormText, Label ,FormGroup, Form, Input,  Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import { Checkbox, Radio, InputAdornment, IconButton, FormControl, RadioGroup } from '@material-ui/core'

import { cpfMask } from 'components/Mask'

import AddCircle from 'assets/img/addCircle.svg'

import { removeMusic, removeSociais, removeArtista, handleSubmit, initial_state, initial_musica, initial_sociais, initial_nome_artistico, enableSubmit } from './actions'

import { Container, RadioInput, InputButtom, TagLabel, CloseTag, ButtonConsulta, SpanCheck, ButtonGreen } from './styles'

function Index (props) {
    let notificationAlert = useRef();
    
    const [ state, setState ] = useState(initial_state);

    const [ nomeArtistico, setNomeArtistico ] = useState(initial_nome_artistico)
    const [ musicas, setMusicas ] = useState(initial_musica)
    const [ sociais, setSociais ] = useState(initial_sociais)
    const [ modalSuccess, setModalSucess] = useState(false)
    const [ association ] = useState(['ABRAMUS', 'UBC', 'SOCIMPRO', 'SICAM', 'AMAR', 'ASSIM', 'SBACEM', 'Não tenho certeza', 'Ainda não sou filiado'])

    const clearForm = async () => {

      await setState(initial_state);
      await setMusicas(initial_musica)
      await setSociais(initial_sociais)
      await setModalSucess(false)
    }
      
    return (
      <div className="content">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <ButtonConsulta onClick={() => props.handleView('solicitacao')}>Lista de Solicitações</ButtonConsulta>
        </div>
        <Container >
          <Form onSubmit={e => handleSubmit(e, setNomeArtistico, state, nomeArtistico, musicas, sociais, association, setMusicas, setSociais, setState, notificationAlert, setModalSucess)}>
            <NotificationAlert ref={notificationAlert} />
            <p>{state.error}</p>
            <h1>Dados do Artista</h1>    
            <FormGroup className="mb-4">
              <Label>Nome</Label>
              <Input 
                type="text" 
                value={state.nome} 
                onChange={e =>  setState({...state, nome: e.target.value})} 
                name="nome" 
                placeholder="Nome do artista" />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label>CPF:</Label>
              <Input 
                type="text" 
                name="cpf" 
                value={state.cpf} 
                onChange={ e => setState({...state, cpf: cpfMask(e.target.value)})} 
                placeholder="999.999.999-99" />
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
                      onClick={ async () => {
                        nomeArtistico && await setState({...state, nome_artistico: [...state.nome_artistico, nomeArtistico]}) 
                        nomeArtistico && setNomeArtistico(initial_nome_artistico)}}
                    >
                    <img src={AddCircle} alt="add" />
                    </IconButton>
                  </InputAdornment>
                } 
              />
              <div className="w-100 d-flex row mx-auto">
                
              {state.nome_artistico.length > 0 && state.nome_artistico.map( (r, key) => (
                <TagLabel className="my-3 mr-3" key={key}>
                  {r}<CloseTag onClick={e => removeArtista(r, state, setState)} title="Remover">x</CloseTag>
                </TagLabel>
              ))}
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
              {state.redes_sociais.map( (r, key) => (
                <TagLabel className="my-3 mr-3" key={key}>
                  {r}<CloseTag onClick={e => removeSociais(r, state, setState)} title="Remover">x</CloseTag>
                </TagLabel>
              ))}
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
              {state.lista_musicas.map( (r, key) => (
                <TagLabel className="my-3 mr-3" key={key}>
                  {r}<CloseTag onClick={e => removeMusic(r, state, setState)} title="Remover">x</CloseTag>
                </TagLabel>
              ))}
            </div>
            </FormControl>
            <FormGroup className="mb-4">
            <FormGroup>
              <RadioInput 
                control={<Checkbox 
                  color="default"
                  checked={state.acept_contact}
                  onChange={() => setState({...state, acept_contact: !state.acept_contact })}
                />} 
                label={'Aceito receber contato da LA Music por e-mail'} />
              <RadioInput 
                style={{color: '#fff'}}
                control={
                  <SpanCheck style={{color: '#fff'}}>
                    <Checkbox 
                      color="default"
                      checked={state.termos}
                      onChange={() => setState({...state, termos: !state.termos})}
                    />
                    Aceito os&nbsp; <a without rel="noopener noreferrer" href="https://www.lamusic.com.br/termos-de-uso/" target="_blank"> Termos de uso</a> &nbsp; e  &nbsp; <a without rel="noopener noreferrer" target="_blank" href="https://www.lamusic.com.br/politica-de-privacidade/">Política de privacidade</a>
                  </SpanCheck>
              } />
            </FormGroup>
            </FormGroup>
            <FormGroup className="mb-4">
              <Button type="submit" disabled={enableSubmit(state)} className="submit">
                {state.loading ? 
                  <> 
                    Finalizando <i class="fa fa-spinner fa-spin" /> 
                  </> : 'Finalizar'
                }
              </Button>
            </FormGroup>
            </Form>

            <Modal isOpen={modalSuccess} >
              <ModalHeader>Solicitação realizada com sucesso!</ModalHeader>
              <ModalBody>
                <p>Consulta de créditos retidos junto ao ECAD em processamento.</p>
                <p>Estamos realizando levantamento junto às Associações sobre a existência de Créditos de Direito Autoral (composições) e Conexos (interpretação) 
                  vinculados ao nome/CPF do artista <b>{state.nome_artistico.length > 0 && state.nome_artistico.join(', ')}</b>.</p>
                <p>Em até 2 (dois) dias úteis, você receberá um e-mail com o resultado desta pesquisa e com a situação das músicas que detalhou na sua consulta.</p>
              </ModalBody>
              <ModalFooter>
                  <ButtonGreen color="primary" onClick={clearForm} >Fechar</ButtonGreen>{' '}
              </ModalFooter>
            </Modal>
          </Container>
      </div>
  )
}
export default Index;
