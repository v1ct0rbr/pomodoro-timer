import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../..'

import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

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
