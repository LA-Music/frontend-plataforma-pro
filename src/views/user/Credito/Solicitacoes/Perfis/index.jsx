import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { contratar, credito_retido } from 'services/endpoint'
import DynamicTable from 'components/Table';

import { phoneMask, cpfMask } from 'components/Mask'
import { BtnEngage } from './styles';

function Perfis({ selectPerfil }) {
  const [ modal, setModal ] = useState(false);
  const [ dataPerfil, setDataPerfil ] = useState(false)
  
  const [ confirmed, setConfirmed ] = useState(false)

  const toggle = async (perfil) => {
    await setDataPerfil(perfil)
    setModal(!modal)
  };

  const [Table, setTable] = useState({
    header:[
      { name: 'Nome',           key: 'name'          }, 
      { name: 'E-mail',         key: 'email'         }, 
      { name: 'CPF',            key: 'cpf'           }, 
      { name: 'Nome Artístico', key: 'nameArtistico' },
      { name: 'Telefone',       key: 'telefone'      },
      { name: 'Associação',     key: 'associacao'    },
      { name: 'Ação',           key: 'action'        },
    ],
    body:[]
  })

  const engaged = async () => {
    contratar.register({nome: dataPerfil.nome, cpf: dataPerfil.cpf}).then( async res => {
      if (res.statusText === 'OK') {
        await setConfirmed(true)
        setTimeout(() => {
          toggle()
        }, 5000);
      }
    })
  }

  useEffect(() => {
    credito_retido.find().then( async res => {
      if (res.data.length > 0 ) {
        var arrPerfil = res.data.map(item=>{
          return [item.nome,item]
        }); 

        var mapPerfil = new Map(arrPerfil); 
        var perfil = [...mapPerfil.values()];

        let body = []
        perfil.map( async process => 
          body.push({
            name: process.nome, 
            email: process.email, 
            cpf: cpfMask(process.cpf), 
            nameArtistico: process.nome_artistico, 
            telefone: process.telefone ? phoneMask(process.telefone) : '--',
            associacao: process.associacao || '--',
            action: (
              <div className="d-flex justify-content-center">
                <BtnEngage onClick={() => toggle(process)}>Contratar</BtnEngage>
                <BtnEngage onClick={() => selectPerfil(process)}>Ver</BtnEngage>
              </div>
            ),
          })
        )
        await setTable({...Table, body: body })
      }
    })

  }, []) //eslint-disable-line

  return (
    Table.body.length > 0 && 
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
            <ModalHeader toggle={toggle}>Aguarde ...</ModalHeader> 
          }
          <ModalBody>
            {!confirmed ? (
              <p>Tem certeza que deseja contratar {dataPerfil && dataPerfil.nome} ?</p>
            ) : (
              <p>Sua solicitação foi encaminhada, logo entraremos em contato.</p>
            )}
          </ModalBody>
          {!confirmed && 
            <ModalFooter>
              <Button color="primary" onClick={() => engaged()}>Contratar</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          }
        </Modal>
      </>
  )
}

export default Perfis;