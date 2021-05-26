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
            extraLarge
            medium
            color
          }
          bannerImage
          popularity
          siteUrl
          chapters
          volumes
          episodes
          duration
          nextAiringEpisode {
            episode
          }
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
                extraLarge
                medium
                color
              }
              bannerImage
              popularity
              siteUrl
              chapters
              volumes
              episodes
              duration
              nextAiringEpisode {
                episode
              }
              status(version: 2)
            }
            edges {
              id
              relationType(version: 2)
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

export const GET_USER = gql`
query($user: String!){
  User(name: $user) {
   name
    bannerImage
    avatar {
      medium
    }
    options {
      profileColor
      titleLanguage
      displayAdultContent
      airingNotifications 
    }
  }
}
`;