import { zodResolver } from '@hookform/resolvers/zod'
import { Play, StopCircle } from 'lucide-react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Countdown } from './components/Countdown'
import {
  StartCountDownButton,
  StopCountDownButton,
} from './components/Countdown/styles'
import { NewCycleForm } from './components/NewCycleForm'
import { HomeContainer } from './styles'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedData?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
  insertCycle: (cycle: Cycle) => void
  amountSecondsPassed: number
  updateSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A quantidade de minutos deve ser igual ou superior a 5')
    .max(60, 'A quantidade de minutos deve ser menor ou igua a 60'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // formState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function insertCycle(cycle: Cycle) {
    setCycles((state) => [...state, cycle])
  }

  function updateSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedData: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <CyclesContext.Provider
        value={{
          activeCycle,
          activeCycleId,
          markCycleAsFinished,
          insertCycle,
          amountSecondsPassed,
          updateSecondsPassed,
        }}
      >
        <form action="#" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activeCycle ? (
            <StopCountDownButton type="button" onClick={handleInterruptCycle}>
              <StopCircle size={24}></StopCircle>
              Interromper
            </StopCountDownButton>
          ) : (
            <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24}></Play>
              Começar
            </StartCountDownButton>
          )}
        </form>
      </CyclesContext.Provider>
    </HomeContainer>
  )
}
