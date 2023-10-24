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
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};
