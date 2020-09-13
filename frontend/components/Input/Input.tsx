import classNames from 'classnames'
import React from 'react'
import {
  ValidationContainer,
  ValidationContainerProps,
} from './ValidationContainer'

interface InputProps extends ValidationContainerProps {
  disabled?: boolean
  type?: string
  placeholder?: string
  autoFocus?: boolean
  autoComplete?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type, placeholder, ...props }, ref) => (
    <ValidationContainer {...props}>
      <input
        ref={ref}
        className={classNames(
          'appearance-none border rounded w-full text-16 focus:outline-none',
          props.labelPosition === 'left' ? 'pt-4 pb-2 px-8' : 'p-8',
          props.errors && 'border-red-500',
          disabled && 'bg-black-50 cursor-not-allowed',
          !disabled &&
            !props.errors &&
            'bg-grey-200 border-grey-300 focus:border-primary'
        )}
        id={props.id || props.name}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={props.name}
      />
    </ValidationContainer>
  )
)

Input.defaultProps = {
  labelPosition: 'top',
}

export default Input
