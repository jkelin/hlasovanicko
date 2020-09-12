import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'

interface VoteAdminPageProps {}

const VoteAdminPage: NextPage<VoteAdminPageProps> = (props) => {
  return <Layout title="Hlasováníčko">Administrace hlasování</Layout>
}

export default VoteAdminPage
