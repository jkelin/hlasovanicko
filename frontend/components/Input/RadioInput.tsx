import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'

interface RadioInputProps {
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const RadioInput: React.FC<RadioInputProps> = (props) => (
  <input
    type="radio"
    id={props.name}
    className={classNames(
      'appearance-none rounded-full w-16 h-16',
      props.checked && 'border-primary border-4',
      !props.checked && 'border',
      props.disabled
        ? 'border-grey-400 bg-grey-200 cursor-not-allowed'
        : 'cursor-pointer border-primary'
    )}
    data-cy-id={`radio-${props.name}-${props.value}`}
    {...props}
  />
)

export default RadioInput
