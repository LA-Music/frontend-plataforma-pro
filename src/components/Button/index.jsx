import React from 'react';
import { Btn } from './styles';

export const Button = ({className, children}) => {
    return (
        <Btn className={className}>
            {children}
        </Btn>
    );
}

