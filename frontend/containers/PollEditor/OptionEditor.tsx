import { Button, Clickable, Input } from 'components'
import {
  Poll,
  PollDetailDocument,
  PollDetailQuery,
  PollOption,
  useUpdatePollOptionTitleMutation,
} from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import GripLinesSolid from 'svg/grip-lines-solid.svg'
import Move from 'svg/move.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface PollTitleForm {
  title: string
}

interface OptionEditorProps {
  poll: Poll
  option: PollOption
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
    <Draggable draggableId={props.option.id} index={props.option.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border rounded mt-4 flex"
        >
          <div
            className="w-32 border-r flex flex-col items-center justify-center cursor-move"
            title="Přesunout"
            {...provided.dragHandleProps}
          >
            <Move width={16} />
          </div>
          <div className="flex-grow px-8 py-4">
            <form onSubmit={handleSubmit(save)}>
              <Input
                label="Název"
                type="text"
                name="title"
                id={`title-${props.option.index}`}
                ref={register}
                autoComplete="no off"
                autoFocus={!props.option.title}
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
      )}
    </Draggable>
  )
}
