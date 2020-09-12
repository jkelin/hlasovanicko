import classNames from 'classnames'
import { Clickable, Link } from 'components'
import React, { useCallback, useEffect, useState } from 'react'

export const Header: React.FC = () => {
  return (
    <>
      <header className={classNames('border-b bg-white-100 border-grey-300')}>
        <nav className="flex items-center container mx-auto">
          <Link to="/" className="lg:mr-36 px-12">
            Hlasováníčko
          </Link>

          <div className="w-20" />

          <Link to="/votes">Vytvořit hlasování</Link>
        </nav>
      </header>
    </>
  )
}
