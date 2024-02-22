import { zodResolver } from '@hookform/resolvers/zod'
import { Play, StopCircle } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Countdown } from './components/Countdown'
import {
  StartCountDownButton,
  StopCountDownButton,
} from './components/Countdown/styles'
import { NewCycleForm } from './components/NewCycleForm'
import { HomeContainer } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'A quantidade de minutos deve ser igual ou superior a 5')
    .max(60, 'A quantidade de minutos deve ser menor ou igua a 60'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // formState
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  /*   function insertCycle(cycle: Cycle) {
    setCycles((state) => [...state, cycle])
  } */

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="#" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle?.id ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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
    </HomeContainer>
  )
}
