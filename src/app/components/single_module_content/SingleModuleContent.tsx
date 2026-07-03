'use client'
import Image from 'next/image'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import {useGetSingleModuleQuery} from './graphql/useGetSingleModuleContentQuery'

type SingleModuleContent = {
    title: string
    description: string
    imageLink: string
}

export default function SingleModuleContent({
    moduleName,
}: {
    moduleName: string
}) {
    const {data, error, loading} = useGetSingleModuleQuery(moduleName)
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (
        !data ||
        !data?.modules ||
        !data.modules?.nodes ||
        !data.modules.nodes[0]?.modules ||
        data.modules.nodes.length < 1
    ) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }
    console.log('data.modules.nodes[0]?.modules')
    console.log(data.modules.nodes[0].modules?.description)
    const {title, description, imageLink}: SingleModuleContent = {
        ...data.modules.nodes[0],
        ...data.modules.nodes[0].modules,
        imageLink:
            data.modules.nodes[0].modules?.additionalImage?.node.link || '',
    } as SingleModuleContent

    const moduleImage = imageLink ? (
        <div>
            <Image src={imageLink} width={300} height={100} alt='Logo' />
        </div>
    ) : null

    return (
        <main>
            <Link href='/'>Return to Home</Link>
            <h1>{title}</h1>
            {ReactHtmlParser(description)}
            {moduleImage}
        </main>
    )
}
