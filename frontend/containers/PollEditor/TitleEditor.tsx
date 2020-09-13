import { Button, Clickable, Input } from 'components'
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
  const [updatePollTitle] = useUpdatePollTitleMutation()
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
      updatePollTitle({
        variables: {
          id: props.poll.id,
          title: data.title,
        },
        optimisticResponse: {
          poll: {
            id: props.poll.id,
            __typename: props.poll.__typename,
            title: data.title,
          },
        },
        update: (store, resp) => reset(resp.data.poll),
      })
    },
    [props.poll, updatePollTitle]
  )

  return (
    <div>
      <form onSubmit={handleSubmit(save)} className="flex">
        <Input
          label="Název hlasování"
          type="text"
          name="title"
          autoComplete="no off"
          className="flex-grow"
          ref={register()}
          autoFocus={true}
        />
        {(formState.isDirty || formState.isSubmitting) && (
          <Button
            className="border self-end ml-8"
            style={{ height: 42 }}
            isFormSubmit={true}
            loading={formState.isSubmitting}
          >
            Uložit
          </Button>
        )}
      </form>
    </div>
  )
}
