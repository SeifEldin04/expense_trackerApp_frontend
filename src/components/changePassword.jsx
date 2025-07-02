import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import api from '../libs/apiCall'
import { Button } from './ui/button'
import { BiLoader } from 'react-icons/bi'
import Input from './ui/input'


const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [loading, setLoading] = useState(false)

    const submitHandler = async (data) => {
        try {
            setLoading(true)

            const { data: res } = await api.put('/user/change-password', data)

            if (res?.status === 'success') {
                toast.success(res?.message || 'Password changed successfully')
            }
        } catch (error) {
            console.error('Something went wrong', error)
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='py-20'>
            <form onSubmit={handleSubmit(submitHandler)}>
                {/*Passwords Inputs */}
                <div>
                    <p className='text-xl font-bold text-black dark:text-gray-300 mb-1'>
                        Change Password
                    </p>
                    <span className='labelStyles'>
                        This Will be used to log into your account and complete high severity actions.
                    </span>

                    <div className="mt-6">
                        <Input
                            className='inputStyle'
                            disabled={loading}
                            type='password'
                            name='currentPassword'
                            label='Current Password'
                            {...register('currentPassword', {
                                required: 'Current password is required',
                            })}
                            error={errors.currentPassword ? errors.currentPassword.message : ''}
                        />

                        <Input
                            className='inputStyle'
                            disabled={loading}
                            type='password'
                            name='newPassword'
                            label='New Password'
                            {...register('newPassword', {
                                required: 'New password is required',
                            })}
                            error={errors.newPassword ? errors.newPassword.message : ''}
                        />

                        <Input
                            className='inputStyle'
                            disabled={loading}
                            type='password'
                            name='confirmPassword'
                            label='Confirm Password'
                            {...register('confirmPassword', {
                                required: 'Confirmation of password is required',
                                validate: (val) => {
                                    const { newPassword } = getValues()

                                    return newPassword === val || 'Your passwords does not match'
                                }
                            })}
                            error={errors.confirmPassword ? errors.confirmPassword.message : ''}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 justify-end py-8 border-b-2 border-gray-200 dark:border-gray-800">
                    <Button
                        variant='outline'
                        loading={loading}
                        type='reset'
                        className='px-6 bg-transparent text-black  border border-gray-200 dark:border-gray-700'
                    >
                        Reset
                    </Button>

                    <Button
                        disabled={loading}
                        type='submit'
                        className='px-8 bg-violet-800 text-white'
                    >
                        {loading ? <BiLoader className='animate-spin text-white' /> : 'Change Password'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword