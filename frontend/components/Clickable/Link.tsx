import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { Clickable, ClickableProps } from './Clickable'

export type LinkKind = 'text' | 'navbar' | 'plain' | 'danger' | 'sidebar'

export interface LinkProps extends ClickableProps {
  kind?: LinkKind
}

const styles = {
  text: 'text-primary hover:underline',
  navbar:
    'underline lg:no-underline leading-50 lg:text-16 text-grey-800 h-full mr-36 px-12 flex items-center',
  plain: 'text-left w-full',
  danger: 'text-utility-red',
  sidebar: 'text-white-80 font-medium py-8 flex items-center',
}

export const Link: React.FC<LinkProps> = (props) => {
  const currentRoute = useRouter()?.route
  const active = props.to && props.to === currentRoute

  const className = classNames(
    styles[props.kind!],
    props.kind === 'navbar' && active && 'border-primary lg:border-b-4 mt-4',
    props.kind === 'sidebar' &&
      active &&
      'bg-white-10 rounded p-6 text-white-100 px-12 -mx-12',
    props.className
  )

  return (
    <Clickable {...props} className={className}>
      {props.children}
    </Clickable>
  )
}

Link.defaultProps = {
  kind: 'text',
}
