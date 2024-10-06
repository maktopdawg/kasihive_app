'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";

const navLinks = [
    {
        name: "home",
        link: "/"
    },
    {
        name: "invest",
        link: "/invest"
    },
    {
        name: "learn",
        link: "/learn"
    },
    {
        name: "dashboard",
        link: "/dashboard"
    },
    {
        name: "about",
        link: "/about"
    },
    {
        name: "contact",
        link: "/contact"
    },
]

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const content = (
        <nav className='flex items-center w-full justify-between mb-6'>
            <h1 className='font-bold text-3xl text-center tracking-widest'>KASIHIVE</h1>

            <div>
                <AiOutlineMenu className='cursor-pointer' size={25} onClick={() => setOpenMenu(!openMenu)} />
            </div>

            {/* Updated ul with proper class styles for sliding effect */}
            <ul
                className={`border rounded-lg h-[22rem] fixed top-0 right-0 h-full w-60 bg-[#0e1420] transition-transform transform ${openMenu ? 'translate-x-0' : 'translate-x-full'} mt-16`}>
                {navLinks.map((item, index) => (
                    <li key={index} className='p-4 text-center'>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )

    return content;
}

export default Navbar;
