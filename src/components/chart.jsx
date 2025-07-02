import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Title from "./title";

const Chart = ({ data }) => {
    return (
        <div className='w-full md:w-2/3'>
            <Title title='Transaction Activity' />

            {data?.length ? (
                <div className='mt-5'>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <YAxis />
                            <XAxis dataKey='label' padding={{ left: 30, right: 30 }} />
                            <Tooltip />
                            <Legend />
                            <Line type='monotone' dataKey={"income"} stroke='#8884d8' />
                            <Line type='monotone' dataKey={"expense"} stroke='#82ca9d' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="text-gray-500 mt-5">No data available</p>
            )}
        </div>
    );
};

export default Chart;
