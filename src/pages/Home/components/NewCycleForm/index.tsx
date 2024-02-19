import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Cycle } from '../..'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

interface NewCycleFormProps {
  activeCycle: Cycle
  handleCreateNewCycle: () => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A quantidade de minutos deve ser igual ou superior a 5')
    .max(60, 'A quantidade de minutos deve ser menor ou igua a 60'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm({
  activeCycle,
  handleCreateNewCycle,
}: NewCycleFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <FormContainer>
      <div id="form-data">
        <label htmlFor="">Vou trabalhar em</label>
        <TaskInput
          list="suggestions-list"
          id="task"
          placeholder="Dê um nome para seu projeto..."
          {...register('task')}
          disabled={!!activeCycle}
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
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </div>
    </FormContainer>
  )
}
