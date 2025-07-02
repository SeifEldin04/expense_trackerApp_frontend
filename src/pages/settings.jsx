import React from 'react'
import useStore from '../store'
import Title from '../components/title'
import SettingsForm from '../components/settingsForm'
import ChangePassword from '../components/changePassword'


const Settings = () => {
    const { user } = useStore((state) => state)


    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="w-full max-w-4xl px-4 py-6 shadow-lg bg-gray-50 dark:bg-black/15 md:px-10 md:py-10">
                <div className='mt-6 border-b-2 pb-2 border-gray-200 dark:border-gray-600'>
                    <Title title="General Settings" />
                </div>

                <div className="py-10">
                    <p className='text-lg font-bold text-black dark:text-white'>
                        Profile Inforamtion
                    </p>

                    <div className="flex items-center gap-4 my-8">
                        <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full cursor-pointer bg-violet-800">
                            <p>{user?.firstname.charAt(0)}</p>
                        </div>

                        <p className='font-semibold text-xl text-black dark:text-white'>
                            {user?.firstname}
                        </p>
                    </div>

                    {/* Settings Form */}
                    <SettingsForm />

                    {/* Change password Form */}
                    {!user?.provided && <ChangePassword/>}
                </div>
            </div>
        </div>
    )
}

export default Settings