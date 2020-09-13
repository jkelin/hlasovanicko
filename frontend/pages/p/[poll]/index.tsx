import { NextPage } from 'next'
import React from 'react'
import { Layout, PollEditor } from 'containers'
import { useRouter } from 'next/router'
import { usePollDetailQuery } from 'data/types'
import { PollVote } from 'containers/PollVote'

interface VotePageProps {}

const VotePage: NextPage<VotePageProps> = (props) => {
  const router = useRouter()
  const pollId: string = router.query.poll as any

  const { data } = usePollDetailQuery({
    variables: { slug: pollId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    ssr: false,
  })

  console.warn('vote page', data?.poll?.options)

  return (
    <Layout
      title={
        data?.poll?.title
          ? `${data?.poll?.title} | Hlasováníčko`
          : 'Hlasováníčko'
      }
    >
      {data && data.poll && (
        <>
          <PollEditor poll={data.poll} />
          {data.poll.isActive && <PollVote poll={data.poll} />}
        </>
      )}
    </Layout>
  )
}

export default VotePage
