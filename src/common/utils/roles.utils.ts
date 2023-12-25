import { gql } from '@apollo/client';
import client from '../../apollo/client';

export const fetchRoles = async () => {
  try {
    const response = await client.query({
      query: gql`
        query Roles {
          roles {
            id
            name
            users {
              id
              username
              email
            }
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
    console.log({ apolloError: error });
    throw error;
  }
};
