import classNames from 'classnames'
import { ErrorTrap } from './ErrorTrap'
import Head from 'next/head'
import React from 'react'
import { Header } from './Header'

interface LayoutProps {
  title?: string
  requireLogin?: boolean
  requireBank?: boolean
  fullHeight?: boolean
  background?: 'white' | 'grey'
  header?: boolean
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title = 'Hlasováníčko',
  requireLogin,
  requireBank,
  fullHeight,
  background,
  header,
}) => (
  <ErrorTrap>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {header && <Header />}

    <main
      className={classNames(
        background === 'grey' && 'bg-grey-100',
        'overflow-y-scroll'
      )}
    >
      {children}
    </main>
  </ErrorTrap>
)

Layout.defaultProps = {
  background: 'white',
  fullHeight: true,
  header: true,
}
