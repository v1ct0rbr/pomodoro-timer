import styled from 'styled-components'
import { device } from '../../../../styles/global'
export const CountDownContainer = styled.div`
  font-family: 'Robot Mono', monospace;
  margin: auto;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;
  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media ${device.desktop} {
    font-size: 11rem;
    line-height: 8rem;
  }

  @media ${device.laptop} {
    font-size: 8rem;
    line-height: 8rem;
  }

  @media ${device.tablet} {
    font-size: 4rem;
    line-height: 8rem;
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
export const BaseCountdownButton = styled.button`
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
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
  }
`

export const StartCountDownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountDownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-600']};
  }
  :active {
    border: none;
  }
`
