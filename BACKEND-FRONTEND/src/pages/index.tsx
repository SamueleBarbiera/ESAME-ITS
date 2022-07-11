/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { fetcher } from '../content/lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { AiOutlineLoading } from 'react-icons/ai'
import { MdCreditScore, MdAccessTime } from 'react-icons/md'
import { FaGooglePay, FaApplePay } from 'react-icons/fa'
import { GrPaypal } from 'react-icons/gr'
import { BiHandicap } from 'react-icons/bi'
import { BsCashCoin } from 'react-icons/bs'
import { Ri24HoursLine } from 'react-icons/ri'
import { TbToiletPaper } from 'react-icons/tb'

export default function Home({ posti_liberi }: any) {
    const [loading, setLoading] = useState(true)
    const Router = useRouter()
    const { clearCart } = useShoppingCart()
    const url: any = '/cart/Checkout'

    useEffect(() => {
        clearCart()
    }, [])

    const { data, error } = useSWR('/api/data/durata/checkLastRecord', fetcher, {
        refreshInterval: 1000,
    })

    if (data == null || data == 'undefined' || error || !data) {
        return (
            <>
                <Head>
                    <title>Home</title>
                    <link rel="icon" href="/icon-512x512.png" />
                    <meta charSet="utf-8" className="next-head" />
                </Head>
                <Header />
                <main className="relative mx-auto flex h-screen  items-center justify-center">
                    <>
                        {loading && (
                            <div className="absolute flex h-5/6 w-5/6 flex-col items-center justify-center rounded-xl bg-indigo-50 p-12 shadow-lg">
                                <AiOutlineLoading className="mb-6 h-12 w-12 flex-shrink-0 animate-spin flex-row text-indigo-600" />
                                <h1 className=" animate-pulse flex-row font-normal">Inizializando la mappa</h1>
                            </div>
                        )}
                        <div className="absolute  mb-16 h-5/6 w-5/6 flex-col items-center justify-center rounded-lg shadow-xl">
                            <div className="container absolute inset-x-0 -bottom-1/4 left-2/4 z-50 m-20 mx-auto h-52 w-2/4 flex-row overflow-y-auto rounded-br-xl border bg-white p-8 shadow-sm">
                                <p className="text-xl font-semibold">Bugseating parking 🅿️</p>{' '}
                                <div className="mt-2 flex items-center">
                                    <svg
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-gray-300 dark:text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <p className="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                        4 di 5
                                    </p>
                                </div>
                                <div className="grid-row-1 xl:grid-row-2 absolute m-4 grid grid-cols-1 gap-4 rounded-lg bg-indigo-50 p-8 xl:grid-cols-2 ">
                                    <div>
                                        <p>Posti disponibili</p>
                                        <p className="mt-4 flex w-fit items-center space-x-4 rounded-lg bg-white p-4  shadow-lg">
                                            <p>
                                                Piano 1{' '}
                                                <p className="font-semibold text-indigo-800">
                                                    {posti_liberi.piano1_TOT}
                                                </p>
                                            </p>
                                            <p>
                                                Piano 2{' '}
                                                <p className="font-semibold text-indigo-800">
                                                    {posti_liberi.piano2_TOT}
                                                </p>
                                            </p>
                                        </p>
                                    </div>

                                    <div>
                                        <p>Modalità di pagamento</p>
                                        <div className="grid-row-3 grid grid-cols-3 items-center gap-4 ">
                                            <div className="mt-4 rounded-lg  bg-white  p-4 shadow-lg">
                                                <MdCreditScore className="h-5 w-5 text-indigo-800" />
                                            </div>
                                            <div className="mt-4 rounded-lg bg-white p-3 shadow-lg">
                                                <FaGooglePay className="h-7 w-7 text-indigo-800" />
                                            </div>
                                            <div className="mt-4 rounded-lg bg-white p-3 shadow-lg">
                                                <FaApplePay className="h-7 w-7 text-indigo-800" />
                                            </div>
                                            <div className="mt-4  rounded-lg bg-white p-4 shadow-lg">
                                                <GrPaypal className="h-5 w-5 text-indigo-800" />
                                            </div>
                                            <div className="mt-4  rounded-lg bg-white p-4 shadow-lg">
                                                <BsCashCoin className="h-5 w-5 text-indigo-800" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Costo medio ad ora</p>
                                        <div className="flex items-center space-x-4">
                                            <div className="mt-4 inline-flex w-fit space-x-4 rounded-lg bg-white p-4 shadow-lg">
                                                <p className="text-semibold">1.5 € / H </p>
                                                <MdAccessTime className="h-5 w-5 text-indigo-800" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p>Agevolazioni disponibili</p>
                                        <div className="flex items-center space-x-4">
                                            <div className="mt-4  rounded-lg bg-white p-4 shadow-lg">
                                                <BiHandicap className="h-5 w-5 text-indigo-800" />
                                            </div>
                                            <div className="mt-4  rounded-lg bg-white p-4 shadow-lg">
                                                <Ri24HoursLine className="h-5 w-5 text-indigo-800" />
                                            </div>
                                            <div className="mt-4  rounded-lg bg-white p-4 shadow-lg">
                                                <TbToiletPaper className="h-5 w-5 text-indigo-800" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </main>
                <Footer />
            </>
        )
    } else {
        const costo_fin: any = JSON.parse(JSON.stringify(data.avviaPagamento))
        Router.push({ pathname: url, query: { costo_finale: JSON.stringify(costo_fin) } }, url)
        return null
    }
}

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const resPosti = await fetch(`${process.env.NEXT_URL}/api/data/parcheggi/liberi`)
    const posti_liberi = await resPosti.json()

    return {
        props: {
            posti_liberi: posti_liberi,
        },
    }
}
