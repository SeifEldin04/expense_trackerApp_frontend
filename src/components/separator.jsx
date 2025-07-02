import React from 'react'

const Separator = () => {
    return <>
    <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-sm font-medium ">
            <span className=" dark:bg-black/10 bg-white rounded px-2/text-gray-500">Or</span>
        </div>
    </div>
    </>
}

export default Separator