import React, { useEffect, useState } from 'react';

import { Button } from 'reactstrap';
import { credito_retido } from 'services/endpoint'

import DynamicTable from 'components/Table';
import { Load } from 'components/PreLoad'
import { phoneMask, cpfMask } from 'components/Mask'

import { validToken, ErrorSystem } from 'utils'
import { BtnEngage } from './styles';

function Perfis({ selectPerfil }) {

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
                  {/* <Button title="Contratar artista" >
                    Liberar Retido
                  </Button> */}
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
        // limitItems={10} 
        {...Table} />
      </>
      :
      <Load bg={'#000'}/>
  )
}

export default Perfis;