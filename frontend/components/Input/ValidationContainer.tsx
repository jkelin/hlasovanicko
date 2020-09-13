import classNames from 'classnames'
import React from 'react'
import { FieldErrors } from 'react-hook-form'

export interface ValidationContainerProps {
  name: string
  label?: React.ReactNode | string
  labelPosition?: 'top' | 'left'
  errors?: FieldErrors
  className?: string
  id?: string
}

export const ValidationContainer: React.FC<ValidationContainerProps> = ({
  label,
  labelPosition,
  errors,
  name,
  children,
  className,
  id,
}) => (
  <div
    className={classNames(
      'flex justify-between',
      labelPosition === 'left' ? 'flex-row' : 'flex-col items-start',
      className
    )}
  >
    {label && (
      <label
        className={classNames(
          'text-14 mb-4 text-grey-900 cursor-pointer',
          labelPosition === 'left' && 'mt-10'
        )}
        htmlFor={id || name}
      >
        {label}
      </label>
    )}
    <div className={classNames(labelPosition === 'left' ? 'w-4/5' : 'w-full')}>
      {children}
      {errors && (
        <p className="text-red-500 text-14 italic py-6">{errors.message}</p>
      )}
    </div>
  </div>
)

ValidationContainer.defaultProps = {
  labelPosition: 'top',
}
