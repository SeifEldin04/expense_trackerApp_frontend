// import React, { useState } from 'react'
// import { getDateSevenDaysAgo } from '../libs'
// import { useSearchParams } from 'react-router-dom';

// const DataRange = () => {
//     const sevenDaysAgo = getDateSevenDaysAgo();

//     const [searchParams, setSearchParams] = useSearchParams()

//     const [dateFrom, setDateFrom] = useState(() => {
//         const df = searchParams.get("df");

//         return df && new Date(df).getTime() <= new Date().getTime()
//             ? df
//             : sevenDaysAgo || new Date().toISOString().split("T")[0];
//     })

//     const [dateTo, setDateTo] = useState(() => {
//         const dt = searchParams.get("dt");

//         return dt && new Date(dt).getTime() >= new Date(dateFrom).getTime()
//             ? df
//             : new Date().toISOString().split("T")[0];
//     })

//     const handleDateToChange = (e) => {
//         const dt = e.target.value;

//         setDateTo(dt);
//         if (new Date(dt).getTime() < new Date(dateFrom).getTime()) {
//             setDateFrom(dt)
//         }
//     }


//     return (
//         <div className='flex items-center gap-2'>
//             <div className="flex items-center gap-1">
//                 <label
//                     className='block text-gray-700 dark:text-gray-400 text-sm mb-2'
//                     htmlFor='dateFrom'
//                 >
//                     From
//                 </label>

//                 <input
//                     type="date"
//                     className='inputStyles'
//                     name='dateFrom'
//                     max={dateTo}
//                     value={dateFrom}
//                     onChange={handleDateToChange}
//                 />
//             </div>

//             <div className="flex items-center gap-1">
//                 <label
//                     className='block text-gray-700 dark:text-gray-400 text-sm mb-2'
//                     htmlFor='dateTo'
//                 >
//                     To
//                 </label>

//                 <input
//                     type="date"
//                     className='inputStyles'
//                     name='dateTo'
//                     min={dateFrom}
//                     value={dateTo}
//                     onChange={handleDateToChange}
//                 />
//             </div>
//         </div>
//     )
// }

// export default DataRange











import React from 'react'
import { getDateSevenDaysAgo } from '../libs'
import { useSearchParams } from 'react-router-dom'

const DataRange = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const today = new Date().toISOString().split("T")[0]
    const sevenDaysAgo = getDateSevenDaysAgo()

    const dateFrom = searchParams.get("df") || sevenDaysAgo
    const dateTo = searchParams.get("dt") || today

    const handleDateFromChange = (e) => {
        const newDateFrom = e.target.value

        // لو التاريخ الجديد أكبر من dateTo نعدله كمان
        const newDateTo = new Date(newDateFrom) > new Date(dateTo)
            ? newDateFrom
            : dateTo

        setSearchParams(prev => {
            prev.set("df", newDateFrom)
            prev.set("dt", newDateTo)
            return prev
        })
    }

    const handleDateToChange = (e) => {
        const newDateTo = e.target.value

        // لو التاريخ الجديد أصغر من dateFrom نعدله كمان
        const newDateFrom = new Date(newDateTo) < new Date(dateFrom)
            ? newDateTo
            : dateFrom

        setSearchParams(prev => {
            prev.set("dt", newDateTo)
            prev.set("df", newDateFrom)
            return prev
        })
    }

    return (
        <div className='flex items-center gap-2'>
            <div className="flex items-center">
                <label
                    className='block text-gray-700 dark:text-gray-400 text-sm mr-1'
                    htmlFor='dateFrom'
                >
                    From
                </label>

                <input
                    type="date"
                    className='inputStyles'
                    name='dateFrom'
                    max={dateTo}
                    value={dateFrom}
                    onChange={handleDateFromChange}
                />
            </div>

            <div className="flex items-center">
                <label
                    className='block text-gray-700 dark:text-gray-400 text-sm mr-1'
                    htmlFor='dateTo'
                >
                    To
                </label>

                <input
                    type="date"
                    className='inputStyles'
                    name='dateTo'
                    min={dateFrom}
                    value={dateTo}
                    onChange={handleDateToChange}
                />
            </div>
        </div>
    )
}

export default DataRange
