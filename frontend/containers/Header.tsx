import classNames from 'classnames'
import { Clickable, Link } from 'components'
import { PollDetailDocument, useCreatePollMutation } from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

export const Header: React.FC = () => {
  const [createPoll] = useCreatePollMutation()
  const router = useRouter()

  const makePoll = useAsyncCallback(async () => {
    const poll = await createPoll({
      variables: {},
      update: (store, result) => {
        store.writeQuery({
          query: PollDetailDocument,
          variables: { slug: result.data!.createPoll.slug },
          data: { poll: result.data!.createPoll },
        })
      },
    })

    router.push('/p/[poll]', `/p/${poll.data?.createPoll.slug}`)
  }, [])

  return (
    <>
      <header className={classNames('border-b bg-white-100 border-grey-300')}>
        <nav className="flex items-center container mx-auto">
          <Link to="/" className="lg:mr-36 px-12">
            Hlasováníčko
          </Link>

          <div className="w-20" />

          <Link onClick={makePoll}>Vytvořit hlasování</Link>
        </nav>
      </header>
    </>
  )
}
