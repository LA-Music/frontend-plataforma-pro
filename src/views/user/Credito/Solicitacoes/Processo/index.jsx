import React, { useState, useEffect } from 'react';
import DynamicTable from 'components/Table';
import api from 'services/api'
import { DadosCadastrais } from './modalBody';

import { validToken } from 'utils'

import { BtnEngage } from './styles';

function Processo({perfil}) {
  const [ toggle, setToggle ] = useState(false)
  const [ selectRow, setSelectRow ] = useState(false)

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

    api.get("/processo").then( async res => {
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
      }
    })

  }, []) //eslint-disable-line

  return (
    <>
      <DynamicTable 
        viewModal={handleToggle} 
        moreItems={5} 
        limitItems={10} 
        {...Table} />

        <DadosCadastrais show={toggle} data={selectRow} toggle={e => handleToggle(!toggle)} />
    </>
  );
}

export default Processo;