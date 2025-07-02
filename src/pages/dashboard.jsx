import React, { useEffect, useState } from 'react'
import api from '../libs/apiCall'
import { toast } from 'sonner'
import Info from '../components/info'
import Stats from '../components/stats'
import Chart from '../components/chart'
import DoughnutChart from '../components/piechart'
import RecentTransactions from '../components/recentTransactions'
import Accounts from '../components/accounts'
import { FaSpinner } from 'react-icons/fa'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchDashboardStats = async () => {
        const URL = `/transaction/dashboard`

        try {
            const { data: res } = await api.get(URL)
            console.log("Dashboard data response: ", res);

            setData(res?.data)
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Something went wrong , Please try again');

            if (error?.response?.data?.status === 'auth-failed') {
                localStorage.removeItem('user')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchDashboardStats()
    }, [])

    if (isLoading)
        return (
            <div className='flex justify-center items-center w-full h-[80vh]'>
                <div className='flex justify-center items-center py-2'>
                    <FaSpinner className='animate-spin text-violet-600' size={28} />
                </div>
            </div>
        )

    return (
        <div className='px-0 md:px-5 2xl:px-20'>
            <Info title='Dashboard' subTitle='Monitor your financial activities' />

            <Stats
                dt={{
                    balance: data?.availableBalance,
                    income: data?.totalIncome,
                    expense: data?.totalExpense,
                }} />

            <div className='w-full flex flex-col-reverse md:flex-row items-center gap-10'>
                <Chart data={data?.chartData} />
                <DoughnutChart
                    dt={{
                        balance: data?.availableBalance,
                        income: data?.totalIncome,
                        expense: data?.totalExpense,
                    }} />
            </div>

            <div className="flex flex-col-reverse gap-0 md:flex-row md:gap-10 2xl:gap-20">
                <RecentTransactions data={data?.lastTransaction} />

                {/* {<Accounts data={[data?.lastAccount]} />} */}
            </div>
        </div>
    )
}

export default Dashboard