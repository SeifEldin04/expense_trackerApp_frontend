import React from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { RiProgress3Line } from 'react-icons/ri'
import { TiWarning } from 'react-icons/ti'
import Title from './title'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../libs'


const RecentTransactions = ({data}) => {
    return (
        <div className='flex-1 w-full py-20'>
            <div className="flex items-center justify-between">
                <Title title='Latest Transactions' />

                <Link
                    to='/transactions'
                    className='text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 hover:underline mr-5'>
                    View All
                </Link >
            </div>

            <div className="mt-5 overflow-x-auto">
                <table className="w-full">

                    <thead className="w-full border-b border-gray-300 dark:border-gray-700">
                        <tr className='w-full text-left text-black dark:text-gray-400'>
                            <th className='py-2'> Date </th>
                            <th className='py-2'> Description </th>
                            <th className='py-2'> Status </th>
                            <th className='py-2'> Source </th>
                            <th className='py-2'> Amount </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((item, index) => (
                            <tr
                                key={index}
                                className='w-full text-sm text-gray-600 dark:text-gray-500 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800'>
                                <td className='py-4'>
                                    {new Date(item.createdat).toLocaleDateString()}
                                </td>

                                <td className="px-2 py-3">
                                    <div className="flex flex-col">
                                        <p className='text-base font-medium text-black 2xl:text-lg dark:text-gray-400 line-clamp-1'>
                                            {item?.description}
                                        </p>
                                    </div>
                                </td>

                                <td className="flex items-center gap-2 px-2 py-3">
                                    {item?.status === 'completed' && (
                                        <IoCheckmarkDoneCircle
                                            size={22}
                                            className='text-green-500'
                                        />)}

                                    {item?.status === 'Rejected' && (
                                        <TiWarning
                                            size={22}
                                            className='text-red-500'
                                        />)}

                                    {item?.status === 'Pending' && (
                                        <RiProgress3Line
                                            size={22}
                                            className='text-amber-500'
                                        />)}

                                    <span> {item?.status} </span>
                                </td>

                                <td className='px-2 py-3'>
                                    <p className='line-clamp-1'> {item?.source}</p>
                                </td>

                                <td className='flex items-center px-2 py-4 font-medium text-black dark:text-gray-400'>
                                    <span
                                        className={`${item?.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}
                                    >
                                        {item?.type === 'income' ? '+' : '-'}
                                    </span>
                                    {formatCurrency(item?.amount || 0)}
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentTransactions