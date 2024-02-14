import styled from 'styled-components'

export const StatusContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;
  i {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
  }

  .andamento {
    background-color: red;
  }
  .concluido {
    background-color: green;
  }
  .interrompido {
    background-color: gray;
  }
`
