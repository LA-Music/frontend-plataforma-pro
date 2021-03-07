import React from 'react';
import { Btn } from './styles';

export const Button = ({onClick, className, children}) => {
    return (
        <Btn
            onClick={onClick}
            className={className}
        >
            {children}
        </Btn>
    );
}

