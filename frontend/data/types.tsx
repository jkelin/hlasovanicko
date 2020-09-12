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

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  vote: Vote;
};


export type QueryVoteArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createVote: Vote;
};


export type MutationCreateVoteArgs = {
  title: Scalars['String'];
};

export type CreateVoteMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateVoteMutation = (
  { __typename?: 'Mutation' }
  & { createVote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'id' | 'title'>
  ) }
);

export type VoteByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VoteByIdQuery = (
  { __typename?: 'Query' }
  & { vote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'id' | 'title'>
  ) }
);


export const CreateVoteDocument = gql`
    mutation CreateVote($title: String!) {
  createVote(title: $title) {
    id
    title
  }
}
    `;
export type CreateVoteMutationFn = ApolloReactCommon.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, baseOptions);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = ApolloReactCommon.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const VoteByIdDocument = gql`
    query VoteById($id: ID!) {
  vote(id: $id) {
    id
    title
  }
}
    `;

/**
 * __useVoteByIdQuery__
 *
 * To run a query within a React component, call `useVoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VoteByIdQuery, VoteByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<VoteByIdQuery, VoteByIdQueryVariables>(VoteByIdDocument, baseOptions);
      }
export function useVoteByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VoteByIdQuery, VoteByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VoteByIdQuery, VoteByIdQueryVariables>(VoteByIdDocument, baseOptions);
        }
export type VoteByIdQueryHookResult = ReturnType<typeof useVoteByIdQuery>;
export type VoteByIdLazyQueryHookResult = ReturnType<typeof useVoteByIdLazyQuery>;
export type VoteByIdQueryResult = ApolloReactCommon.QueryResult<VoteByIdQuery, VoteByIdQueryVariables>;