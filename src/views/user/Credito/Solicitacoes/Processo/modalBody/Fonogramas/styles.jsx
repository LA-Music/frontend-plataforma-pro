import styled from 'styled-components';

export const Container = styled.div`
  
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
    
    ul {
      width: 100% !important;
      list-style: none;
    }
  }
`;
