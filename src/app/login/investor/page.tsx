"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import isValidEmail from '@/utils/isValidEmail';
import isValidPassword from '@/utils/isValidPassword';
import { AiOutlineUser, AiOutlineScan, AiOutlineSafety, AiTwotoneMobile, AiTwotoneMail } from "react-icons/ai";


const page = () => {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [account, setAccount] = useState({
      email: "",
      password: ""
    });

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/accounts/investor/login", account)

            if (response.data.error) {
                setError(response.data.error)
                return;
            }

            router.push("/invest")
        } catch (error: any) {
            setError("Invalid Email or Password")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isValidEmail(account.email) && isValidPassword(account.password)) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    })


    const content = (
        <div className='w-full h-[93vh] flex flex-col items-center justify-center'>
            <h1 className='text-center mb-5 font-bold'>Login To Begin Investing</h1>
            <div className='w-full md:w-[35rem]'>
                <form>
                    <div className='border flex gap-5 items-center h-[4rem] p-5 rounded-lg mb-7'>
                        <AiOutlineUser size={15} />
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
                        <AiOutlineUser size={15} />
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
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full h-[4rem] rounded-lg ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'}`}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )

    return content;
}

export default page