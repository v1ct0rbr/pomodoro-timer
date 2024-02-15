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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A quantidade de minutos deve ser igual ou superior a 5')
    .max(60, 'A quantidade de minutos deve ser menor ou igua a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // formState
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
  }

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
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
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
