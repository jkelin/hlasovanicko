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
  options: Array<PollOption>;
};

export type PollOption = {
  __typename?: 'PollOption';
  id: Scalars['String'];
  title: Scalars['String'];
  poll: Poll;
  order: Scalars['Int'];
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
  createPollOption: PollOption;
  deletePollOption: Poll;
  updatePollOption: PollOption;
  createPoll: Poll;
  updatePoll: Poll;
};


export type MutationCreatePollOptionArgs = {
  pollId: Scalars['ID'];
};


export type MutationDeletePollOptionArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePollOptionArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type MutationUpdatePollArgs = {
  title?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type CreateOptionMutationVariables = Exact<{
  pollId: Scalars['ID'];
}>;


export type CreateOptionMutation = (
  { __typename?: 'Mutation' }
  & { option: (
    { __typename?: 'PollOption' }
    & Pick<PollOption, 'id'>
    & { poll: (
      { __typename?: 'Poll' }
      & Pick<Poll, 'id'>
      & { options: Array<(
        { __typename?: 'PollOption' }
        & Pick<PollOption, 'id'>
      )> }
    ) }
  ) }
);

export type CreatePollMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePollMutation = (
  { __typename?: 'Mutation' }
  & { poll: (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'slug' | 'isNew'>
  ) }
);

export type UpdatePollOptionTitleMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdatePollOptionTitleMutation = (
  { __typename?: 'Mutation' }
  & { option: (
    { __typename?: 'PollOption' }
    & Pick<PollOption, 'id' | 'title'>
  ) }
);

export type UpdatePollTitleMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdatePollTitleMutation = (
  { __typename?: 'Mutation' }
  & { poll: (
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
    & { options: Array<(
      { __typename?: 'PollOption' }
      & Pick<PollOption, 'id' | 'title' | 'order'>
    )> }
  ) }
);


export const CreateOptionDocument = gql`
    mutation CreateOption($pollId: ID!) {
  option: createPollOption(pollId: $pollId) {
    id
    poll {
      id
      options {
        id
      }
    }
  }
}
    `;
export type CreateOptionMutationFn = ApolloReactCommon.MutationFunction<CreateOptionMutation, CreateOptionMutationVariables>;

/**
 * __useCreateOptionMutation__
 *
 * To run a mutation, you first call `useCreateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOptionMutation, { data, loading, error }] = useCreateOptionMutation({
 *   variables: {
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useCreateOptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOptionMutation, CreateOptionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOptionMutation, CreateOptionMutationVariables>(CreateOptionDocument, baseOptions);
      }
export type CreateOptionMutationHookResult = ReturnType<typeof useCreateOptionMutation>;
export type CreateOptionMutationResult = ApolloReactCommon.MutationResult<CreateOptionMutation>;
export type CreateOptionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOptionMutation, CreateOptionMutationVariables>;
export const CreatePollDocument = gql`
    mutation CreatePoll {
  poll: createPoll {
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
export const UpdatePollOptionTitleDocument = gql`
    mutation UpdatePollOptionTitle($id: ID!, $title: String!) {
  option: updatePollOption(id: $id, title: $title) {
    id
    title
  }
}
    `;
export type UpdatePollOptionTitleMutationFn = ApolloReactCommon.MutationFunction<UpdatePollOptionTitleMutation, UpdatePollOptionTitleMutationVariables>;

/**
 * __useUpdatePollOptionTitleMutation__
 *
 * To run a mutation, you first call `useUpdatePollOptionTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollOptionTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollOptionTitleMutation, { data, loading, error }] = useUpdatePollOptionTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdatePollOptionTitleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePollOptionTitleMutation, UpdatePollOptionTitleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePollOptionTitleMutation, UpdatePollOptionTitleMutationVariables>(UpdatePollOptionTitleDocument, baseOptions);
      }
export type UpdatePollOptionTitleMutationHookResult = ReturnType<typeof useUpdatePollOptionTitleMutation>;
export type UpdatePollOptionTitleMutationResult = ApolloReactCommon.MutationResult<UpdatePollOptionTitleMutation>;
export type UpdatePollOptionTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePollOptionTitleMutation, UpdatePollOptionTitleMutationVariables>;
export const UpdatePollTitleDocument = gql`
    mutation UpdatePollTitle($id: ID!, $title: String!) {
  poll: updatePoll(id: $id, title: $title) {
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
    options {
      id
      title
      order
    }
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