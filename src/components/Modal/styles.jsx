import styled from 'styled-components';


import { Modal } from 'reactstrap';

export const ModalContainer = styled(Modal)`
  width: 900px;
  max-width: 90%;

    position: relative;

    .close {
        cursor: pointer;
        width: fit-content;

        position: absolute;
        right: 10px;
        top: 10px;
    }


    .tab-pane {
        width: 95%;
        margin: auto; 

        .row {
            > div {
                padding: 0;
            }
        }
    }
`;
