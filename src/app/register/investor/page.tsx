'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import isValidEmail from '@/utils/isValidEmail';
import isValidPassword from '@/utils/isValidPassword';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"
import { AiOutlineUser, AiOutlineScan, AiOutlineSafety, AiTwotoneMobile, AiTwotoneMail } from "react-icons/ai";

const InvestorSignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [account, setAccount] = useState({
        firstName: "",
        lastName: "",
        identityNumber: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    const reset = () => setAccount({
        firstName: "",
        lastName: "",
        identityNumber: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    const onRegister = async (e: any) => {
        setLoading(true)
        e.preventDefault();

        if (!isValidEmail(account.email)) {
            setError("Email is invalid.")
            toast.error(error)
            setLoading(false)
            return;
        }

        if (!account.password || !isValidPassword(account.password)) {
            setError("Password is invalid.")
            toast.error(error)
            setLoading(false)
            return;
        }

        try {
            console.log(account)
            const response = await axios.post("https://quiet-citadel-47660-0ac4c1daa42c.herokuapp.com/api/account/investor/register", account)

            toast.success("Investment Account Successfully Created. You can proceed to login.")

            router.push("/login/investor")

        } catch (error: any) {
            setError("Error, Please Try Again.")
            toast.error("Error, Please Try Again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (account.firstName && account.lastName && account.identityNumber && isValidEmail(account.email) && account.phoneNumber && isValidPassword(account.password)) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    })

    const content = (
        <div className='w-full h-[93vh] flex flex-col items-center justify-center'>
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className='text-center mb-5 font-bold'>Become An Investor</h1>
            <div className='w-full md:w-[35rem]'>
                <form>
                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineUser size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, firstName: e.target.value })}
                            id="firstname"
                            className='bg-transparent'
                            placeholder='First Name'
                            required
                        />
                    </div>
                    
                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineUser size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, lastName: e.target.value })}
                            id="lastname"
                            className='bg-transparent'
                            placeholder='Last Name'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineScan size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, identityNumber: e.target.value })}
                            id="identitynumber"
                            className='bg-transparent'
                            placeholder='Identity Number'
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
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiTwotoneMobile size={15} />
                        <input
                            type="text"
                            onChange={(e: any) => setAccount({ ...account, phoneNumber: e.target.value })}
                            id="phoneNumber"
                            className='bg-transparent'
                            placeholder='Cellphone Number'
                            required
                        />
                    </div>

                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineSafety size={15} />
                        <input
                            type="password"
                            onChange={(e: any) => setAccount({ ...account, password: e.target.value })}
                            id="password"
                            className='bg-transparent'
                            placeholder='Password'
                            required
                        />
                    </div>

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

    return content;
}

export default InvestorSignUpPage