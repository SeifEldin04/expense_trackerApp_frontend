// import React, { useEffect, useState } from 'react'
// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import useStore from '../../store'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Link, useNavigate } from 'react-router-dom'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
// // import SocialAuth from '../../components/socialAuth'
// import Separator from '../../components/separator'
// import Input from '../../components/ui/input'
// import { Button } from '../../components/ui/button'
// import { BiLoader } from 'react-icons/bi';
// import { toast } from 'sonner'
// import api from '../../libs/apiCall'

// const RegisterSchema = z.object({
//     email: z.string({ required_error: 'Email is required' }).min(3, "Email is required")
//         .email({ message: 'Invalid email address' }),

//     firstName: z.string({ required_error: 'First Name is required' })
//         .min(3, { message: 'Name is required' }),

//     lastName: z.string().min(3),

//     password: z.string({ required_error: 'Password is required' })
//         .min(8, { message: 'Password must be at least 8 characters long' })
// });

// const Signup = () => {
//     const { user } = useStore((state) => state)
//     console.log(user);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false)


//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: zodResolver(RegisterSchema),
//     });

//     useEffect(() => {
//         user && navigate('/')
//     }, [user])

//     const onSubmit = async (data) => {
//         try {
//             setLoading(true);

//             const { data: res } = await api.post('/auth/sign-up', data)

//             if (res?.user) {
//                 toast.success('Account created successfully , you can now login')
//                 setTimeout(() => {
//                     // navigate('/signIn')
//                 }, 1500)
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
//         } finally {
//             setLoading(false);
//         }
//     }

//     return <>
//         <div className='flex items-center justify-center min-h-screen py-10'>
//             <Card className="w-[400px] dark:bg-black dark:bg-black/20 shadow-md overflow-hidden">
//                 <div className="p-6 md:-8">
//                     <CardHeader className="py-0">
//                         <CardTitle className="mb-8 text-center dark:text-white">
//                             Create Account
//                         </CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                         {/* <SocialAuth setLoading={loading} /> */}
//                         <Separator />

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <Input
//                                 disabled={loading}
//                                 id="firstName"
//                                 label="First Name"
//                                 type="text"
//                                 name="firstName"
//                                 placeholder="Seif Eldin"
//                                 {...register('firstName')}
//                                 error={errors.firstName?.message}
//                                 className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
//                                  dark:text-gray-400 dark:outline-none"
//                             />

//                             <Input
//                                 disabled={loading}
//                                 id="lastName"
//                                 label="Last Name"
//                                 type="text"
//                                 name="lastName"
//                                 placeholder="Khaled"
//                                 {...register('lastName')}
//                                 error={errors.lastName?.message}
//                                 className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
//                                  dark:text-gray-400 dark:outline-none"
//                             />

//                             <Input
//                                 disabled={loading}
//                                 id="email"
//                                 label="Email"
//                                 type="email"
//                                 name="email"
//                                 placeholder="you@example.com"
//                                 autoComplete="username"
//                                 {...register('email')}
//                                 error={errors.email?.message}
//                                 className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
//                                  dark:text-gray-400 dark:outline-none"
//                             />

//                             <Input
//                                 disabled={loading}
//                                 id="password"
//                                 label="Password"
//                                 type="password"
//                                 name="password"
//                                 placeholder="*********"
//                                 autoComplete="current-password"
//                                 {...register('password')}
//                                 error={errors.password?.message}
//                                 className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700
//                                  dark:text-gray-400 dark:outline-none"
//                             />

//                             <div className='text-center mt-4'>
//                                 <Button
//                                     type="submit"
//                                     disabled={loading}
//                                     className=" bg-violet-800 mb-5 outline-none border-none"
//                                 >
//                                     {loading ? <BiLoader className='text-2xl text-white animate-spin' /> : 'Create Account'}
//                                 </Button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </div>

//                 <CardFooter className="justify-center">
//                     <p className="text-sm text-gray-600">
//                         Already have an account?{' '}
//                         <Link to="/signIn" className="font-semibold text-sm text-violet-600 hover:underline">
//                             Sign in
//                         </Link>
//                     </p>
//                 </CardFooter>
//             </Card>
//         </div >
//     </>
// }

// export default Signup



























import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import useStore from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import Separator from '../../components/separator';
import Input from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { BiLoader } from 'react-icons/bi';
import { toast } from 'sonner';
import api from '../../libs/apiCall';

const RegisterSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(3, 'Email is required')
        .email({ message: 'Invalid email address' }),
    firstName: z
        .string({ required_error: 'First Name is required' })
        .min(3, { message: 'First Name must be at least 3 characters long' }),
    lastName: z.string().min(3, { message: 'Last Name must be at least 3 characters long' }).optional(),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
});

const Signup = () => {
    const { user, setCredentials } = useStore((state) => state);
    console.log('User state:', user); // Debug
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema),
    });

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { data: res } = await api.post('/auth/sign-up', {
                ...data,
                firstname: data.firstName, // Map to backend field
                lastname: data.lastName || '', // Ensure lastname is sent
            });
            console.log('Signup API response:', res); // Debug

            if (res?.user && res?.token) {
                // Auto-login after signup
                const userInfo = {
                    ...res.user,
                    token: res.token,
                };
                localStorage.setItem('user', JSON.stringify(userInfo));
                setCredentials(userInfo);
                console.log(userInfo);
                
                toast.success('Account created successfully! Logging in...');
                setTimeout(() => {
                    navigate('/overview');
                }, 1500);
            } else {
                // Redirect to login if no token/user returned
                toast.success('Account created successfully! Please log in.');
                setTimeout(() => {
                    navigate('/signIn');
                }, 1500);
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-10">
            <Card className="w-[400px] dark:bg-black dark:bg-black/20 shadow-md overflow-hidden">
                <div className="p-6 md:-8">
                    <CardHeader className="py-0">
                        <CardTitle className="mb-8 text-center dark:text-white">Create Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Separator />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                disabled={loading}
                                id="firstName"
                                label="First Name"
                                type="text"
                                name="firstName"
                                placeholder="Seif Eldin"
                                {...register('firstName')}
                                error={errors.firstName?.message}
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                            />
                            <Input
                                disabled={loading}
                                id="lastName"
                                label="Last Name"
                                type="text"
                                name="lastName"
                                placeholder="Khaled"
                                {...register('lastName')}
                                error={errors.lastName?.message}
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                            />
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
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
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
                                className="text-sm border dark:border:grey-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                            />
                            <div className="text-center mt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-violet-800 mb-5 outline-none border-none"
                                >
                                    {loading ? <BiLoader className="text-2xl text-white animate-spin" /> : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </div>
                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/signIn" className="font-semibold text-sm text-violet-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;