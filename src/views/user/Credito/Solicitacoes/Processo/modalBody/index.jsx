import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Modal from 'components/Modal';
import { Button } from 'components/Button';

import Obras from './Obras'
import Fonogramas from './Fonogramas'

import { Container } from './styles'

const ViewDadosCadastrais = ({data}) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
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
        <Button className="bg-green"> Salvar</Button>
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
