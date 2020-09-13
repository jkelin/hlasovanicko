import { Button, Clickable } from 'components'
import {
  PollDetailDocument,
  PollDetailQuery,
  useCreateOptionMutation,
  useUpdatePollTitleMutation,
} from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { OptionEditor } from './OptionEditor'
import PlusCircleSolid from 'svg/plus-circle-solid.svg'

interface PollTitleForm {
  title: string
}

interface OptionsEditorProps {
  poll: PollDetailQuery['poll']
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
        {props.poll.options.map((x) => (
          <OptionEditor key={x.id} poll={props.poll} option={x} />
        ))}
      </div>
    </div>
  )
}
