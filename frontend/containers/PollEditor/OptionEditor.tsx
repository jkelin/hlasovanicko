import { Button, Clickable, Input } from 'components'
import {
  PollDetailDocument,
  PollDetailQuery,
  useUpdatePollOptionTitleMutation,
} from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import GripLinesSolid from 'svg/grip-lines-solid.svg'

interface PollTitleForm {
  title: string
}

interface OptionEditorProps {
  poll: PollDetailQuery['poll']
  option: PollDetailQuery['poll']['options'][0]
}

export const OptionEditor: React.FC<OptionEditorProps> = (props) => {
  const [updatePollOptionTitle] = useUpdatePollOptionTitleMutation()
  const { register, handleSubmit, formState, setValue, reset } = useForm<
    PollTitleForm
  >({
    defaultValues: {
      title: props.option.title || '',
    },
    shouldUnregister: true,
  })

  const save = useAsyncCallback(
    async (data: PollTitleForm) => {
      updatePollOptionTitle({
        variables: {
          id: props.option.id,
          title: data.title,
        },
        optimisticResponse: {
          option: {
            id: props.option.id,
            __typename: props.option.__typename,
            title: data.title,
          },
        },
        update: (store, resp) => reset(resp.data.option),
      })
    },
    [props.poll, updatePollOptionTitle]
  )

  return (
    <div className="border rounded mt-4 flex">
      <div className="w-32 border-r flex flex-col items-center justify-center cursor-move">
        <GripLinesSolid width={16} />
        <div>{props.option.order + 1}</div>
      </div>
      <div className="flex-grow px-8 py-4">
        <form onSubmit={handleSubmit(save)}>
          <Input
            label="Název"
            type="text"
            name="title"
            id={`title-${props.option.order}`}
            ref={register}
            autoComplete="no off"
            autoFocus={true}
          />
          {(formState.isDirty || formState.isSubmitting) && (
            <>
              <div className="mb-4" />
              <Button
                isFormSubmit={true}
                loading={formState.isSubmitting}
                className="border self-end"
              >
                Uložit
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
