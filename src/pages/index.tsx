import type { InferGetStaticPropsType } from 'next'
import axios, { AxiosResponse } from 'axios'

import { Layout } from '../components/shared/Layout'

export interface IUser {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

export interface Geo {
    lat: string
    lng: string
}

export interface Company {
    name: string
    catchPhrase: string
    bs: string
}

export const getStaticProps = async () => {
    console.log('get static props')
    let users: IUser[] = []
    await axios('http://jsonplaceholder.typicode.com/users').then(
        ({ data }: AxiosResponse<IUser[]>) => (users = data),
    )

    return {
        props: {
            users,
        },
    }
}

const Home = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className="w-1/2 h-full">
            <h2 className="bg-purple-400 flex items-center justify-center text-white text-2xl font-bold">
                My Users
            </h2>
            <ul className="bg-green-500 flex flex-col overflow-y-scroll h-full">
                {users.map((u) => (
                    <li key={u.id} className="bg-green-200 p-2 m-5">
                        {u.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home

const getLayout = (page: React.ReactElement) => {
    return <Layout title="Home Page">{page}</Layout>
}

Home.getLayout = getLayout
