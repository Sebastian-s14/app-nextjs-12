import { ChangeEvent, useEffect, useState } from 'react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import { gql, useLazyQuery } from '@apollo/client'

import { Layout } from '../../components/shared/Layout'
import client from '../../graphql-client/apollo-client'
import type { Character, Characters, Maybe, Query } from '../../generated/graphql'
import { CharacterItem } from '../../components/characters/Character'

const QUERY = gql`
    query Characters($filter: FilterCharacter) {
        characters(filter: $filter) {
            results {
                id
                name
                image
            }
        }
    }
`

export const getStaticProps: GetStaticProps<{
    characters: Maybe<Character>[]
}> = async () => {
    const { data } = await client.query<Query>({ query: QUERY })
    // console.log('data', data.characters)
    let characters = data.characters?.results ?? []

    return {
        props: {
            characters,
        },
    }
}

const Characters = ({ characters }: InferGetStaticPropsType<typeof getStaticProps>) => {
    // const [searchName, setSearchName] = useState<string>('')
    // const { data } = useQuery<Query>(QUERY, { ssr: false })
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false)
    const [getCharacters, { data, loading, error, refetch }] = useLazyQuery<Query>(
        QUERY,
        { ssr: false, fetchPolicy: 'cache-first' },
    )

    const filterCharacters = ({ target }: ChangeEvent<HTMLInputElement>) => {
        console.log(target.value)
        if (!target.value.trim().length) return
        setTimeout(() => {
            console.log('execute query')
            getCharacters({ variables: { filter: { name: target.value } } })
        }, 2000)
    }

    useEffect(() => {
        // console.log('searchName', searchName)
        console.log('data', data)
    }, [data])

    return (
        <Layout
            title="Characters Page"
            metaData={{
                name: 'description',
                content: 'List of characters of Rick and Morty',
            }}>
            <div className="w-full h-full flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold">This is the Characters page</h1>
                <div className="flex justify-center items-center gap-2">
                    <button
                        className="flex justify-center items-center gap-2 bg-purple-500 py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white shadow-lg"
                        onClick={() => setIsActiveSearch(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 animate-bounce"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        Buscar
                    </button>

                    {isActiveSearch && (
                        <button
                            className="flex justify-center items-center gap-2 bg-red-500 py-2 px-4 rounded-md hover:bg-red-700 hover:text-white shadow-lg"
                            onClick={() => setIsActiveSearch(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Cancelar
                        </button>
                    )}
                </div>
                {isActiveSearch && (
                    <input
                        className="flex w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Search for character's name..."
                        type="text"
                        // onChange={({ target }) =>
                        //     refetch({
                        //         filter: {
                        //             name: target.value,
                        //         },
                        //     })
                        // }
                        onChange={filterCharacters}
                    />
                )}
                <ul className="bg-white flex flex-row flex-wrap items-center justify-center overflow-y-scroll h-full gap-4">
                    {!isActiveSearch &&
                        characters.map((c) => (
                            <li key={c?.id}>
                                <CharacterItem character={c} />
                            </li>
                        ))}
                    {isActiveSearch &&
                        data &&
                        data.characters?.results?.map((c) => (
                            <li key={c?.id}>
                                <CharacterItem character={c} />
                            </li>
                        ))}
                </ul>
            </div>
        </Layout>
    )
}

export default Characters
