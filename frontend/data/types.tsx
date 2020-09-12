import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Poll = {
  __typename?: 'Poll';
  id: Scalars['String'];
  slug: Scalars['String'];
  isNew: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  poll: Poll;
  pollBySlug: Poll;
};


export type QueryPollArgs = {
  id: Scalars['ID'];
};


export type QueryPollBySlugArgs = {
  slug: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPoll: Poll;
  updatePoll: Poll;
};


export type MutationUpdatePollArgs = {
  title?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type CreatePollMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePollMutation = (
  { __typename?: 'Mutation' }
  & { createPoll: (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'slug' | 'isNew'>
  ) }
);

export type UpdatePollTitleMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdatePollTitleMutation = (
  { __typename?: 'Mutation' }
  & { updatePoll: (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'title'>
  ) }
);

export type PollDetailQueryVariables = Exact<{
  slug: Scalars['ID'];
}>;


export type PollDetailQuery = (
  { __typename?: 'Query' }
  & { poll: (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'slug' | 'isNew' | 'isActive' | 'title'>
  ) }
);


export const CreatePollDocument = gql`
    mutation CreatePoll {
  createPoll {
    id
    slug
    isNew
  }
}
    `;
export type CreatePollMutationFn = ApolloReactCommon.MutationFunction<CreatePollMutation, CreatePollMutationVariables>;

/**
 * __useCreatePollMutation__
 *
 * To run a mutation, you first call `useCreatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPollMutation, { data, loading, error }] = useCreatePollMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreatePollMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePollMutation, CreatePollMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePollMutation, CreatePollMutationVariables>(CreatePollDocument, baseOptions);
      }
export type CreatePollMutationHookResult = ReturnType<typeof useCreatePollMutation>;
export type CreatePollMutationResult = ApolloReactCommon.MutationResult<CreatePollMutation>;
export type CreatePollMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePollMutation, CreatePollMutationVariables>;
export const UpdatePollTitleDocument = gql`
    mutation UpdatePollTitle($id: ID!, $title: String!) {
  updatePoll(id: $id, title: $title) {
    id
    title
  }
}
    `;
export type UpdatePollTitleMutationFn = ApolloReactCommon.MutationFunction<UpdatePollTitleMutation, UpdatePollTitleMutationVariables>;

/**
 * __useUpdatePollTitleMutation__
 *
 * To run a mutation, you first call `useUpdatePollTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollTitleMutation, { data, loading, error }] = useUpdatePollTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdatePollTitleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePollTitleMutation, UpdatePollTitleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePollTitleMutation, UpdatePollTitleMutationVariables>(UpdatePollTitleDocument, baseOptions);
      }
export type UpdatePollTitleMutationHookResult = ReturnType<typeof useUpdatePollTitleMutation>;
export type UpdatePollTitleMutationResult = ApolloReactCommon.MutationResult<UpdatePollTitleMutation>;
export type UpdatePollTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePollTitleMutation, UpdatePollTitleMutationVariables>;
export const PollDetailDocument = gql`
    query PollDetail($slug: ID!) {
  poll: pollBySlug(slug: $slug) {
    id
    slug
    isNew
    isActive
    title
  }
}
    `;

/**
 * __usePollDetailQuery__
 *
 * To run a query within a React component, call `usePollDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `usePollDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePollDetailQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePollDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PollDetailQuery, PollDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<PollDetailQuery, PollDetailQueryVariables>(PollDetailDocument, baseOptions);
      }
export function usePollDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PollDetailQuery, PollDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PollDetailQuery, PollDetailQueryVariables>(PollDetailDocument, baseOptions);
        }
export type PollDetailQueryHookResult = ReturnType<typeof usePollDetailQuery>;
export type PollDetailLazyQueryHookResult = ReturnType<typeof usePollDetailLazyQuery>;
export type PollDetailQueryResult = ApolloReactCommon.QueryResult<PollDetailQuery, PollDetailQueryVariables>;