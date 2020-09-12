import classNames from 'classnames'
import React from 'react'
import { Clickable, ClickableProps } from './Clickable'

type ButtonKind = 'primary' | 'secondary' | 'danger' | 'danger-transparent'

interface ButtonProps extends ClickableProps {
  kind?: ButtonKind
}

const kinds: Record<ButtonKind, string> = {
  primary:
    'text-white-100 bg-primary disabled:bg-grey-500 hover:bg-utility-hover active:bg-utility-active',
  secondary: 'text-primary-darker border border-grey-900',
  danger: 'bg-utility-error text-white-100',
  'danger-transparent': 'border border-utility-red text-utility-red',
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  kind,
  className,
  ...props
}) => (
  <Clickable
    {...props}
    className={classNames(
      'rounded-lg py-7 px-16 font-medium active:outline-none',
      kind && kinds[kind],
      className
    )}
  >
    {props.children}
  </Clickable>
)

Button.defaultProps = {
  kind: 'primary',
}
