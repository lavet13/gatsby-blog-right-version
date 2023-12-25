import client from '../../apollo/client';

import { gql } from '@apollo/client';

export const fetchMe = async () => {
  try {
    const response = await client.query({
      query: gql`
        query Me {
          me {
            id
            username
            email
            createdAt
            updatedAt
          }
        }
      `,
      fetchPolicy: 'network-only',
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUser = async (values: any) => {
  try {
    const { login, password } = values;

    const response = await client.mutate({
      mutation: gql`
        mutation SignIn($login: String!, $password: String!) {
          signIn(login: $login, password: $password) {
            token
          }
        }
      `,
      variables: {
        login,
        password,
      },
    });

    if (response.errors) {
      throw response.errors;
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};
