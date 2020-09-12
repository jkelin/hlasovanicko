import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'
import { useTestQuery } from 'data/types'

interface NewVotePageProps {}

const NewVotePage: NextPage<NewVotePageProps> = (props) => {
  const { data } = useTestQuery()

  return <Layout title="Hlasováníčko">Nové hlasování {data?.test}</Layout>
}

export default NewVotePage
