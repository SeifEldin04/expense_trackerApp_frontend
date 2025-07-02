import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../libs/apiCall';
import { toast } from 'sonner';
import DialogWrapper from './wrappers/dialogWrapper';
import { DialogPanel, DialogTitle } from '@headlessui/react';
import Input from './ui/input';
import { Button } from './ui/button';
import { formatCurrency } from '../libs';

const AddMoney = ({ isOpen, setIsOpen, id, refetch }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false)

    const submitHandler = async (data) => {
        console.log("Submitting data: ", data); // ✅ للتأكد إنه دخل هنا

        try {
            setLoading(true);

            const { data: res } = await api.put(`/account/add-money/${id}`, data);
            console.log("API response: ", res); // ✅ هل وصل رد فعلاً؟

            if (res?.status === "success") {
                toast.success(res?.message || "Money added successfully");
                refetch();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error adding money:", error);
        } finally {
            setLoading(false);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
            <DialogPanel className='max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-2xl text-left shadow-lg'>
                <DialogTitle as='h3' className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase'>
                    Add Money to Account
                </DialogTitle>

                <form onSubmit={handleSubmit(submitHandler)} className='space-y-4'>
                    <Input
                        type="number"
                        name="amount"
                        label="Amount"
                        placeholder="Enter amount to add"
                        {...register('amount', {
                            required: 'Amount is required',
                        })}
                        error={errors.amount ? errors.amount.message : null}
                    />

                    <div className="w-full mt-4">
                        {/* <Button
                                type="submit"
                                disabled={loading}
                                className="bg-violet-700 text-white w-full"
                            /> */}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-violet-700 text-white w-full"
                        >
                            {`Submit ${watch('amount') ? formatCurrency(watch("amount")) : ''
                                }`}
                        </Button>
                    </div>

                </form>

            </DialogPanel>
        </DialogWrapper>
    )
}

export default AddMoney