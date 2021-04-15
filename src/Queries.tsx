import { gql } from '@apollo/client';

export const GET_LISTS = gql`
query ($user: String!){
  MediaListCollection(userName: $user, type: ANIME) {
    lists {
      entries {
        id
        status
        media {
          id
          title {
            userPreferred
          }
          startDate {
            year
            month
            day
          }
          format
          coverImage {
            medium
            color
          }
          relations {
            edges {
              id
              relationType
              node {
                id
                title {
                  userPreferred
                }
                startDate {
                  year
                  month
                  day
                }
                format
              }
            }
          }
        }
      }
      name
      isCustomList
      isSplitCompletedList
    }
  }
}
`;