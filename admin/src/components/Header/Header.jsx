import React from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        navigate(isLoggedIn ? '/dashboard' : '/');
    };

    return (
        <div className="bg-gray-100 py-2 px-6 shadow-md">
            <div className="flex md:flex-col items-center justify-between space-y-4 md:space-y-0">

                {/* Logo */}
                <div className="w-1/4 md:w-1/2 md:justify-start items-center cursor-pointer mt-2 md:mt-0">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-40 md:w-48 items-center px-4 md:p-4"
                        onClick={handleLogoClick}
                    />
                </div>

                {/* Management System */}
                <div className="w-3/4 md:w-1/2 text-center md:text-right">
                    <h1 className="text-sm md:text-3xl font-bold text-gray-800">
                        Employee Movement Management System
                    </h1>
                </div>
            </div>
        </div>
    );
}
