import React from 'react';

import { Badge, Limit } from './styles';

function CardKanban(props) {

  return (
    <div onClick={() => props.toggle()} className="py-3" style={{borderBottom: '1px solid #EDEDED', cursor: 'pointer'}}>
      <h4 className="m-0">{props.product}</h4>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col px-0">
          <p>{props.name}</p>
          <p>{props.cpf}</p>
        </div>
        <div className="col pl-0 d-flex align-items-end justify-content-center flex-column">
          <Badge>{props.status}</Badge>
          <div className="d-flex justify-content-end mt-1 align-items-center pl-5 pr-2 w-100">
            <Limit color="#0FBB00">1D</Limit>
            <span>FOTO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardKanban;