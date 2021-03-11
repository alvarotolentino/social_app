import { gql } from '@apollo/client';

export const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createAt
      username
      likes {
        id
        username
        createAt
      }
      likeCount
      comments {
        id
        body
        username
        createAt
      }
      commentCount
    }
  }
`;
