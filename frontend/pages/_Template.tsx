import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'

interface TemplatePageProps {}

const TemplatePage: NextPage<TemplatePageProps> = (props) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">Hello world!</Layout>
  )
}

export default TemplatePage
