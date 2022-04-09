import { gql } from '@apollo/client'
// import axios, { AxiosResponse } from 'axios'
import type {
    // GetStaticProps,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next/types'

import { Layout } from '../../components/shared/Layout'
import { Character, Maybe, Query } from '../../generated/graphql'
import client from '../../graphql-client/apollo-client'
// import { ICharacter } from '../../types/character.type'

// export const getStaticProps: GetStaticProps<{ character: ICharacter }> = async ({
//     params,
// }) => {
//     // console.log(params?.id)

//     let character: ICharacter = {} as ICharacter

//     // await axios('https://rickandmortyapi.com/api/character/1')

//     return {
//         props: {
//             character,
//         },
//     }
// }

export const getServerSideProps: GetServerSideProps<{
    character: Maybe<Character>
}> = async ({ params }) => {
    const QUERY_GET_CHARACTER = gql`
        query Character {
            character(id: ${params?.id}) {
                id
                name
                image
                species
                status
                origin {
                    dimension
                }
            }
        }
    `

    const { data } = await client.query<Query>({ query: QUERY_GET_CHARACTER })
    let character = data?.character || null

    return {
        props: {
            character,
        },
    }
}

const CharacterDetail = ({
    character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title={character?.name || 'Character Detail'}
            metaData={{
                name: 'description',
                content: `Page description about ${character?.name}`,
            }}>
            {/* <div>Character tail</div> */}
            {/* <div>{character?.name}</div> */}
            <pre>{JSON.stringify(character, null, 2)}</pre>
        </Layout>
    )
}

export default CharacterDetail
