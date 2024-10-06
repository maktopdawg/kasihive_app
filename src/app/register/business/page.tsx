'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import isValidEmail from '@/utils/isValidEmail';
import isValidPassword from '@/utils/isValidPassword';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"
import { AiOutlineUser, AiTwotoneHome, AiOutlineScan, AiTwotoneTag, AiOutlineSafety, AiTwotonePhone, AiTwotoneMail, AiTwotoneEnvironment } from "react-icons/ai";

interface OwnersProps {
    firstName: string
    lastName: string
    idNumber: string
}

const BusinessPageSignUp = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [account, setAccount] = useState({
        businessName: "",
        registrationNumber: "",
        industry: "",
        owners: [{ firstName: "", lastName: "", idNumber: "" }],
        address: {
            street: "",
            city: "",
            province: "",
            postalCode: ""
        },
        email: "",
        phoneNumber: "",
        websiteUrl: "",
        password: ""
    })

    const handleOwnerChange = (index: number, field: keyof OwnersProps, value: string) => {
        const updatedOwners = [...account.owners];
        updatedOwners[index] = { ...updatedOwners[index], [field]: value };
        setAccount({ ...account, owners: updatedOwners });
    };

    const addOwner = () => {
        setAccount({ ...account, owners: [...account.owners, { firstName: "", lastName: "", idNumber: "" }] });
    };

    const removeOwner = (index: number) => {
        const updatedOwners = account.owners.filter((_, i) => i !== index);
        setAccount({ ...account, owners: updatedOwners });
    };

    const onRegister = async (e: any) => {
        setLoading(true)
        e.preventDefault();

        if (!isValidEmail(account.email)) {
            setError("Email is invalid.")
            setLoading(false)
            return;
        }

        if (!isValidPassword(account.password)) {
            setError("Email is invalid.")
            setLoading(false)
            return;
        }

        try {
            console.log(account)
            const response = await axios.post("https://quiet-citadel-47660-0ac4c1daa42c.herokuapp.com/api/accounts/new-business-account", account)
            console.log(response)

            toast.success("Business Account Successfully Created. You can proceed to login.")

            router.push("/login/business")
        } catch (error: any) {
            setError("Error, Please Try Again.")
            toast.error("Error, Please Try Again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (
            account.businessName &&
            account.industry &&
            account.owners.length > 0 &&
            account.owners.every(owner => owner.firstName && owner.lastName && owner.idNumber) &&
            account.address &&
            isValidEmail(account.email) &&
            account.phoneNumber &&
            account.password
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [account]);

    const content = (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className='text-center mb-5 font-bold'>Get Funding Or List Your Business</h1>
            <div className='w-full md:w-[35rem]'>
                <form>
                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneHome size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, businessName: e.target.value })}
                            id="businessName"
                            className='bg-transparent'
                            placeholder='Business Name'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineScan size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, registrationNumber: e.target.value })}
                            id="registrationNumber"
                            className='bg-transparent'
                            placeholder='Registration Number'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneTag size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, industry: e.target.value })}
                            id="industry"
                            className='bg-transparent'
                            placeholder='Industry'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneMail size={15} />
                        <input
                            type="email"
                            onChange={(e: any) => setAccount({ ...account, email: e.target.value })}
                            id="email"
                            className='bg-transparent'
                            placeholder='Email Address'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneEnvironment size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, address: { ...account.address, street: e.target.value } })}
                            id="streetAddress"
                            className='bg-transparent'
                            placeholder='Street Address'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneEnvironment size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, address: { ...account.address, city: e.target.value } })}
                            id="city"
                            className='bg-transparent'
                            placeholder='City'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneEnvironment size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, address: { ...account.address, province: e.target.value } })}
                            id="province"
                            className='bg-transparent'
                            placeholder='Province'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneEnvironment size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, address: { ...account.address, postalCode: e.target.value } })}
                            id="postalCode"
                            className='bg-transparent'
                            placeholder='Postal Code'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotonePhone size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, phoneNumber: e.target.value })}
                            id="phoneNumber"
                            className='bg-transparent'
                            placeholder='Telephone Number'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineSafety size={15} />
                        <input
                            type="password"
                            onChange={(e: any) => setAccount({ ...account, password: e.target.value })}
                            id="website"
                            className='bg-transparent'
                            placeholder='Password'
                            required
                        />
                    </div>

                     {/* Owners Section */}
                     <h2 className='text-lg font-bold mb-2'>Business Owners</h2>
                    {account.owners.map((owner, index) => (
                        <div key={index} className='border p-5 rounded-lg mb-4'>
                            <div className='border flex gap-5 items-center h-[4rem] p-5 mb-4'>
                                <AiOutlineUser size={15} />
                                <input
                                    type="text"
                                    onChange={(e: any) => handleOwnerChange(index, 'firstName', e.target.value)}
                                    value={owner.firstName}
                                    className='bg-transparent'
                                    placeholder='First Name'
                                    required
                                />
                            </div>

                            <div className='border flex gap-5 items-center h-[4rem] p-5 mb-4'>
                                <AiOutlineUser size={15} />
                                <input
                                    type="text"
                                    onChange={(e: any) => handleOwnerChange(index, 'lastName', e.target.value)}
                                    value={owner.lastName}
                                    className='bg-transparent'
                                    placeholder='Last Name'
                                    required
                                />
                            </div>

                            <div className='border flex gap-5 items-center h-[4rem] p-5'>
                                <AiOutlineScan size={15} />
                                <input
                                    type="text"
                                    onChange={(e: any) => handleOwnerChange(index, 'idNumber', e.target.value)}
                                    value={owner.idNumber}
                                    className='bg-transparent'
                                    placeholder='ID Number'
                                    required
                                />
                            </div>

                            {index > 0 && (
                                <button type="button" onClick={() => removeOwner(index)} className="text-red-500 mt-2">
                                    Remove Owner
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addOwner} className='text-blue-500 mb-7'>
                        + Add Another Owner
                    </button>

                    <button
                        type="submit"
                        onClick={onRegister}
                        disabled={buttonDisabled || loading}
                        className={`w-full h-[4rem] rounded-lg ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'}`}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    )

    return content
}

export default BusinessPageSignUp