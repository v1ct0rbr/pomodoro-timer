import { StatusContainer } from './styles'

interface StatusProps {
  statusType: 'andamento' | 'interrompido' | 'concluido'
}

export function Status({ statusType }: StatusProps) {
  const getContentByStatus = (): string => {
    switch (statusType) {
      case 'andamento':
        return 'Em andamento'
      case 'concluido':
        return 'Concluído'
      case 'interrompido':
        return 'Interrompido'
      default:
        return ''
    }
  }

  return (
    <StatusContainer>
      <i className={statusType}></i>
      <span>{getContentByStatus()}</span>
    </StatusContainer>
  )
}
