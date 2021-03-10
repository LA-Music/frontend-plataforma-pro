import React, { useState } from 'react';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Modal as ModalConfimed, 
  ModalHeader, 
  ModalBody, 
  ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import classnames from 'classnames';

import Modal from 'components/Modal';
import { Button } from 'components/Button';

import Obras from './Obras'
import Fonogramas from './Fonogramas'

import { autoria as api_autoria } from 'services/endpoint';

import { Container } from './styles'

const ViewDadosCadastrais = ({data}) => {
  
  const dispatch = useDispatch();

  const { obras, fonograma } = useSelector(state => state);

  const [ activeTab, setActiveTab ] = useState('1');
  const [ confirmed, setConfirmed ] = useState(false)
  const [ dataPerfil, setDataPerfil ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  
  const [ modal, setModal ] = useState(true);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const toggleModal = async (perfil) => {
    // await setDataPerfil(perfil)
    setConfirmed(false)
    setModal(!modal)
  };

  function save() {
    switch (activeTab) {
      case '1': { // Aba Obras 

        const type = {
          contratar: function() {
            let newObras = []
            
            obras.all.forEach(element => {
              newObras.push({
                _id: element._id,
                status: obras.contratar.includes(element._id) ? 'contratado' : element.status
              })
            });

            // api_autoria.register_obras({
            //   processo_id: data._id,
            //   obras: [
            //     ...newObras
            //   ]
            // })
            // .then( async res => console.log(res))
            dispatch({type: 'SET_MODAL', payload: { confirmContrato:  true }})
          },

          autoria: function() {
            let newObras = []

            obras.all.forEach(element => {
              newObras.push({
                _id: element._id,
                status: obras.autoria.includes(element._id) ? 'ativado' : 'removido'
              })
            });

            // api_autoria.register_obras({
            //   processo_id: data._id,
            //   obras: [
            //     ...newObras
            //   ]
            // })
            // .then( async res => console.log(res))
          }
        }

        const {autoria } = obras;

        const typeSave = autoria.length > 0 ? 'autoria' : 'contratar';
        type[typeSave]();

        ConfirmContratacao({
          toggleModal, 
          confirmed, 
          setConfirmed,
          modal: true,
          setModal,
          dataPerfil,
          loading
        })
        
        break;
      }
      case '2': { // Aba Fonogramas
        const type = {
          contratar: function() {
            let newObras = []
            
            fonograma.all.forEach(element => {
              newObras.push({
                _id: element._id,
                status: fonograma.contratar.includes(element._id) ? 'contratado' : element.status
              })
            });

            api_autoria.register_fonograma({
              processo_id: data._id,
              fonograma: [
                ...newObras
              ]
            })
            .then( async res => console.log(res))
          },

          parte: function() {
            let newObras = []
            
            fonograma.all.forEach(element => {
              newObras.push({
                _id: element._id,
                status: fonograma.parte.includes(element._id) ? 'ativado' : 'removido'
              })
            });

            console.log(newObras)

            api_autoria.register_fonograma({
              processo_id: data._id,
              obras: [
                ...newObras
              ]
            })
            .then( async res => console.log(res))
          }
        }

        const { parte } = fonograma;

        const typeSave = parte.length > 0 ? 'parte' : 'contratar';
        type[typeSave]();
        break;
      }
      default:
        break;
    }
  }

  return (
    <Container>
      <div className="row">
        <div className="w-100 mx-2 mb-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{data.nome}</h5>
        </div>

        <Nav tabs >
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Obras
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Fonogramas
            </NavLink>
          </NavItem>
        </Nav>
          
        <TabContent className="scroll-custom" activeTab={activeTab}>
          <TabPane tabId="1">
            <Obras {...data} />
          </TabPane>
        
          <TabPane tabId="2">
            <Fonogramas {...data} />
          </TabPane>
        </TabContent>

      </div>
      <div className="footer">
        <Button className="bg-green" onClick={save}> Salvar</Button>
      </div>
      { ConfirmContratacao({
          toggleModal, 
          confirmed, 
          setConfirmed,
          modal: true,
          setModal,
          dataPerfil,
          loading
        })}
    </Container>
  )
}

export const DadosCadastrais = ({show, data, toggle}) => {

  return ( 
    <Modal 
      show={show} 
      body={
        <ViewDadosCadastrais 
          data={data} 
        />
      } 
      toggle={toggle} 
    />
  )
}


export const ConfirmContratacao = ({
  confirmed, 
  setConfirmed, 
  modal, 
  dataPerfil, 
  toggleModal,
  loading
}) => {
 console.log(modal)
 console.log(confirmed)

  return (
    <ModalConfimed>   
      <ModalHeader >
        {!confirmed ? 'Deseja contratar ?' : 'Salve!'}
      </ModalHeader>

      <ModalBody>
        {!confirmed ? (
          <p>Deseja que a LA Music faça a liberação de créditos retidos junto ao Ecad em nome do (a) {dataPerfil && dataPerfil.nome} ?</p>
        ) : (
          <p>Um de nossos agentes entrará em contato contigo para que possamos negociar os termos da nossa parceria.
          Trabalhamos com um percentual sobre o valor que efetivamente conseguimos resgatar e considerando o número de artistas do seu catálogo, teremos uma condição especial para sua editora.</p>
        )}
      </ModalBody>
      
      {!confirmed 
        ? 
          <ModalFooter>
            <Button color="primary" onClick={() => ''}> 
              {loading ? <> Aguarde  <i class="fa fa-spinner fa-spin" /> </> : 'Contratar' }
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
          </ModalFooter>
        : 
          <ModalFooter>
            <Button color="primary" onClick={() => toggleModal()}>Fechar</Button>{' '}
          </ModalFooter>
      }
    </ModalConfimed>
  )
}