import React from 'react'
import { PreLoader } from './styles'
import logoLAMusic from 'assets/img/logo-lamusic.svg'


export const PreLoad = (props) => {
  return (
    <PreLoader bg={props.bg}>
      <img src={logoLAMusic} alt="LA Music" />
      <div className="bolas d-flex align-items-center">
        <div></div>
        <div></div>
        <div></div>                    
      </div>
    </PreLoader>
  )
}

export const Load = (props) => {
  return (
    <PreLoader bg={props.bg}>
      <div className="bolas d-flex align-items-center">
        <div></div>
        <div></div>
        <div></div>                    
      </div>
    </PreLoader>
  )
}

