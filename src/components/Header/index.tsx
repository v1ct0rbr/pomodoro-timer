import { HeaderContainer } from './styles'
import { Timer, ScrollText } from 'lucide-react'

import logoTimer from '../../assets/logo-timer.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoTimer} alt="logo timer" width={45} />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <ScrollText size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
