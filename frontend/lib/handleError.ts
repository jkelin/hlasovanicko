import { ApolloClient, ApolloError, useApolloClient } from '@apollo/react-hooks'
import { AxiosError } from 'axios'
import { GraphQLError } from 'graphql'
import { ErrorInfo, DependencyList, useCallback } from 'react'

interface ErrorsType {
  error?: Error | ApolloError | AxiosError
  errorInfo?: ErrorInfo
  graphQLError?: GraphQLError
}

interface HandleErrorOpts {
  apolloClient?: ApolloClient<unknown>
}

export function handleError(e: ErrorsType, opts: HandleErrorOpts = {}) {
  if (opts.apolloClient) {
    // save error to cache
    // const errorToast = {
    //   kind: ToastKind.Error,
    //   content:
    //     e.error?.message ||
    //     e.graphQLError?.message ||
    //     e.error + '' ||
    //     e.graphQLError + '',
    // }
    // addToast(errorToast, opts.apolloClient)
  }

  if (process.env.NODE_ENV === 'production') {
    // TODO: production error logging
    return
  }

  if (e.graphQLError) {
    console.group(`[GraphQL error]: ${e.graphQLError.message}`)
    console.error(e.graphQLError)
    console.groupEnd()
    return
  }

  if (e.error) {
    console.group(`[Error]: ${e.error.message}`)
    console.error(e.error)
    e.errorInfo && console.error('[ErrorInfo]:', e.errorInfo)
    console.groupEnd()
  }
}

export interface ErrorHandlerOptions {}

export function useErrorHandler<TFN extends (...opts: any[]) => Promise<any>>(
  original: TFN,
  errorHandlerOpts: ErrorHandlerOptions = {}
): TFN {
  const apolloClient = useApolloClient()

  return (async (...opts: any[]) => {
    try {
      await original(...opts)
    } catch (ex) {
      handleError({ error: ex }, { apolloClient })
    }
  }) as any
}

export function useAsyncCallback<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  deps: DependencyList
): T {
  const apolloClient = useApolloClient()

  return useCallback(async (...args: any[]) => {
    try {
      return await callback(...args)
    } catch (ex) {
      handleError({ error: ex }, { apolloClient })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- can only check array literals
  }, deps) as any
}
