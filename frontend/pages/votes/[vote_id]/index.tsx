import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'

interface VotePageProps {}

const VotePage: NextPage<VotePageProps> = (props) => {
  return <Layout title="Hlasováníčko">Hlasování</Layout>
}

export default VotePage
