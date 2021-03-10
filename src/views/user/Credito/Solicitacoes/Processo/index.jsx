import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

import { autoria as api_autoria } from 'services/endpoint';

import { BtnEngage } from './styles';

function Processo({perfil}) {
  const dispatch = useDispatch()
  const { modal, obras, fonograma } = useSelector(state => state)

  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)
  const [ confirmedContrato, setConfirmedContrato ] = useState(false)

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

  const confirmContrato = () => {
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
    setConfirmedContrato(true);
    
  }
  
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
            {!confirmedContrato ? 'Deseja contratar ?' : 'Salve!'}
          </ModalHeader>

          <ModalBody>
            {!confirmedContrato ? (
              <p>Deseja que a LA Music faça a liberação de créditos retidos junto ao Ecad em nome do (a) {obras.autores} ?</p>
            ) : (
              <p>Um de nossos agentes entrará em contato contigo para que possamos negociar os termos da nossa parceria.
              Trabalhamos com um percentual sobre o valor que efetivamente conseguimos resgatar e considerando o número de artistas do seu catálogo, teremos uma condição especial para sua editora.</p>
            )}
          </ModalBody>
          
          {!confirmedContrato 
            ? 
              <ModalFooter>
                <Button color="primary" onClick={() => confirmContrato()}> 
                  {loading ? <> Aguarde  <i class="fa fa-spinner fa-spin" /> </> : 'Contratar' }
                </Button>{' '}
                <Button color="secondary" onClick={() => dispatch({type: 'SET_MODAL', payload: { confirmContrato:  false }})}>Cancelar</Button>
              </ModalFooter>
            : 
              <ModalFooter>
                <Button color="primary" onClick={() => dispatch({type: 'SET_MODAL', payload: { confirmContrato:  false }})}>Fechar</Button>{' '}
              </ModalFooter>
          }
        </ModalConfimed>
      </>
    : <Load bg={'#000'} />
  );
}

export default Processo;