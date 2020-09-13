import { UrlObject } from 'url'
import classNames from 'classnames'
import Link from 'next/link'
import React, {
  useCallback,
  useState,
  MouseEventHandler,
  CSSProperties,
} from 'react'
import Spinner from 'svg/spinner-bars.svg'

export interface ClickableProps {
  /**
   * Internal link
   */
  to?: string | UrlObject

  /**
   * External link
   */
  href?: string

  role?: string
  onClick?: MouseEventHandler
  onMouseDown?: () => unknown
  isFormSubmit?: boolean
  openInNewTab?: boolean
  className?: string
  disabled?: boolean
  download?: boolean
  loading?: boolean
  active?: boolean
  activeExact?: boolean
  title?: string
  as?: string
  params?: Record<string, any>
  scroll?: boolean
  replace?: boolean
  style?: CSSProperties
}

interface Props extends ClickableProps {
  loadingClassName?: string
  disabledClassName?: string
  loadingColor?: string
}

export const Clickable: React.FC<Props> = (props) => {
  const [loadingState, setLoadingState] = useState(false)

  const clickHandler = (
    e: React.MouseEvent<any>,
    fn?: (e: React.MouseEvent<any>) => unknown
  ) => {
    if (fn) {
      const res: any = fn(e)

      if (typeof res?.finally === 'function') {
        setLoadingState(true)
        res.finally(() => setLoadingState(false))
      }

      e.preventDefault()

      return res
    } else {
      return undefined
    }
  }

  const onClick = useCallback((e) => clickHandler(e, props.onClick), [
    props.onClick,
  ])
  const onMouseDown = useCallback((e) => clickHandler(e, props.onMouseDown), [
    props.onMouseDown,
  ])

  const loading = props.loading || loadingState
  const disabled = props.disabled || loading

  const className = classNames(
    disabled && 'opacity-50 cursor-not-allowed',
    disabled && props.disabledClassName,
    loading && 'loading',
    loading && props.loadingClassName,
    props.active && 'bg-blue-300',
    props.className
  )

  if (!disabled && props.to) {
    return (
      <Link
        href={props.to}
        scroll={props.scroll}
        replace={props.replace}
        as={props.as}
      >
        <a
          className={className}
          style={props.style}
          target={props.openInNewTab ? '_blank' : undefined}
          role={props.role}
          title={props.title}
          onClick={props.onClick}
          download={props.download}
          data-cy-id={props['data-cy-id']}
        >
          {props.children}
        </a>
      </Link>
    )
  } else if (!disabled && props.href) {
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        className={className}
        style={props.style}
        target={props.openInNewTab ? '_blank' : undefined}
        role={props.role}
        title={props.title}
        download={props.download}
        data-cy-id={props['data-cy-id']}
      >
        {props.children}
      </a>
    )
  } else {
    return (
      <button
        type={props.isFormSubmit ? 'submit' : 'button'}
        className={className}
        style={props.style}
        onClick={disabled ? undefined : onClick}
        onMouseDown={disabled ? undefined : onMouseDown}
        disabled={disabled}
        role={props.role}
        title={props.title}
        data-cy-id={props['data-cy-id']}
      >
        {loading ? <Spinner height={26} width={26} /> : props.children}
      </button>
    )
  }
}
