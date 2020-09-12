import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'
import { useRouter } from 'next/router'
import { useVoteByIdQuery } from 'data/types'

interface VotePageProps {}

const VotePage: NextPage<VotePageProps> = (props) => {
  const router = useRouter()
  const voteId: string = router.query.vote_id as any

  const { data } = useVoteByIdQuery({ variables: { id: voteId } })

  return <Layout title="Hlasováníčko">Hlasování {data?.vote.title}</Layout>
}

export default VotePage
