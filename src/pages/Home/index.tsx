import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountDownContainer,
  CountdownButton,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './styles'
import { useState } from 'react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A quantidade de minutos deve ser igual ou superior a 5')
    .max(60, 'A quantidade de minutos deve ser menor ou igua a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  // formState
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  return (
    <HomeContainer>
      <FormContainer>
        <form action="#" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <div id="form-data">
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput
              list="suggestions-list"
              id="task"
              placeholder="Dê um nome para seu projeto..."
              {...register('task')}
            />
            <datalist id="suggestions-list">
              <option value="estudar.."></option>
              <option value="projetar.."></option>
            </datalist>

            <label htmlFor="">durante</label>
            <MinutesAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              step={5}
              {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
          </div>
          <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </CountDownContainer>
          <CountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}></Play>
            Começar
          </CountdownButton>
        </form>
      </FormContainer>
    </HomeContainer>
  )
}
