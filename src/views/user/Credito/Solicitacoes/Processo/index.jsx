import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { 
  Modal as ModalConfimed, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from 'reactstrap'

import api from 'services/api'
import { validToken, ErrorSystem } from 'utils'

import { Button } from 'components/Button';
import DynamicTable from 'components/Table';
import { Load } from 'components/PreLoad'

import { DadosCadastrais } from './modalBody';


import { BtnEngage } from './styles';

function Processo({perfil}) {
  const { modal } = useSelector(state => state)

  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)

  const [loading, setLoading] = useState(false)


  const handleToggle = e => {
    setToggle(!toggle)
    !toggle === true && setSelectRow(e)
  }

  const [Table, setTable] = useState({
    header:[
      { name: 'Nome',        key: 'nome'             }, 
      { name: 'Email',       key: 'email'            }, 
      { name: 'Associado',   key: 'associado'        },
      { name: 'Status Obra', key: 'status'           },
      { name: 'Status Fono', key: 'status_fonograma' },
      { name: 'Ação',        key: 'action'           }
    ],
    body:[]
  })

  useEffect(() => {
    getProcess()
   async function getProcess () {
      await setLoading(true)
      api.get("/processo").then( async res => {
        
        if(!res) {
          ErrorSystem()
        
          return false
        }

        await validToken(res)

        if (res.data.length > 0 ) {

          let body = []
          res.data.map( async process => 
            process.nome === perfil.nome && 
              body.push({
                nome: process.nome, 
                email: process.email, 
                associado: process.cadastro_Abrammus ? 'Sim' : 'Não', 
                action: (
                  <div className="d-flex justify-content-center">
                    <BtnEngage onClick={() => handleToggle(process)}>Ver</BtnEngage>
                  </div>
                ),
                ...process
            })
            )
            
          await setTable({...Table, body: body })
          await setLoading(false)
        }
      })
    }

  }, []) //eslint-disable-line
  
  return (
    !loading ?
      <>
        <DynamicTable 
          viewModal={handleToggle} 
          moreItems={5} 
          limitItems={10} 
          {...Table} 
        />

        <DadosCadastrais 
          show={toggle} 
          data={selectRow} 
          toggle={e => handleToggle(!toggle)} 
        />

        <ModalConfimed isOpen={modal.confirmContrato}>   
          <ModalHeader >
            {/* {!confirmed ? 'Deseja contratar ?' : 'Salve!'} */}
          </ModalHeader>

          <ModalBody>
            {/* {!confirmed ? (
              <p>Deseja que a LA Music faça a liberação de créditos retidos junto ao Ecad em nome do (a)  ?</p>
            ) : (
            )} */}
              <p>Um de nossos agentes entrará em contato contigo para que possamos negociar os termos da nossa parceria.
              Trabalhamos com um percentual sobre o valor que efetivamente conseguimos resgatar e considerando o número de artistas do seu catálogo, teremos uma condição especial para sua editora.</p>
          </ModalBody>
          
          {/* {!confirmed 
            ? 
              <ModalFooter>
                <Button color="primary" onClick={() => ''}> 
                  {loading ? <> Aguarde  <i class="fa fa-spinner fa-spin" /> </> : 'Contratar' }
                </Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
              </ModalFooter>
            : 
          } */}
              <ModalFooter>
                {/* <Button color="primary" onClick={() => toggleModal()}>Fechar</Button>{' '} */}
              </ModalFooter>
        </ModalConfimed>
      </>
    : <Load bg={'#000'} />
  );
}

export default Processo;