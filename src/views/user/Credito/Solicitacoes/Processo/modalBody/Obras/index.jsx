import React from 'react';

import { Container } from './styles';

function Obras(props) {
  return (
    <Container>
      {props.obras.length > 0 ? props.obras.map( obra => 
        <div className="my-3">
          <p>cód Ecad {obra.codEcad}</p>
          <ul>
            <li><b>Título:</b> {obra.titulo} </li>
            <li><b>Interprete:</b> {obra.interprete} </li>
            <li><b>Competencia:</b> {obra.competencia} </li>
            <li><b>Faixa:</b> {obra.faixa}</li>
            <li><b>Motivo:</b> {obra.motivo} </li>
            <li><b>Execução:</b> {obra.execucao} </li>
            <li><b>Autores:</b> {obra.autores} </li>
          </ul>
        </div>
      ) :  
        <div className="my-3">
          <p>Nenhuma obra encontrada</p>
        </div>
      }
    </Container>
  );
}

export default Obras;