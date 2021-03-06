import React from 'react';


export const ListItems = ({title, description}) => {
  return (
    <li>
      <b>{title}: </b> 
      {description} 
    </li>
  )
}