import React, { useEffect, useState } from 'react'
import useStore from '../store'
import { useForm } from 'react-hook-form';
import api from '../libs/apiCall';
import DialogWrapper from './wrappers/dialogWrapper';
import Loading from './Loading';
import { formatCurrency } from '../libs';
import { MdOutlineWarning } from 'react-icons/md';
import { DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'sonner';
import Input from './ui/input';
import { Button } from './ui/button';

const TransferMoney = ({ isOpen, setIsOpen, refetch }) => {
    const { user } = useStore((state) => state)
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const [loading, setLoading] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [accountData, setAccountData] = useState([])
    const [fromAccountInfo, setFromAccountInfo] = useState({})
    const [toAccountInfo, setToAccountInfo] = useState({})

    const submitHandler = async (data) => {
        console.log("Submitting data: ", data); // For debugging

        try {
            setLoading(true);
            const newData = {
                ...data,
                from_account: fromAccountInfo.id,
                to_account: toAccountInfo.id
            };

            const { data: res } = await api.put(`/transaction/transfer-money`, newData);
            console.log("API response: ", res); // For debugging

            if (res?.status === "success") {
                toast.success(res?.message || "Money transferred successfully");
                refetch();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error transferring money:", error);
        } finally {
            setLoading(false);
        }
    }

    const getAccountBalance = async (setAccount, val) => {
        const filteredAccount = accountData.find(account => account.account_name === val);

        setAccount(filteredAccount)
    }

    function closeModal() {
        setIsOpen(false);
    }

    // const fetchAccounts = async () => {
    //     try {
    //         setIsLoading(true);

    //         const { data: res } = await api.get(`/account`);
    //         setAccountData(res?.data);
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message || "Something went wrong");
    //         console.error("Error fetching accounts:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    const fetchAccounts = async () => {
        try {
            setIsLoading(true);

            const { data: res } = await api.get(`/account`);
            setAccountData(res?.accounts); // ✅ بدل res.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error fetching accounts:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchAccounts();
    }, []);


    return (
        <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
            <DialogPanel className='max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-2xl text-left shadow-lg'>
                <DialogTitle as='h3' className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase'>
                    Transfer Money to Account
                </DialogTitle>

                {isloading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit(submitHandler)} className='space-y-4'>

                        <div className="flex flex-col gap-1 mb-2">
                            <p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
                                Select Account
                            </p>

                            <select
                                onChange={(e) => getAccountBalance(setFromAccountInfo, e.target.value)}
                                className='InputStyles'
                            >
                                <option
                                    disabled
                                    value=""
                                    className='w-full flex items-center justify-center dark:bg-slate-900'
                                >
                                    Select an account
                                </option>

                                {accountData.map((acc, index) => (
                                    <option
                                        key={index}
                                        value={acc.account_name}
                                        className='w-full flex items-center justify-between dark:bg-slate-900'
                                    >
                                        {acc.account_name} {" - "}
                                        {formatCurrency(acc?.account_balance)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 mb-2">
                            <p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
                                From Account
                            </p>

                            <select
                                onChange={(e) => getAccountBalance(setToAccountInfo, e.target.value)}
                                className='InputStyles'
                            >
                                <option
                                    disabled
                                    value=""
                                    className='w-full flex items-center justify-center dark:bg-slate-900'
                                >
                                    To account
                                </option>

                                {accountData.map((acc, index) => (
                                    <option
                                        key={index}
                                        value={acc.account_name}
                                        className='w-full flex items-center justify-between dark:bg-slate-900'
                                    >
                                        {acc.account_name} {" - "}
                                        {formatCurrency(acc?.account_balance)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {fromAccountInfo?.account_balance <= 0 && (
                            <div className='flex items-center justify-center bg-yellow-400 text-black p-2 mt-6 rounded'>
                                <MdOutlineWarning size={30} />

                                <span className='text-sm'>
                                    You can not transfer money from this account. Insufficient account balance.
                                </span>
                            </div>
                        )}

                        {fromAccountInfo?.account_balance > 0 && toAccountInfo.id && (
                            <>
                                <div></div>

                                <Input
                                    type="number"
                                    name="amount"
                                    label="Amount"
                                    placeholder="Enter amount to add"
                                    {...register('amount', {
                                        required: 'Transaction amount is required',
                                    })}
                                    error={errors.amount ? errors.amount.message : null}
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-violet-700 text-white w-full"
                                    >
                                        {`Transfer ${watch('amount') ? formatCurrency(watch("amount")) : ''
                                            }`}
                                    </Button>
                                </div>
                            </>
                        )}

                    </form>
                )}

            </DialogPanel>
        </DialogWrapper>
    )
}

export default TransferMoney