import { gql } from '@apollo/client';

export const GET_LISTS = gql`
query ($user: String!, $type: MediaType){
  MediaListCollection(userName: $user, type: $type) {
    lists {
      entries {
        id
        status
        media {
          id
          siteUrl
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
          bannerImage 
          relations {
            edges {
              id
              relationType
              node {
                id
                title {
                  userPreferred
                }
                siteUrl
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