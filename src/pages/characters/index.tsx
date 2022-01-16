import type { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import Link from 'next/link'
import { gql } from '@apollo/client'

import { Layout } from '../../components/shared/Layout'
import { ICharacter } from '../../types/character.type'
import client from '../../graphql-client/apollo-client'

interface IResponseAPI {
    info: {
        count: number
        pages: number
        next: string
        prev: number
    }
    results: ICharacter[]
}

interface IResponseGraphQL {
    characters: IResponseAPI
}

export const getStaticProps: GetStaticProps<{ characters: ICharacter[] }> = async () => {
    // let characters: ICharacter[] = []

    // await axios('https://rickandmortyapi.com/api/character').then(
    //     ({ data }: AxiosResponse<IResponseAPI>) => {
    //         console.log(data)
    //         characters = data.results
    //     },
    // )

    const { data } = await client.query<IResponseGraphQL>({
        query: gql`
            query Characters {
                characters {
                    results {
                        id
                        name
                        image
                    }
                }
            }
        `,
    })
    // console.log('data', data)
    let characters: ICharacter[] = data.characters.results
    // console.log('characters', characters)

    return {
        props: {
            characters,
        },
    }
}

const Characters = ({ characters }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout
            title="Characters Page"
            metaData={{
                name: 'description',
                content: 'List of characters of Rick and Morty',
            }}>
            <div className="w-1/2 h-full">
                <h2>This is the Characters page</h2>
                <ul className="bg-green-500 flex flex-col overflow-y-scroll h-full gap-2">
                    {characters.map((c) => (
                        <li key={c.id}>
                            <Link href={`/characters/${c.id}`}>
                                <a className="flex w-full bg-orange-400 p-4 hover:bg-purple-500">
                                    {c.name}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default Characters
