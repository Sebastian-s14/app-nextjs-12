import Link from 'next/link'

import { ILink } from './Navbar'

type CustomLinkProps = {
    link: ILink
}

export const CustomLink = ({ link: { name, path } }: CustomLinkProps) => {
    return (
        <li className="bg-blue-400 px-2.5 py-1 rounded-lg font-bold hover:bg-blue-600 hover:text-white">
            <Link href={path}>
                <a>{name}</a>
            </Link>
        </li>
    )
}
