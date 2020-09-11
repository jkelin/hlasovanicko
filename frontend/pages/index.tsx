import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
// import { getDataFromTree } from '@apollo/react-ssr';

const QUERY = gql`
  {
    test
  }
`

const Index = () => {
  const { loading, data } = useQuery(QUERY)

  if (loading || !data) {
    return <h1>loading...</h1>
  }
  return <h1>{data.test}</h1>
}

export default Index
