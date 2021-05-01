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
          title {
            userPreferred
            romaji
            english
          }
          synonyms
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
          popularity
          siteUrl
          episodes
          duration
          status(version: 2)
          relations {
            nodes {
              id
              title {
                userPreferred
                romaji
                english
              }
              synonyms
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
              popularity
              siteUrl
              episodes
              duration
              status(version: 2)
            }
            edges {
              id
              relationType
              node {
                id
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