import gql from 'graphql-tag'
import { useTestQuery } from '../data/types'
const Index = () => {
  const { loading, data } = useTestQuery()

  if (loading || !data) {
    return <h1>loading...</h1>
  }

  return <h1 className="text-red-500">{data.test}</h1>
}

export default Index
