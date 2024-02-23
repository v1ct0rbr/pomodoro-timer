import { ReactNode, createContext, useEffect, useReducer } from 'react'
import {
  Cycle,
  StateCycle,
  cycleReducer,
  newCycleConstructor,
  newEmptyCycleConstructor,
} from '../reducers/CycleReducer'

export interface CreateCycleData {
  task: string
  minutesAmount: number
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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  function loadCycleState(): StateCycle {
    const savedSate = localStorage.getItem('@pomodo-timer:state-cycles-1.0.0')

    if (savedSate) {
      return JSON.parse(savedSate) as StateCycle
    }
    return {
      activeCycleId: null,
      cycles: [] as Array<Cycle>,
      activeCycle: newEmptyCycleConstructor(),
      amountSecondsPassed: 0,
    } as StateCycle
  }
  const [stateCycle, dispatch] = useReducer(cycleReducer, loadCycleState())

  useEffect(() => {
    localStorage.setItem(
      `@pomodo-timer:state-cycles-1.0.0`,
      JSON.stringify(stateCycle),
    )
  }, [stateCycle])

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
