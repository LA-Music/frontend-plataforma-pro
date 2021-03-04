import styled from 'styled-components';

export const Label = styled.label`
    position: relative;
    display: inline-block;
    
    width: 60px;
    height: 25px;

    margin-bottom: 0;
    margin-left: auto;
    
    input {
        opacity: 0;
        width: 0;
        height:0;
    }

    .slider {
        position: absolute;
        cursor: pointer;

        border-radius: 34px;

        display: flex;
        align-items: center;
        
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: #ccc;
        transition: .4s;

        &:before {
            position: absolute;
            content: "";
            
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 3px;

            background-color: white;
            transition: .4s;

            border-radius: 50%;
        }
    }

    input:checked + .slider {
        background-color: #4ACCCD;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #4ACCCD;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }


`;
