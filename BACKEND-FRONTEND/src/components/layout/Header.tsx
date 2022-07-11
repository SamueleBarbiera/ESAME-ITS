/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable no-unused-vars */
import { RefreshIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {  FaParking } from 'react-icons/fa'
import { Fragment ,useState} from 'react'
import { AiTwotoneCar } from 'react-icons/ai'

const navigation = {
    pages: [
        {
            name: 'Home',
            href: '/',
            icon: <AiTwotoneCar className="h-6 w-6 flex-shrink-0 text-indigo-900" aria-hidden="true" />,
        },
        {
            name: 'Parcheggi',
            href: '/Parcheggi',
            icon: <FaParking className="h-6 w-6 flex-shrink-0 text-indigo-900" aria-hidden="true" />,
        },
    ],
}


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Mobile menu */}
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="fixed  inset-0 z-40 flex lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="bg-indigo fixed inset-0 bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex w-2/3 flex-col overflow-y-auto bg-indigo-50 pb-8 shadow-xl md:hidden">
                            <div className="flex p-2 ">
                                <button
                                    type="button"
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-indigo-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <XIcon className="h-6 w-6 text-indigo-900" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="space-y-6 py-6 px-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a
                                            href={page.href}
                                            className="-m-2 mb-1 block justify-between rounded-lg bg-indigo-200 p-2 font-medium text-indigo-900"
                                        >
                                            <div className="flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex  w-full min-w-full justify-between text-sm font-medium text-gray-900">
                                                        <p className=" items-end">{page.name}</p>
                                                        <p className=" items-start">{page.icon}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            {/* Hero section */}
            <div className="relative bg-indigo-50">
                {/* Decorative image and overlay */}
                <div aria-hidden="true" className="absolute inset-0 bg-indigo-300 opacity-50 " />
                {/* Navigation */}
                <header className="relative z-10">
                    <nav aria-label="Top">
                        {/* Secondary navigation */}
                        <div className="bg-indigo-50 bg-opacity-10 backdrop-blur-md backdrop-filter">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div>
                                    <div className="flex h-16 items-center justify-between">
                                        {/* Logo (lg+) */}
                                        <div className="hidden md:flex md:flex-1 lg:items-center">
                                            <a href="/" className="flex-shrink-0">
                                                <AiTwotoneCar
                                                    className="h-6 w-6 flex-shrink-0 text-indigo-900"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>

                                        <div className="hidden h-full md:flex">
                                            {/* Flyout menus */}
                                            <Popover.Group className="inset-x-0 bottom-0 px-4">
                                                <div className="flex h-full items-center justify-between space-x-8">
                                                    <a
                                                        key={navigation?.pages[1]?.name}
                                                        href={navigation?.pages[1]?.href}
                                                        className="flex items-center gap-x-2 text-sm  font-medium text-indigo-900"
                                                    >
                                                        <p className="items-start">{navigation?.pages[1]?.name} </p>
                                                        <p className="items-end">{navigation?.pages[1]?.icon}</p>
                                                    </a>
                                                </div>
                                            </Popover.Group>
                                        </div>

                                        {/* Mobile menu and search (lg-) */}
                                        <div className="flex flex-1 items-center md:hidden">
                                            <button
                                                type="button"
                                                className="-ml-2 p-2 text-indigo-900"
                                                onClick={() => setMobileMenuOpen(true)}
                                            >
                                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        <div className="flex flex-1 items-center justify-end">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    )
}
