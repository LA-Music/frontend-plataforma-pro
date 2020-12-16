import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Modal from 'components/Modal';
import Obras from './Obras'
import Fonogramas from './Fonogramas'
import { Container } from './styles'

const ViewDadosCadastrais = ({data}) => {
  console.log(data)
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Container>
      <div className="row">
        <div className="w-100 mx-2 mb-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Resultado de {data.nome}</h5>
        </div>
          <Nav tabs>
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
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Obras {...data} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Fonogramas {...data} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
      </div>
    </Container>
  )
}

export const DadosCadastrais = ({show, data, toggle}) => {

  return <Modal show={show} body={<ViewDadosCadastrais data={data} />} toggle={toggle} />

}
