/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useRouter } from 'next/router'
import { MdCreditScore, MdAccessTime } from 'react-icons/md'
import { FaGooglePay, FaApplePay } from 'react-icons/fa'
import { GrPaypal } from 'react-icons/gr'
import { BiHandicap } from 'react-icons/bi'
import { BsCashCoin } from 'react-icons/bs'
import { Ri24HoursLine } from 'react-icons/ri'
import { TbToiletPaper } from 'react-icons/tb'

export default function Home({ posti_liberi }: any) {
    console.log('🚀 - file: index.tsx - line 20 - Home - posti_liberi', posti_liberi)

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
                    <div className="container absolute inset-x-0 z-50 mx-auto h-5/6 w-5/6  flex-row overflow-y-auto rounded-lg rounded-br-xl border bg-white p-8 shadow-lg">
                        <p className="text-xl font-semibold">Parking-Lot (VI) parking 🅿️</p>{' '}
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
                            <p className="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">4 di 5</p>
                        </div>
                        <div className="grid-row-1 xl:grid-row-2  m-4 grid grid-cols-1 gap-4 rounded-lg bg-indigo-50 p-8 xl:grid-cols-2 ">
                            <div>
                                <p>Posti disponibili</p>
                                <p className="mt-4 flex w-fit items-center space-x-4 rounded-lg bg-white p-4  shadow-lg">
                                    <p>
                                        Piano 1{' '}
                                        <p className="font-semibold text-indigo-800">{posti_liberi.piano1_TOT}</p>
                                    </p>
                                    <p>
                                        Piano 2{' '}
                                        <p className="font-semibold text-indigo-800">{posti_liberi.piano2_TOT}</p>
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
                                        <p className="text-semibold">0.75 € / Ora </p>
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
                </>
            </main>
            <Footer />
        </>
    )
}

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const resPosti = await fetch('https://node-api-esame.azurewebsites.net/parcheggi/liberi')
    const posti_liberi = await resPosti.json()
    console.log('🚀 - file: index.tsx - line 156 - constgetStaticProps:GetStaticProps= - posti_liberi', posti_liberi)

    return {
        props: {
            posti_liberi: posti_liberi,
        },
    }
}
