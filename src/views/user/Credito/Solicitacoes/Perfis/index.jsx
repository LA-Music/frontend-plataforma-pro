import React, { useEffect, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { contratar, credito_retido } from 'services/endpoint'

import DynamicTable from 'components/Table';
import { Load } from 'components/PreLoad'
import { phoneMask, cpfMask } from 'components/Mask'

import { validToken, ErrorSystem } from 'utils'
import { BtnEngage } from './styles';

function Perfis({ selectPerfil }) {

  const [ modal, setModal ] = useState(false);
  const [ dataPerfil, setDataPerfil ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ confirmed, setConfirmed ] = useState(false)

  const toggle = async (perfil) => {
    await setDataPerfil(perfil)
    setConfirmed(false)
    setModal(!modal)
  };

  const [Table, setTable] = useState({
    header:[
      { name: 'Nome',           key: 'name'          },  
      { name: 'CPF',            key: 'cpf'           }, 
      { name: 'Nome Artístico', key: 'nameArtistico' },
      { name: 'Associação',     key: 'associacao'    },
      { name: 'Ação',           key: 'action'        },
    ],
    body:[]
  })

  const engaged = async () => {
    setLoading(true)
    contratar.register({
      nome: dataPerfil.nome, 
      cpf: dataPerfil.cpf 
    })
    .then( async res => {  
      if(!res) {
        ErrorSystem()
       
        return false
      }

      if (res.statusText === 'OK') {
        await setConfirmed(true)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
   
    credito_retido.find().then( async res => {
      
      if(!res) {
        ErrorSystem()
       
        return false
      }

      await validToken(res)

      if (res.data.length > 0 ) {
        var arrCpf = res.data.map(item=>{
          return [item.cpf,item]
        }); 

        var mapCpf = new Map(arrCpf); 
        var cpf = [...mapCpf.values()];

        let body = []
        cpf.map( async process => 
          body.push({
            name: process.nome, 
            email: process.email, 
            cpf: cpfMask(process.cpf), 
            nameArtistico: process.pseudonimos.join(', '), 
            telefone: process.telefone ? phoneMask(process.telefone) : '-- ',
            associacao: process.associacao || '--',
            action: (
              <div className="d-flex justify-content-center">
                <BtnEngage>
                  <Button title="Contratar artista" onClick={() => toggle(process)}>
                  Liberar Retido
                  </Button>
                  <Button title="Detalhes artista" onClick={() => selectPerfil(process)}>
                    Detalhes
                  </Button>
                </BtnEngage>
              </div>
            ),
          })
        )
        await setTable({...Table, body: body })
      }
    })
  }, []) //eslint-disable-line

  return (
    Table.body.length > 0 ? 
    <>
      <DynamicTable 
        selectPerfil={selectPerfil}
        moreItems={5} 
        limitItems={10} 
        {...Table} />

        <Modal isOpen={modal} toggle={toggle}>
          {!confirmed ? 
            <ModalHeader toggle={toggle}>Deseja contratar ?</ModalHeader>
            : 
            <ModalHeader toggle={toggle}>Salve!</ModalHeader> 
          }
          <ModalBody>
            {!confirmed ? (
              <p>Deseja que a LA Music faça a liberação de créditos retidos junto ao Ecad em nome do (a) {dataPerfil && dataPerfil.nome} ?</p>
            ) : (
              <p>Um de nossos agentes entrará em contato contigo para que possamos negociar os termos da nossa parceria.
              Trabalhamos com um percentual sobre o valor que efetivamente conseguimos resgatar e considerando o número de artistas do seu catálogo, teremos uma condição especial para sua editora.</p>
            )}
          </ModalBody>
          {!confirmed ? 
            <ModalFooter>
              <Button color="primary" onClick={() => engaged()}> 
                {loading ? <> Aguarde  <i class="fa fa-spinner fa-spin" /> </> : 'Contratar' }
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
            : 
            <ModalFooter>
              <Button color="primary" onClick={() => toggle()}>Fechar</Button>{' '}
            </ModalFooter>
            
          }
        </Modal>
      </>
      :
      <Load bg={'#000'}/>
  )
}

export default Perfis;