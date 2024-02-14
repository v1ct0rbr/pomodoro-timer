import { Play } from 'lucide-react'
import {
  CountDownContainer,
  CountdownButton,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <FormContainer>
        <form action="#">
          <div id="form-data">
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput
              list="suggestions-list"
              id="task"
              placeholder="Dê um nome para seu projeto..."
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
              min={5}
              max={60}
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
          <CountdownButton type="submit" disabled>
            <Play size={24}></Play>
            Começar
          </CountdownButton>
        </form>
      </FormContainer>
    </HomeContainer>
  )
}
