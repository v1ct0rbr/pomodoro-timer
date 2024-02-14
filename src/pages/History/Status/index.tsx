import { StatusContainer } from './styles'

interface StatusProps {
  statusType: 'andamento' | 'interrompido' | 'concluido'
}

export function Status({ statusType }: StatusProps) {
  return (
    <StatusContainer>
      <i className={statusType}></i>
      <span>{statusType}</span>
    </StatusContainer>
  )
}
