import { CreateCycleData } from '../contexts/CyclesContext'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedData?: Date
  finishedDate?: Date
}
export interface StateCycle {
  cycles: Cycle[]
  activeCycle: Cycle
  activeCycleId: string | null
  amountSecondsPassed: number
}

type ActionTypes =
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

export function newEmptyCycleConstructor(): Cycle {
  return { minutesAmount: 0, startDate: new Date() } as Cycle
}

export function newCycleConstructor(data: CreateCycleData): Cycle {
  return {
    id: crypto.randomUUID(),
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
  }
}

export function cycleReducer(
  stateCycle: StateCycle,
  action: ActionTypes,
): StateCycle {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      //   return {
      //     ...stateCycle,
      //     activeCycleId: action.payload.cycle.id,
      //     activeCycle: action.payload.cycle,
      //     amountSecondsPassed: 0,
      //     cycles: [action.payload.cycle, ...stateCycle.cycles],
      //   }
      return produce(stateCycle, (draft) => {
        draft.amountSecondsPassed = 0
        draft.activeCycle = action.payload.cycle
        draft.cycles.push(action.payload.cycle)
        draft.activeCycleId = action.payload.cycle.id
      })
    case 'REMOVE_ITEM': {
      return {
        ...stateCycle,
        cycles: stateCycle.cycles.filter(
          (cycle) => cycle.id !== action.payload.id,
        ),
      }
      //   const cycleIndex = stateCycle.cycles.findIndex(
      //     (cycle) => cycle.id === action.payload.id,
      //   )
      //   if (cycleIndex < 0) return stateCycle

      //   return produce(stateCycle, (draft) => {
      //     delete draft.cycles[cycleIndex]
      //   })
    }
    case 'INTERRUP_CURRENT_CYCLE': {
      //   const updatedCycles = stateCycle.cycles.map((cycle) => {
      //     if (cycle.id === action.payload.id) {
      //       return {
      //         ...cycle,
      //         interruptedData: new Date(), // Atualiza a propriedade interruptedData
      //       }
      //     }
      //     return cycle
      //   })
      //   return {
      //     ...stateCycle,
      //     cycles: updatedCycles,
      //     activeCycleId: null,
      //     activeCycle: newEmptyCycleConstructor(),
      //     amountSecondsPassed: 0,
      //   }
      const cycleIndex = stateCycle.cycles.findIndex(
        (cycle) => cycle.id === action.payload.id,
      )
      if (cycleIndex < 0) {
        return stateCycle
      }

      return produce(stateCycle, (draft) => {
        draft.activeCycle = newEmptyCycleConstructor()
        draft.activeCycleId = null
        draft.cycles[cycleIndex].interruptedData = new Date()
        draft.amountSecondsPassed = 0
      })
    }
    case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
      //   const updatedCycles = stateCycle.cycles.map((cycle) => {
      //     if (cycle.id === action.payload.id) {
      //       return {
      //         ...cycle,
      //         finishedDate: new Date(), // Atualiza a propriedade interruptedData
      //       }
      //     }
      //     return cycle
      //   })
      //   return {
      //     ...stateCycle,
      //     activeCycleId: null,
      //     activeCycle: newEmptyCycleConstructor(),
      //     cycles: updatedCycles,
      //     amountSecondsPassed: 0,
      //   }

      const cycleIndex = stateCycle.cycles.findIndex(
        (cycle) => cycle.id === action.payload.id,
      )
      if (cycleIndex < 0) {
        return stateCycle
      }

      return produce(stateCycle, (draft) => {
        draft.activeCycle = newEmptyCycleConstructor()
        draft.activeCycleId = null
        draft.cycles[cycleIndex].finishedDate = new Date()
        draft.amountSecondsPassed = 0
      })
    }
    case 'UPDATE_AMOUNT_SECONDS_PASSED': {
      //   return { ...stateCycle, amountSecondsPassed: action.payload.amount }
      return produce(stateCycle, (draft) => {
        draft.amountSecondsPassed = action.payload.amount
      })
    }
    default:
      return stateCycle
  }
}
