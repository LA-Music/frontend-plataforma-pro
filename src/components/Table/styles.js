import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  table {
    min-width: 900px;
  }

  tr {
    cursor: pointer;
  }

  .table-footer {
    button {
      border: none;
      background: transparent;

      margin-left: 16px;
      font-size: 20px;
    }
  }
`;

export const MoreItems = styled.button`
  color: #66615B;
  font-size: 14px;
  font-weight: 600;

  background-color: transparent;
  border: none;
`;