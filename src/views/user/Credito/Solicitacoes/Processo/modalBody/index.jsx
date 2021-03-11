import React, { useState } from 'react';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import classnames from 'classnames';

import Modal from 'components/Modal';
import { Button } from 'components/Button';

import Obras from './Obras'
import Fonogramas from './Fonogramas'


import { Container } from './styles'

const ViewDadosCadastrais = ({data}) => {
  
  const dispatch = useDispatch();

  const { obras, fonograma } = useSelector(state => state);

  const [ activeTab, setActiveTab ] = useState('obras');
 

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }


  function save() {

    switch (activeTab) {
      case 'obras': { 
        if (obras.autoria.length > 0) {
          dispatch({
            type: 'SET_MODAL', 
            payload: { 
              valid: {
                show: true, 
                from: 'obras',
                processo: data._id
              } 
            }
          })

          return false
        }

        dispatch({
          type: 'SET_MODAL', 
          payload: { 
            confirmContrato: {
              show: true, 
              from: 'obras',
              processo: data._id
            } 
          }
        })

        break;
      }
      case 'fonogramas': {
        console.log(fonograma)
        if (fonograma.parte.length > 0) {
          dispatch({
            type: 'SET_MODAL', 
            payload: { 
              valid: {
                show: true, 
                from: 'fonogramas',
                processo: data._id
              } 
            }
          })

          return false
        }

        dispatch({
          type: 'SET_MODAL', 
          payload: { 
            confirmContrato: {
              show: true, 
              from: 'fonogramas',
              processo: data._id
            } 
          }
        })
       
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
              className={classnames({ active: activeTab === 'obras' })}
              onClick={() => { toggle('obras'); }}
            >
              Obras
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'fonogramas' })}
              onClick={() => { toggle('fonogramas'); }}
            >
              Fonogramas
            </NavLink>
          </NavItem>
        </Nav>
          
        <TabContent className="scroll-custom" activeTab={activeTab}>
          <TabPane tabId="obras">
            <Obras {...data} />
          </TabPane>
        
          <TabPane tabId="fonogramas">
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

  console.log(data)
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