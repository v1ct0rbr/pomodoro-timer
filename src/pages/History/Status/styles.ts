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
    background-color: ${(props) => props.theme['yellow-500']};
  }
  .concluido {
    background-color: ${(props) => props.theme['green-300']};
  }
  .interrompido {
    background-color: ${(props) => props.theme['red-500']};
  }
`
