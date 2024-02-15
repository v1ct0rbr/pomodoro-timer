import { InputHTMLAttributes } from 'react'
import { InvalidInput } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

export function InputFieldContainer({ errorMessage, ...rest }: InputProps) {
  return (
    <div className="form-control">
      {errorMessage ? (
        <>
          <InvalidInput {...rest} /> <p>{errorMessage}</p>
        </>
      ) : (
        <input {...rest} />
      )}
    </div>
  )
}
