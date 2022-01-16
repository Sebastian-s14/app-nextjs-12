import { CustomLink } from './CustomLink'

export interface ILink {
    name: string
    path: string
}

const links: ILink[] = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Users',
        path: '/users',
    },
    {
        name: 'Tasks',
        path: '/tasks',
    },
    {
        name: 'Characters',
        path: '/characters',
    },
]

export const Navbar = () => {
    return (
        <nav className="bg-gray-500">
            <ul className="flex gap-2 p-4">
                {links.map((l) => (
                    <CustomLink key={l.name} link={l} />
                ))}
            </ul>
        </nav>
    )
}
