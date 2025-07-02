import React from "react";
import { FaBtc, FaPaypal } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { RiVisaLine } from "react-icons/ri";
import Title from "./title";
import { formatCurrency, maskAccountNumber } from "../libs";

const ICONS = {
    cryoto: (
        <div className='w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full'>
            <FaBtc size={26} />
        </div>
    ),
    'visa debit card': (

        <div className='w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full'>
            <RiVisaLine size={26} />
        </div >
    ),
    cash: (

        <div className='w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full'>
            <GiCash size={26} />
        </div >
    ),
    Paypal: (
        <div className='w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full'>
            <FaPaypal size={26} />
        </div>
    ),
}

const Accounts = ({ data }) => {
    return (
        <div className='mt-20 md:mt-0 py-5 md:py-20 md:w-1/3'>
            <Title title='Accounts' />
            <span className='text-sm text-gray-600 dark:text-gray-500'>
                View all your accounts
            </span>

            <div className='w-full'>
                {data.map((item, index) => (
                    <div key={index} className='flex items-center justify-between mt-6'>
                        <div className='flex items-center gap-4'>
                            {item.icon}
                            <div>
                                <p className='text-black dark:text-gray-400 text-lg'>
                                    {item.name}
                                </p>
                                <span className='text-gray-600'>{item.account}</span>
                            </div>
                        </div>

                        <div>
                            <p className='text-xl text-black dark:text-gray-400 font-medium'>
                                ${item.amount}
                            </p>
                            <span className='text-sm text-gray-600 dark:text-violet-700'>
                                Account Balance
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accounts;