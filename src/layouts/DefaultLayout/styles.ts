import styled from 'styled-components'
import { device } from '../../styles/global'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media ${device.desktop} {
    padding: 2rem;
  }

  @media ${device.laptop} {
    padding: 1rem;
  }

  @media ${device.tablet} {
    padding: 0.5rem;
  }
`
