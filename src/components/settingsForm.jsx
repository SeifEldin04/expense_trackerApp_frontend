import React, { Fragment, useEffect, useState } from 'react'
import useStore from '../store'
import { useForm } from 'react-hook-form'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'
import { BiCheck, BiLoader } from 'react-icons/bi'
import { fetchCountries } from '../libs/index'
import { Button } from './ui/button'
import api from '../libs/apiCall'
import { toast } from 'sonner'
import Input from './ui/input'


const SettingsForm = () => {
    const { user, setUser, theme, setTheme } = useStore((state) => state)
    const { register, handleSubmit, formState: { errors } , reset} = useForm({
        // defaultValues: { ...user },
    });

    useEffect(() => {
        if (user) {
            reset({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                contact: user.contact || '',
                country: user.country || '',
                currency: user.currency || '',
            });
            setSelectedCountry({
                country: user.country,
                currency: user.currency,
            });
        }
    }, [user, reset]);


    const [selectedCountry, setSelectedCountry] = useState(
        { country: user?.country, currency: user?.currency } || ''
    );
    const [query, setQuery] = useState('');
    const [countriesData, setCountriesData] = useState([]);
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        try {
            setLoading(true)

            const newData = {
                ...values,
                country: selectedCountry?.country,
                currency: selectedCountry?.currency,
            }
            const { data: res } = await api.put(`/user`, newData)

            if (res?.user) {
                const newUser = {
                    ...res?.user, token: user?.token
                }
                localStorage.setItem('user', JSON.stringify(newUser))
                setUser(newUser)

                toast.success(res?.message || 'User Updated Successfully')
            }
        } catch (error) {
            console.error('Something went wrong', error)
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const toggleTheme = (val) => {
        setTheme(val);
        localStorage.setItem('theme', val)
    }

    const filteredCountries = query === '' ? countriesData : countriesData.filter((country) =>
        country.country.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ''))
    );

    const getCountriesList = async () => {
        const data = await fetchCountries()
        setCountriesData(data)
    }

    useEffect(() => {
        getCountriesList()
    }, [])


    const Countries = () => {
        return (
            <div className="w-full">
                <Combobox value={selectedCountry} onChange={(val) => setSelectedCountry(val)}>
                    <div className="relative mt-1">
                        <div>
                            <ComboboxInput
                                className="inputStyles"
                                displayValue={(country) => country?.country}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <BsChevronDown className="text-gray-400" />
                            </ComboboxButton>
                        </div>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredCountries.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        لا توجد نتائج.
                                    </div>
                                ) : (
                                    filteredCountries.map((country, index) => (
                                        <ComboboxOption
                                            // key={country.code + index}
                                            key={country.code || `${country.country}-${index}`}

                                            value={country}
                                            // eslint-disable-next-line
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-violet-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={country?.flag}
                                                            alt={country.country}
                                                            className="w-6 h-4 rounded-sm object-cover"
                                                        />
                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                            {country.country}
                                                        </span>
                                                    </div>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                        >
                                                            <BiCheck className="w-5 h-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </ComboboxOption>
                                    ))
                                )}
                            </ComboboxOptions>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        );
    };


    return <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        {/* First name , Last name */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className="w-full">
                <Input
                    disabled={loading}
                    name='firstname'
                    label='First Name'
                    id='firstname'
                    type='text'
                    placeholder='First Name'
                    {...register('firstname', {
                        required: 'First Name is required',
                    })}
                    error={errors.firstname?.message}
                    className='inputStyle'
                />
            </div>

            <div className="w-full">
                <Input
                    disabled={loading}
                    name='lastname'
                    label='Last Name'
                    id='lastname'
                    type='text'
                    placeholder='Last Name'
                    {...register('lastname')}
                    error={errors.lastname?.message}
                    className='inputStyle'
                />
            </div>
        </div>

        {/* Email , Contact */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className="w-full">
                <Input
                    disabled={true}
                    name='email'
                    label='Email'
                    id='email'
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                    error={errors.email ? errors.email?.message : ''}
                    className='inputStyle'
                />
            </div>

            <div className="w-full">
                <Input
                    disabled={loading}
                    name='contact'
                    label='Contact'
                    id='contact'
                    type='text'
                    placeholder='Contact'
                    {...register('contact', {
                        required: 'Contact is required',
                    })}
                    error={errors.contact ? errors.contact?.message : ''}
                    className='inputStyle'
                />
            </div>
        </div>

        {/* Country , Currency */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full">
                <span className="labelStyles"> Country </span>
                <Countries />
            </div>

            <div className="w-full">
                <span className="labelStyles"> Currency </span>
                <select className='inputStyles'>
                    <option> {selectedCountry?.currency || user?.country} </option>
                </select>
            </div>
        </div>

        {/* Apearance */}
        <div className="w-full flex items-center justify-between pt-5">
            <div>
                <p className="text-lg text-black dark:text-gray-50 font-semibold">
                    Appearance
                </p>
                <span className='labelStyles'>
                    Customize how your theme looks on your device.
                </span>
            </div>

            <div className="w-28 md:w-40">
                <select
                    className='inputStyles'
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value="light"> Light </option>
                    <option value="dark"> Dark </option>
                </select>
            </div>
        </div>

        {/* Language */}
        <div className="w-full flex items-center justify-between pb-5">
            <div>
                <p className='text-lg text-black dark:text-gray-50 font-semibold'>
                    Language
                </p>
                <span className='labelStyles'>
                    Customize what Language you want to use in the app.
                </span>
            </div>

            <div className="w-28 md:w-40">
                <select className='inputStyle'>
                    <option> English </option>
                    {/* <option> Arabic </option> */}
                </select>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 justify-end pb-5 border-b-2 border-gray-200 dark:border-gray-800">
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
                {loading ? <BiLoader className='animate-spin text-white' /> : 'Save'}
            </Button>
        </div>
    </form>
}

export default SettingsForm