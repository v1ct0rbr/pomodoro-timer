import styled from 'styled-components'

export const HomeContainer = styled.main`
  width: fit-content;
  flex: 1;
  display: flex;
  padding: 2rem 0 2rem 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1rem;
  font-weight: bold;
  flex-wrap: wrap;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    div#form-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
  }
`

export const CountDownContainer = styled.div`
  font-family: 'Robot Mono', monospace;
  font-size: 11rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  align-items: cneter;
  justify-content: center;
`
export const CountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
export const BaseInput = styled.input`
  flex: 1;
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  transition: border-bottom 0.5s ease-in-out;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-500']};
  }
`
export const TaskInput = styled(BaseInput)`
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
