import React from 'react';

import { Label } from './styles';

const Switch = ({onChange, children}) => {
    return (
        <div className="d-flex flex-column-reverse align-items-center">
            <Label>
                <input type="checkbox" onChange={onChange}/>
                <span className="slider"></span>
            </Label>
            {children}
        </div>
    );
}

export default Switch;
