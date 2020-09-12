import { Button, Clickable } from 'components'
import {
  PollDetailDocument,
  PollDetailQuery,
  useUpdatePollTitleMutation,
} from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface PollTitleForm {
  title: string
}

interface TitleEditorProps {
  poll: PollDetailQuery['poll']
}

export const TitleEditor: React.FC<TitleEditorProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatePollTitle] = useUpdatePollTitleMutation()
  console.warn(props.poll.title)
  const { register, handleSubmit, formState, setValue, reset } = useForm<
    PollTitleForm
  >({
    defaultValues: {
      title: props.poll.title || '',
    },
    shouldUnregister: true,
  })

  const save = useAsyncCallback(
    async (data: PollTitleForm) => {
      setIsEditing(false)

      updatePollTitle({
        variables: {
          id: props.poll.id,
          title: data.title,
        },
        optimisticResponse: {
          updatePoll: {
            id: props.poll.id,
            __typename: props.poll.__typename,
            title: data.title,
          },
        },
        update: (store, resp) => reset(resp.data.updatePoll),
      })
    },
    [props.poll, updatePollTitle, setIsEditing]
  )

  return (
    <div>
      {!isEditing && (
        <h1>
          <Clickable className="underline" onClick={() => setIsEditing(true)}>
            {props.poll.title || 'Titulek'}
          </Clickable>
        </h1>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(save)}>
          <input type="text" name="title" ref={register} autoFocus={true} />
          <Button isFormSubmit={true} loading={formState.isSubmitting}>
            Uložit
          </Button>
        </form>
      )}
    </div>
  )
}
