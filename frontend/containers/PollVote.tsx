import { PollDetailQuery } from 'data/types'
import React from 'react'

interface PollVoteProps {
  poll: PollDetailQuery['poll']
}

export const PollVote: React.FC<PollVoteProps> = (props) => {
  return <div>Hello Next.js 👋</div>
}
