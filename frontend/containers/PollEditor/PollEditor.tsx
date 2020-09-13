import { PollDetailQuery, PollDetailQueryHookResult } from 'data/types'
import { useAsyncCallback } from 'lib/handleError'
import React from 'react'
import { useForm } from 'react-hook-form'
import { OptionsEditor } from './OptionsEditor'
import { TitleEditor } from './TitleEditor'

interface PollEditorProps {
  poll: PollDetailQuery['poll']
}

export const PollEditor: React.FC<PollEditorProps> = (props) => {
  return (
    <div className="mt-20">
      <TitleEditor poll={props.poll} />

      <div className="mt-20" />

      <OptionsEditor poll={props.poll} />
    </div>
  )
}
