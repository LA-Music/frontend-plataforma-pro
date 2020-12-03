import React, { useState } from 'react'
import Perfis from './Perfis'
import Processo from './Processo'
import { TableContainer, ButtonConsulta } from './styles';

export default function Index(props) {
  const [ perfil, setPerfil ] = useState()
  const [ showTable, setShowTable ] = useState(0)

  const selectPerfil = async e => {
    console.log(e)
    await setPerfil(e)
    await setShowTable(1)
  } 

  return (
    <div className="content">
      {showTable === 1 && <ButtonConsulta onClick={() => setShowTable(0)} className="mb-3">voltar</ButtonConsulta> }
      <TableContainer>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h2 className="m-0">
            { showTable === 0 && 
              <span>Perfil</span> 
            }
            { showTable === 1 && 
              <span>Processos</span> 
            }
          </h2>  
          <ButtonConsulta onClick={() => props.handleView('consulta')}>Nova Consulta</ButtonConsulta>
        </div>
        {showTable === 0 &&
          <Perfis selectPerfil={e => selectPerfil(e) } />
        }
        {showTable === 1 &&
          <Processo perfil={perfil} />
        }
      </TableContainer>
    </div>
  )
}
