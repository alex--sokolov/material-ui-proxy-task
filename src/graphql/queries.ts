import { gql } from '@apollo/client';

// export const LOAD_INDIVIDUAL_POSITIONS = gql`
//     query {
//         data {
//               id
//               name
//         }
//     }`;



export const LOAD_COMPANY_RELATIONS = gql`
    query {
      applicantIndividualCompanyRelations {
        data {
          id
          name
        }
      }
    }`;

export const LOAD_INDIVIDUAL_POSITIONS = gql`
    query {
      applicantIndividualCompanyPositions {
        data {
          id
          name
        }
      }
    }`;

export const FILTER_BY_COMPANY_POSITIONS = gql`
    query {
      applicantIndividualCompanyPositions(where:{column:NAME, operator:LIKE, value:"Director"})
        {
          data {
            id
            name
          }
        }
      }`;



