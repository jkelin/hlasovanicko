import React, { useEffect } from 'react'
import { Layout } from 'containers'

export const Error404: React.FC = () => {
  useEffect(() => {
    document.title = 'Page not found | Hlasováníčko'
  }, [])

  return (
    <div className="my-50 m-auto container flex justify-center">
      This page does not exist.
    </div>
  )
}

interface ErrorPageProps {
  statusCode?: number
}

export const Error404Page: React.FC = () => (
  <Layout title="Page not found | Hlasováníčko">
    <Error404 />
  </Layout>
)

export const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  if (statusCode === 404) {
    return <Error404Page />
  }

  return (
    <div className="flex flex-row justify-center items-center w-full h-300">
      Prosím, zkuste stránku znovu načíst
    </div>
  )
}
