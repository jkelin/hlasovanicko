import classNames from 'classnames'
import React from 'react'
import {
  ValidationContainer,
  ValidationContainerProps,
} from './ValidationContainer'

interface TextAreaProps extends ValidationContainerProps {
  disabled?: boolean
  type?: string
  placeholder?: string
  textAreaClassName?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ disabled, type, placeholder, textAreaClassName, ...props }, ref) => (
    <ValidationContainer {...props}>
      <textarea
        ref={ref}
        className={classNames(
          'appearance-none border rounded w-full text-16 focus:outline-none',
          props.labelPosition === 'left' ? 'pt-4 pb-2 px-8' : 'p-8',
          props.errors && 'border-red-500',
          disabled && 'bg-black-50 cursor-not-allowed',
          !disabled &&
            !props.errors &&
            'bg-grey-200 border-grey-300 focus:border-primary',
          textAreaClassName
        )}
        id={props.name}
        disabled={disabled}
        placeholder={placeholder}
        name={props.name}
      />
    </ValidationContainer>
  )
)

TextArea.defaultProps = {
  labelPosition: 'top',
}

export default TextArea
