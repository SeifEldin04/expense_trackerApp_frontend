import React, { useEffect, useState } from 'react'
import useStore from '../store'
import { FaBtc, FaPaypal, FaSpinner } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import { RiVisaLine } from 'react-icons/ri';
import api from '../libs/apiCall'
import { toast } from 'sonner';
import Title from '../components/title';
import { MdAdd, MdVerifiedUser } from 'react-icons/md';
import AccountMenu from '../components/accountDialog';
import { formatCurrency, maskAccountNumber } from '../libs';
import AddAccount from '../components/addAccount';
import AddMoney from '../components/addMoneyAccount';
import TransferMoney from '../components/transferMoney';


const ICONS = {
    crypto: (
        <div className='w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full'>
            <FaBtc size={26} />
        </div>
    ),
    "visa debit card": (
        <div className='w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full'>
            <RiVisaLine size={26} />
        </div>
    ),
    cash: (
        <div className='w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full'>
            <GiCash size={26} />
        </div>
    ),
    paypal: (
        <div className='w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full'>
            <FaPaypal size={26} />
        </div>
    ),
};

const AccountPage = () => {
    const { user } = useStore((state) => state)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTopup, setIsOpenTopup] = useState(false)
    const [isOpenTransfer, setIsOpenTransfer] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const fetchAccounts = async () => {
        try {
            const { data: res } = await api.get('/account')
            console.log(res?.accounts);

            setData(res?.accounts)
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || "Something went wrong")

            if (err?.response?.data?.status === 'auth-failed') {
                localStorage.removeItem('user')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenAddMoney = (el) => {
        setSelectedAccount(el.id)
        setIsOpenTopup(true)
    }

    const handleTransferMoney = (el) => {
        setSelectedAccount(el.id)
        setIsOpenTransfer(true)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchAccounts()
    }, [])


    if (isLoading) {
        return <>
            <div className='flex justify-center items-center py-2'>
                <FaSpinner className='animate-spin text-violet-600' size={28} />
            </div>
        </>
    }
    return (
        <>
            <div className='py-10 w-full'>
                <div className="flex items-center justify-between">
                    <Title title='Accounts Information' />

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className='py-1.5 px-2 rounded bg-black dark:bg-violet-600 text-white dark:text-white flex items-center
                        justify-center gap-2 border border-gray-500'
                        >

                            <MdAdd size={22} />
                            <span>Add</span>
                        </button>
                    </div>
                </div>

                {data?.length === 0 ? (
                    <>
                        <div className="w-full flex items-center justify-center py-10 text-gray-600 dark:text-gray-700 text-lg">
                            <span> No Account Found</span>
                        </div>
                    </>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 py-10">
                        {data?.map((acc, index) => (
                            <div
                                key={index}
                                className='w-full h-48 flex gap-4 bg-gray-50 dark:bg-slate-800 p-3 rounded shadow'
                            >
                                {console.log("Created At Value:", acc?.createdat)}
                                <div>
                                    {ICONS[acc?.account_name?.toLowerCase()]}
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center mt-1">
                                            <p className='text-black dark:text-white text-2xl font-bold'>
                                                {acc?.account_name}
                                            </p>

                                            <MdVerifiedUser size={26} className='text-emerald-600 ml-1' />
                                        </div>

                                        <AccountMenu
                                            addMoney={() => handleOpenAddMoney(acc)}
                                            transferMoney={() => handleTransferMoney(acc)}
                                        />
                                    </div>

                                    <span className='text-gray-600 dark:text-gray-400 leading-loose text-sm'>
                                        {maskAccountNumber(acc?.account_number)}
                                    </span>

                                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                                        {acc?.createdat && !isNaN(new Date(acc.createdat))
                                            ? new Date(acc.createdat).toLocaleDateString('en-US', {
                                                dateStyle: 'full',
                                            })
                                            : 'No Date'}
                                    </p>


                                    <div className='flex items-center justify-between'>
                                        <p className='text-xl text-gray-600 dark:text-gray-400 font-medium'>
                                            {formatCurrency(acc?.account_balance)}
                                        </p>

                                        <button
                                            onClick={() => handleOpenAddMoney(acc)}
                                            className='text-sm outline-none text-violet-600 hover:underline'
                                        >
                                            Add Money
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddAccount
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refetch={fetchAccounts}
                key={new Date().getTime()}
            />

            <AddMoney
                isOpen={isOpenTopup}
                setIsOpen={setIsOpenTopup}
                id={selectedAccount}
                refetch={fetchAccounts}
                key={new Date().getTime() + 1}
            />

            <TransferMoney
                isOpen={isOpenTransfer}
                setIsOpen={setIsOpenTransfer}
                id={selectedAccount}
                refetch={fetchAccounts}
                key={new Date().getTime() + 2}
            />
        </>
    )
}

export default AccountPage