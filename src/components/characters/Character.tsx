import Image from 'next/image'
import Link from 'next/link'

import type { Character, Maybe } from '../../generated/graphql'

type CharacterProps = {
    character: Maybe<Character>
}

export const CharacterItem = ({ character }: CharacterProps) => {
    return (
        <Link href={`/characters/${character?.id}`} passHref>
            <div className="bg-white flex flex-col items-center gap-2 p-4 hover:cursor-pointer hover:font-bold">
                <Image
                    src={character?.image!}
                    height={300}
                    width={300}
                    alt={`Image of ${character?.name}`}
                    layout="intrinsic"
                    className="hover:opacity-20 hover:animate-pulse"
                />
                <a className="text-xl">{character?.name}</a>
            </div>
        </Link>
    )
}
