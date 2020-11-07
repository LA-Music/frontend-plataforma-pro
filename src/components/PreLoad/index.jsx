import React from 'react'
import { PreLoader } from './styles'
import logoLAMusic from 'assets/img/logo-lamusic.svg'


export const PreLoad = () => {
  return (
    <PreLoader>
      <img src={logoLAMusic} alt="LA Music" />
      <div className="bolas d-flex align-items-center">
        <div></div>
        <div></div>
        <div></div>                    
      </div>
    </PreLoader>
  )
}