import { Button, Clickable } from 'components'
import {
  Poll,
  PollDetailDocument,
  PollDetailQuery,
  useCreateOptionMutation,
  useUpdatePollOptionOrdersMutation,
  useUpdatePollTitleMutation,
} from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OptionEditor } from './OptionEditor'
import PlusCircleSolid from 'svg/plus-circle-solid.svg'
import { orderBy, isEqual } from 'lodash'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

interface OptionsEditorProps {
  poll: Poll
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const OptionsEditor: React.FC<OptionsEditorProps> = (props) => {
  const router = useRouter()
  const pollId: string = router.query.poll as any

  const [createOption] = useCreateOptionMutation({
    refetchQueries: [
      { query: PollDetailDocument, variables: { slug: pollId } },
    ],
    awaitRefetchQueries: true,
  })

  const [updateOptionOrder] = useUpdatePollOptionOrdersMutation()

  const handleSort = useAsyncCallback(
    async (options: PollDetailQuery['poll']['options']) => {
      const currentOrder = orderBy(props.poll.options, (x) => x.index).map(
        (x) => x.id
      )

      const newOrder = options.map((x) => x.id)

      if (!isEqual(currentOrder, newOrder)) {
        await updateOptionOrder({
          variables: { id: props.poll.id, options: newOrder },
          optimisticResponse: {
            poll: {
              ...props.poll,
              options: newOrder.map((id, index) => ({
                ...props.poll.options.find((x) => x.id === id),
                index,
              })),
            },
          },
        })
      }
    },
    [updateOptionOrder, props.poll]
  )

  const onDragEnd = useAsyncCallback(
    async (result: DropResult) => {
      if (!result.destination) {
        return
      }

      if (result.destination.index === result.source.index) {
        return
      }

      const items = reorder(
        props.poll.options,
        result.source.index,
        result.destination.index
      )

      handleSort(items)
    },
    [props.poll.options]
  )

  return (
    <div>
      <h2 className="text-xl mb-4">
        Možnosti
        <Clickable
          className="ml-4 w-30 h-30 p-7 pb-8"
          onClick={() =>
            createOption({
              variables: { pollId: props.poll.id },
            })
          }
        >
          <PlusCircleSolid width={16} height={16} />
        </Clickable>
      </h2>

      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {props.poll.options.map((x) => (
                  <OptionEditor key={x.id} poll={props.poll} option={x} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
