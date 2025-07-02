import React, { useEffect, useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import useStore from '../../store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
// import SocialAuth from '../../components/socialAuth'
import Separator from '../../components/separator'
import Input from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { BiLoader } from 'react-icons/bi';
import { toast } from 'sonner'
import api from '../../libs/apiCall'


const LoginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' }).min(3, "Email is required")
        .email({ message: 'Invalid email address' }),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' })
});

const Signin = () => {
    const { user , setCredentials} = useStore((state) => state)
    console.log(user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    useEffect(() => {
        user && navigate('/')
    }, [user])

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const { data: res } = await api.post('/auth/sign-in', data)

            if (res?.user) {
                toast.success(res?.message || 'Login successful')

                const userInfo = {...res?.user, token: res?.token}
                localStorage.setItem('user', JSON.stringify(userInfo))
                setCredentials(userInfo)

                setTimeout(() => {
                    navigate('/overview')
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className='flex items-center justify-center min-h-screen py-10'>
            <Card className="w-[400px] dark:bg-black dark:bg-black/20 shadow-md overflow-hidden">
                <div className="p-6 md:-8">
                    <CardHeader className="py-0">
                        <CardTitle className="mb-8 text-center dark:text-white">
                            Login
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {/* <SocialAuth setLoading={loading} /> */}
                        <Separator />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                disabled={loading}
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="username"
                                {...register('email')}
                                error={errors.email?.message}
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
                                 dark:text-gray-400 dark:outline-none"
                            />

                            <Input
                                disabled={loading}
                                id="password"
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="*********"
                                autoComplete="current-password"
                                {...register('password')}
                                error={errors.password?.message}
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
                                 dark:text-gray-400 dark:outline-none"
                            />

                            <div className='text-center mt-4'>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className=" bg-violet-800 mb-5 outline-none border-none"
                                >
                                    {loading ? <BiLoader className='text-2xl text-white animate-spin' /> : 'Login'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </div>

                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signUp" className="font-semibold text-sm text-violet-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div >
    </>
}

export default Signin