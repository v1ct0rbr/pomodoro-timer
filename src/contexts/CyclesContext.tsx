import { ReactNode, createContext, useState, useReducer } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedData?: Date
  finishedDate?: Date
}

export interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
  amountSecondsPassed: number
  updateSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  cycles: Cycle[]
}
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

type Action =
  | { type: 'ADD_NEW_CYCLE'; payload: { cycle: Cycle } }
  | { type: 'REMOVE_ITEM'; payload: { id: string | null } }
  | {
      type: 'INTERRUP_CURRENT_CYCLE'
      payload: { id: string | null }
    }
  | {
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED'
      payload: { id: string | null }
    }

/* interface StateCycle {
  cycles: Cycle[]
  activeCycleId: string | null
  amountSecondsPassed: number
}
 */
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  /* const [cycles, setCycles] = useState<Cycle[]>([]) */

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function updateSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const cycleReducer = (state: Cycle[], action: Action): Cycle[] => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return [...state, action.payload.cycle] // Adiciona um item à lista
      case 'INTERRUP_CURRENT_CYCLE':
        return state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, interruptedData: new Date() }
          } else {
            return cycle
          }
        }) // Remove um item da lista
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return state.map((cycle) => {
          if (cycle.id === action.payload.id) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }) // Marca um item como finalizado
      default:
        return state
    }
  }

  const [cycles, dispatch] = useReducer(cycleReducer, [])

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCycleAsFinished() {
    /* setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        id: activeCycleId,
      },
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    /* setCycles((state) => [...state, newCycle]) */
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        cycle: newCycle,
      },
    })
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    /*  setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedData: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
    dispatch({
      type: 'INTERRUP_CURRENT_CYCLE',
      payload: {
        id: activeCycleId,
      },
    })
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        updateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
