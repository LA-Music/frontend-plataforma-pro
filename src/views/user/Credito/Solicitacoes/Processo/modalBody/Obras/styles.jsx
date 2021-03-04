import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin-bottom: 0;
    }

  }
  
 > div {
    border-bottom: 1px solid #dee2e6;
    width: 100%;
  
    ul {
      margin-top: 16px;
      width: 100% !important;
      list-style: none;
    }
  }
`;
