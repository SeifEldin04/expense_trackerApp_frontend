// import React, { useState } from 'react'
// import useStore from '../store'
// import { useForm } from 'react-hook-form'
// import { generateAccountNumber } from '../libs'
// import DialogWrapper from './wrappers/dialogWrapper'
// import { DialogPanel, DialogTitle } from '@headlessui/react'
// import Accounts from './accounts'
// import { MdOutlineWarning } from 'react-icons/md'
// import Input from './ui/input'
// import { Button } from './ui/button'
// import Loading from './Loading'
// import { BiLoader } from 'react-icons/bi'
// import api from '../libs/apiCall'
// import { toast } from 'sonner'


// const accounts = ['Crypto', 'Visa Debit Card', 'Cash', 'Paypal']

// const AddAccount = ({
//     isOpen,
//     setIsOpen,
//     refetch
// }) => {
//     const { user } = useStore((state) => state)

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         defaultValues: { account_number: generateAccountNumber() }
//     })

//     const [selectedAccount, setSelectedAccount] = useState(accounts[0])
//     const [isLoading, setIsLoading] = useState(false)

//     const onSubmit = async (data) => {
//         try {
//             setIsLoading(true);

//             const newData = { ...data, name: selectedAccount }
//             const { data: res } = await api.post('/account/create', newData)

//             if (res?.data) {
//                 toast.success(res?.message || "Account created successfully");
//                 setIsOpen(false);
//                 refetch();
//             }
//         } catch (error) {
//             console.error("Error creating account:", error);
//             toast.error(error?.response?.data?.message || "Something went wrong");
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     function closeModal() {
//         setIsOpen(false)
//     }

//     console.log(user);
//     console.log(selectedAccount);



//     return (
//         <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
//             <DialogPanel className='w-full max-w-md transform overflow-hidden p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl
//             text-left align-middle transition-all'>

//                 <DialogTitle
//                     as='h3'
//                     className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase'
//                 >
//                     Add Account
//                 </DialogTitle>

//                 <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
//                     <div className="flex flex-col gap-1 mb-2">
//                         <p className="text-grey-700 dark:text-gray-400 text-sm mb-2">
//                             Select Account
//                         </p>

//                         <select
//                             onChange={(e) => setSelectedAccount(e.target.value)}
//                             className='bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3
//             text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder:text-gray-700'
//                         >
//                             {accounts.map((acc, index) => (
//                                 <option
//                                     key={index}
//                                     value={acc}
//                                     className='w-full flex items-center justify-center dark:bg-slate-900'
//                                 >
//                                     {acc}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {user?.accounts?.includes(selectedAccount) && (
//                         <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
//                             <MdOutlineWarning size={30} />

//                             <span className="text-sm">
//                                 This account has been already activated. Try another one. Thank you.
//                             </span>
//                         </div>
//                     )}

//                     {!user?.accounts?.includes(selectedAccount) && (
//                         <>
//                             <Input
//                                 name="account_number"
//                                 label="Account Number"
//                                 placeholder="Account Number"
//                                 {...register('account_number', {
//                                     required: 'Account number is required',
//                                 })}
//                                 errors={errors.account_number ? errors.account_number.message : ''}
//                                 className='InputStyle'
//                             />

//                             <Input
//                                 name="number"
//                                 label="Amount"
//                                 placeholder="Account Amount"
//                                 {...register('amount', {
//                                     required: 'Initial Amount is required',
//                                 })}
//                                 errors={errors.amount ? errors.amount.message : ''}
//                                 className='InputStyle'
//                             />

//                             <Button
//                                 disabled={isLoading}
//                                 type="submit"
//                                 className='bg-violet-700 text-white w-full mt-4'
//                             >
//                                 {isLoading ? (
//                                     <BiLoader className='animate-spin text-xl text-white' />
//                                 ) : (
//                                     "Create Account"
//                                 )}
//                             </Button>
//                         </>
//                     )}
//                 </form>
//             </DialogPanel>
//         </DialogWrapper>


//     )
// }

// export default AddAccount




































import React, { useState } from 'react';
import useStore from '../store';
import { useForm } from 'react-hook-form';
import { generateAccountNumber } from '../libs';
import DialogWrapper from './wrappers/dialogWrapper';
import { DialogPanel, DialogTitle } from '@headlessui/react';
import { MdOutlineWarning } from 'react-icons/md';
import Input from './ui/input';
import { Button } from './ui/button';
import { BiLoader } from 'react-icons/bi';
import api from '../libs/apiCall';
import { toast } from 'sonner';

const accounts = ['Crypto', 'Visa Debit Card', 'Cash', 'Paypal'];

const AddAccount = ({ isOpen, setIsOpen, refetch }) => {
    const { user, setCredentials } = useStore((state) => state);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { accountNumber: generateAccountNumber() },
    });

    const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
    const [isLoading, setIsLoading] = useState(false);


    console.log('AddAccount user:', user); // Debug
    console.log('Selected account:', selectedAccount); // Debug

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            // Map frontend field names to backend expectations
            const newData = {
                accountName: selectedAccount,
                accountNumber: data.accountNumber,
                accountBalance: data.amount || '0',
            };

            const { data: res } = await api.post('/account/create', newData);
            console.log('Create account response:', res); // Debug

            if (res?.account) {
                // Fetch updated user to get accounts array
                try {
                    const { data: userRes } = await api.get('/user');
                    console.log('Updated user response:', userRes); // Debug
                    const userInfo = {
                        ...user,
                        ...userRes,
                        token: user?.token,
                    };
                    localStorage.setItem('user', JSON.stringify(userInfo));
                    setCredentials(userInfo);
                } catch (userError) {
                    console.error('Failed to fetch updated user:', userError);
                    toast.warning('Account created, but user data may be incomplete.');
                }

                toast.success(res?.message || 'Account created successfully');
                setIsOpen(false);
                refetch();
            }
        } catch (error) {
            console.error('Error creating account:', error);
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
            <DialogPanel className="w-full max-w-md transform overflow-hidden p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl text-left align-middle transition-all">
                <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
                >
                    Add Account
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-1 mb-2">
                        <p className="text-grey-700 dark:text-gray-400 text-sm mb-2">
                            Select Account
                        </p>
                        <select
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            value={selectedAccount}
                            className="bg-transparent appearance-none border border-gray-300 dark:border-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-500 outline-none focus:ring-1 ring-blue-500 dark:placeholder:text-gray-700"
                        >
                            {accounts.map((acc, index) => (
                                <option
                                    key={index}
                                    value={acc}
                                    className="w-full flex items-center justify-center dark:bg-slate-900"
                                >
                                    {acc}
                                </option>
                            ))}
                        </select>
                    </div>

                    {(user?.accounts || []).includes(selectedAccount) && (
                        <div className="flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded">
                            <MdOutlineWarning size={30} />
                            <span className="text-sm">
                                This account has been already activated. Try another one. Thank you.
                            </span>
                        </div>
                    )}

                    {!(user?.accounts || []).includes(selectedAccount) && (
                        <>
                            <Input
                                name="accountNumber"
                                label="Account Number"
                                placeholder="Account Number"
                                {...register('accountNumber', {
                                    required: 'Account number is required',
                                })}
                                errors={errors.accountNumber ? errors.accountNumber.message : ''}
                                className="inputStyles"
                            />
                            <Input
                                name="amount"
                                label="Amount"
                                placeholder="Account Amount"
                                type="number"
                                {...register('amount', {
                                    required: 'Initial Amount is required',
                                    min: { value: 0, message: 'Amount must be non-negative' },
                                })}
                                errors={errors.amount ? errors.amount.message : ''}
                                className="inputStyles"
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="bg-violet-700 text-white w-full mt-4"
                            >
                                {isLoading ? (
                                    <BiLoader className="animate-spin text-xl text-white" />
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </>
                    )}
                </form>
            </DialogPanel>
        </DialogWrapper>
    );
};

export default AddAccount;