import axios, { AxiosResponse } from 'axios'
import type {
    GetStaticProps,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next/types'

import { Layout } from '../../components/shared/Layout'
import { ICharacter } from '../../types/character.type'

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

export const getServerSideProps: GetServerSideProps<{ character: ICharacter }> = async ({
    params,
}) => {
    console.log('params', params)
    let character: ICharacter = {} as ICharacter

    await axios(`https://rickandmortyapi.com/api/character/${params?.id}`).then(
        ({ data }: AxiosResponse<ICharacter>) => {
            console.log(data)
            character = data
        },
    )

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
        <Layout title="Character Detail">
            <div>Character tail</div>
            <div>{character?.name}</div>
        </Layout>
    )
}

export default CharacterDetail
