import React from 'react'
import { logout } from 'services/auth'
import store from 'store'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux'

export const validToken = async (res) => {

    if (res.data.message && (res.data.message === "Token is not valid" || res.data.message === 'Auth token is not supplied')) {
        
       store.dispatch({type: 'SET_SETTINGS', payload: { expired: true}})
        return false
        
    }
    return true
    
}

export const Message = () => {
    const dispatch = useDispatch()
    const { settings } = useSelector(state => state)

    async function confirm() {
       await dispatch({type: 'SET_SETTINGS', payload: { expired: false}})
       logout()
       window.location.href = '/'
    }

    return (
        <Modal isOpen={settings.expired} >
            <ModalHeader>Sessão expirada</ModalHeader>
            <ModalBody>
                Por favor, efetue o login novamente!
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={confirm} >Ok</Button>{' '}
            </ModalFooter>
        </Modal>
    )
}


export const ErrorSystem = async ()  => {
    
    await store.dispatch({type: 'SET_SETTINGS', payload: { message: {
        title: 'Desculpe!',
        description: 'Estamos normalizando nossos serviços, tente novamente em alguns instantes',
        active: true
      }}})
}

export const MessageGeral = () => {

    const dispatch = useDispatch()
    const { settings } = useSelector(state => state)

    async function confirm() {
       await dispatch({type: 'SET_SETTINGS', payload: { message: {active: false}}})
    }

    return (
        <Modal isOpen={settings.message.active} >
            <ModalHeader>{settings.message.title}</ModalHeader>
            <ModalBody>
                {settings.message.description}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={confirm} >Ok</Button>{' '}
            </ModalFooter>
        </Modal>
    )
}