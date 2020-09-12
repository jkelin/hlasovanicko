import { NextPage } from 'next'
import React from 'react'
import { Layout } from 'containers'
import { useCreateVoteMutation, VoteByIdDocument } from 'data/types'
import { useForm } from 'react-hook-form'
import { useAsyncCallback } from 'lib/handleError'
import { useRouter } from 'next/router'
import { Button } from 'components'

interface NewVote {
  title: string
}

interface NewVotePageProps {}

const NewVotePage: NextPage<NewVotePageProps> = (props) => {
  const [createVote] = useCreateVoteMutation()
  const { register, handleSubmit, formState, setValue } = useForm<NewVote>()
  const router = useRouter()

  const onSubmit = useAsyncCallback(async (data: NewVote) => {
    const vote = await createVote({
      variables: {
        title: data.title,
      },
      update: (store, result) => {
        result.data!
        store.writeQuery({
          query: VoteByIdDocument,
          variables: { id: result.data!.createVote.id },
          data: { vote: result.data!.createVote },
        })
      },
    })

    router.push('/votes/[vote_id]', `/votes/${vote.data?.createVote.id}`)
  }, [])

  return (
    <Layout title="Hlasováníčko">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="title" ref={register} />
        <Button isFormSubmit={true} loading={formState.isSubmitting}>
          Vytvořit hlasování
        </Button>
      </form>
    </Layout>
  )
}

export default NewVotePage
