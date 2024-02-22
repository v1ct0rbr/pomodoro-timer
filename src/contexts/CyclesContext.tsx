import { ReactNode, createContext, useReducer } from 'react'

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

export interface StateCycle {
  cycles: Cycle[]
  activeCycle: Cycle
  activeCycleId: string | null
  amountSecondsPassed: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  markCycleAsFinished: () => void
  updateSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  removeCycle: (cycleId: string) => void
  stateCycle: StateCycle
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
  | {
      type: 'UPDATE_AMOUNT_SECONDS_PASSED'
      payload: { amount: number }
    }

function newCycleConstructor(data: CreateCycleData): Cycle {
  return {
    id: crypto.randomUUID(),
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
  }
}

function newEmptyCycleConstructor(): Cycle {
  return { minutesAmount: 0, startDate: new Date() } as Cycle
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  /* const [cycles, setCycles] = useState<Cycle[]>([]) */
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function cycleReducer(stateCycle: StateCycle, action: Action): StateCycle {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...stateCycle,
          activeCycleId: action.payload.cycle.id,
          activeCycle: action.payload.cycle,
          amountSecondsPassed: 0,
          cycles: [action.payload.cycle, ...stateCycle.cycles],
        }
      case 'REMOVE_ITEM':
        return {
          ...stateCycle,

          cycles: stateCycle.cycles.filter(
            (cycle) => cycle.id !== action.payload.id,
          ),
        }
      case 'INTERRUP_CURRENT_CYCLE': {
        const updatedCycles = stateCycle.cycles.map((cycle) => {
          if (cycle.id === action.payload.id) {
            return {
              ...cycle,
              interruptedData: new Date(), // Atualiza a propriedade interruptedData
            }
          }
          return cycle
        })
        return {
          ...stateCycle,
          cycles: updatedCycles,
          activeCycleId: null,
          activeCycle: newEmptyCycleConstructor(),
          amountSecondsPassed: 0,
        }
      }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
        const updatedCycles = stateCycle.cycles.map((cycle) => {
          if (cycle.id === action.payload.id) {
            return {
              ...cycle,
              finishedDate: new Date(), // Atualiza a propriedade interruptedData
            }
          }
          return cycle
        })
        return {
          ...stateCycle,
          activeCycleId: null,
          activeCycle: newEmptyCycleConstructor(),
          cycles: updatedCycles,
          amountSecondsPassed: 0,
        }
      }
      case 'UPDATE_AMOUNT_SECONDS_PASSED': {
        return { ...stateCycle, amountSecondsPassed: action.payload.amount }
      }
      default:
        return stateCycle
    }
  }

  const [stateCycle, dispatch] = useReducer(cycleReducer, {
    activeCycleId: null,
    cycles: [] as Array<Cycle>,
    activeCycle: { minutesAmount: 0, startDate: new Date() },
    amountSecondsPassed: 0,
  } as StateCycle)

  function updateSecondsPassed(seconds: number) {
    // setAmountSecondsPassed(seconds)
    dispatch({
      type: 'UPDATE_AMOUNT_SECONDS_PASSED',
      payload: {
        amount: seconds,
      },
    })
  }

  function markCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        id: stateCycle.activeCycleId,
      },
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = newCycleConstructor(data)

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        cycle: newCycle,
      },
    })
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUP_CURRENT_CYCLE',
      payload: {
        id: stateCycle.activeCycleId,
      },
    })
  }

  function removeCycle(cycleId: string) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id: cycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        markCycleAsFinished,
        updateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        activeCycle: stateCycle.activeCycle,
        stateCycle,
        removeCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
