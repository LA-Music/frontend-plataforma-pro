import styled from 'styled-components';

export const Container = styled.div`

  .tab-content {
    height: 70vh;
    overflow-y: auto;
    width: 100%;

    
  }

  .nav-tabs {
    width: 100%;

    .nav-item {
      .nav-link {
        cursor: pointer;

        color: #66615B;

        &.active {
          font-weight: bold;
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    
    padding: 1.5rem 0;
  }
`;
