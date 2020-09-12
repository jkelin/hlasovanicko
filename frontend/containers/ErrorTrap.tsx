import * as React from 'react'
import { ErrorInfo } from 'react'
import { ErrorPage } from '../components/ErrorPage'

interface Props {}

interface State {
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorTrap extends React.Component<Props, State> {
  state: State = {}

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Error trap', error)
    this.setState({ error, errorInfo }, () => {
      console.error(error)
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />
    }

    return this.props.children
  }
}
