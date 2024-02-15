import styled from 'styled-components'

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

export const InvalidInput = styled(BaseInput)`
  border: 2px solid red;
  margin-bottom: 1rem;
  p {
    color: red;
    font-size: 0.8rem;
  }
`
