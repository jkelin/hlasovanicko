import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'

interface IndexPageProps {}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  return <Layout title="Hlasováníčko">Hello world!</Layout>
}

export default IndexPage
