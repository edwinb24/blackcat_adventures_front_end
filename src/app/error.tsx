'use client'

import sharedClasses from '@/sharedStyles.module.css'
import Link from 'next/link'
import {useEffect} from 'react'

// Shows when a page fails to load (for example, the CMS does not respond).
// The header and the footer stay visible.
const ErrorPage = ({
    error,
    reset,
}: {
    error: Error & {digest?: string}
    reset: () => void
}) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>
                Sorry, this page could not load.
            </h1>
            <p className={sharedClasses.mainTitle}>
                <button type='button' onClick={reset}>
                    Try again
                </button>
            </p>
        </main>
    )
}

export default ErrorPage
