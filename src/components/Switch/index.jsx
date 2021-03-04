import React from 'react';

import { Label } from './styles';

const Switch = ({children}) => {
    return (
        <div className="d-flex flex-column-reverse align-items-center">
            <Label>
                <input type="checkbox" />
                <span className="slider"></span>
            </Label>
            {children}
        </div>
    );
}

export default Switch;
