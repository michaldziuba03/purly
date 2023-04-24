import React from "react";
import Link from "next/link";
import {GitHubIcon} from "@/common/icons/GitHub";

export const Header: React.FC = () => {
    return (
        <header className='w-full flex justify-between px-20 py-10'>
            <h1 className='font-bold text-lg select-none text-black'>XXX</h1>

            <nav className='flex items-center gap-6 font-semibold text-sm text-slate-700'>
                <Link className='hover:text-purple-600 transition-colors duration-200' href='/'>Home</Link>
                <Link className='hover:text-purple-600 transition-colors duration-200' href='/report'>Report</Link>
                <Link className='hover:text-purple-600 transition-colors duration-200' href='/auth/login'>Login</Link>

                <div className='ml-5'>
                    <a className='hover:text-slate-900 text-slate-500'
                       href='https://github.com/michaldziuba03/url-shortener'
                       target='_blank'
                    >
                        <GitHubIcon />
                    </a>
                </div>
            </nav>
        </header>
    )
}