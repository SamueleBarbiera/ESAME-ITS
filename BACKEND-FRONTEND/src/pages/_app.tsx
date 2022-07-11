import { AppType } from 'next/dist/shared/lib/utils'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <>
            <NextNProgress
                nonce="my-nonce"
                color="#3b0067"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
