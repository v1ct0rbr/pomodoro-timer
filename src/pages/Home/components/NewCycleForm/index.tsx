import { useFormContext } from 'react-hook-form'

import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <div id="form-data">
        <label htmlFor="">Vou trabalhar em</label>
        <TaskInput
          list="suggestions-list"
          id="task"
          placeholder="Dê um nome para seu projeto..."
          {...register('task')}
          disabled={!!activeCycle?.id}
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
          step={1}
          disabled={!!activeCycle?.id}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </div>
    </FormContainer>
  )
}
