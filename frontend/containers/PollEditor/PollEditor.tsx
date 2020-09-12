import { PollDetailQuery, PollDetailQueryHookResult } from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TitleEditor } from './TitleEditor'

interface PollEditorProps {
  poll: PollDetailQuery['poll']
}

export const PollEditor: React.FC<PollEditorProps> = (props) => {
  return (
    <div>
      <TitleEditor poll={props.poll} />
    </div>
  )
}
