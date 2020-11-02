import styled from 'styled-components';

export const TableContainer = styled.div`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  padding: 1.5rem;
  
  h2{
    font-size: 20px;
    font-weight: 600 !important;
    font-style: normal;
    color: #000000;
  }

  span{
    font-size: 14px;
    font-weight: 600 !important;
    font-style: normal;
  }

  thead{
    tr{
      border-bottom: 1px solid #EDEDED;
      th{
        font-style: normal;
        font-weight: 600 !important;
        font-size: 14px;
        
        text-transform: initial !important;
        color: #66615B;
        padding-bottom: 0;
      }
    }
  }

  tbody{
    tr{
      td{
        color: #000000;
        font-weight: 500 !important;
      }
    }
  }
`;