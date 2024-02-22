import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Status } from './Status'
import { HistoryContainer, HistoryList, ListDeleteButton } from './styles'

export function History() {
  const { activeCycle, stateCycle, removeCycle } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {stateCycle.cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {activeCycle && activeCycle.id === cycle.id ? (
                    <Status statusType="andamento" />
                  ) : cycle.finishedDate ? (
                    <Status statusType="concluido" />
                  ) : (
                    <Status statusType="interrompido" />
                  )}
                </td>
                <td>
                  <ListDeleteButton onClick={() => removeCycle(cycle.id)}>
                    <Trash2></Trash2>
                  </ListDeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
