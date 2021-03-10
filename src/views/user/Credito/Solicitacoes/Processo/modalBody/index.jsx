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
 

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }


  function save() {
    console.log(data)

    dispatch({type: 'SET_MODAL', payload: { confirmContrato:  true }})
    // switch (activeTab) {
    //   case '1': { // Aba Obras 

    //     const type = {
    //       contratar: function() {
    //         let newObras = []
            
    //         obras.all.forEach(element => {
    //           newObras.push({
    //             _id: element._id,
    //             status: obras.contratar.includes(element._id) ? 'contratado' : element.status
    //           })
    //         });

    //         // api_autoria.register_obras({
    //         //   processo_id: data._id,
    //         //   obras: [
    //         //     ...newObras
    //         //   ]
    //         // })
    //         // .then( async res => console.log(res))
    //         dispatch({type: 'SET_MODAL', payload: { confirmContrato:  true }})
    //       },

    //       autoria: function() {
    //         let newObras = []

    //         obras.all.forEach(element => {
    //           newObras.push({
    //             _id: element._id,
    //             status: obras.autoria.includes(element._id) ? 'ativado' : 'removido'
    //           })
    //         });

    //         // api_autoria.register_obras({
    //         //   processo_id: data._id,
    //         //   obras: [
    //         //     ...newObras
    //         //   ]
    //         // })
    //         // .then( async res => console.log(res))
    //       }
    //     }

    //     const {autoria } = obras;

    //     const typeSave = autoria.length > 0 ? 'autoria' : 'contratar';
    //     type[typeSave]();
        
    //     break;
    //   }
    //   case '2': { // Aba Fonogramas
    //     const type = {
    //       contratar: function() {
    //         let newObras = []
            
    //         fonograma.all.forEach(element => {
    //           newObras.push({
    //             _id: element._id,
    //             status: fonograma.contratar.includes(element._id) ? 'contratado' : element.status
    //           })
    //         });

    //         api_autoria.register_fonograma({
    //           processo_id: data._id,
    //           fonograma: [
    //             ...newObras
    //           ]
    //         })
    //         .then( async res => console.log(res))

    //         dispatch({type: 'SET_MODAL', payload: { confirmContrato:  true }})
    //       },

    //       parte: function() {
    //         let newObras = []
            
    //         fonograma.all.forEach(element => {
    //           newObras.push({
    //             _id: element._id,
    //             status: fonograma.parte.includes(element._id) ? 'ativado' : 'removido'
    //           })
    //         });

    //         console.log(newObras)

    //         api_autoria.register_fonograma({
    //           processo_id: data._id,
    //           obras: [
    //             ...newObras
    //           ]
    //         })
    //         .then( async res => console.log(res))
    //       }
    //     }

    //     const { parte } = fonograma;

    //     const typeSave = parte.length > 0 ? 'parte' : 'contratar';
    //     type[typeSave]();
    //     break;
    //   }
    //   default:
    //     break;
    // }
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