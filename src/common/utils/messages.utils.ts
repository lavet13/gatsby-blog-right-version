import { gql } from '@apollo/client';
import client from '../../apollo/client';

export const fetchMessages = async () => {
  try {
    const response = await client.query({
      query: gql`
        query Messages {
          messages {
            edges {
              cursor
              node {
                id
                text
                sender {
                  id
                  username
                  email
                }
                receiver {
                  id
                  username
                  email
                }
                createdAt
                updatedAt
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
            totalCount
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
