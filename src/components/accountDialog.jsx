import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { MdMoreVert } from 'react-icons/md'
import TransitionWrapper from './wrappers/transitionWrapper'
import { BiTransfer } from 'react-icons/bi'

export default function AccountMenu({ addMoney, transferMoney }) {
    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <MenuButton className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-200 focus:outline-none'>
                    <MdMoreVert />
                </MenuButton>

                <TransitionWrapper>
                    <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className="px-1 py-1 space-y-2">
                            <MenuItem>
                                {({ }) => (
                                    <button
                                        onClick={transferMoney}
                                        className={'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}
                                    >
                                        <BiTransfer />
                                        Transfer Funds
                                    </button>
                                )}
                            </MenuItem>

                            <MenuItem>
                                {({ }) => (
                                    <button
                                        onClick={addMoney}
                                className={'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}
                                    >
                                        <span>Add Money</span>
                                    </button>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </TransitionWrapper>
            </Menu>
        </>
    )
}
