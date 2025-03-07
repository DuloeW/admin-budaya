import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usernamee = e.target[0].value;
        const passwordd = e.target[1].value;

        try {
            // console.log(JSON.stringify({ usernamee, passwordd }));
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernamee,
                    password: passwordd
                }),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            Swal.fire({
                title: data.message,
                icon: 'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/summary-chat')
                }
            })

        } catch (error) {
            console.error(error);
            Swal.fire({
                title: error.message || 'An error occured',
                icon: 'error'
            })
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <span className="text-sm flex gap-1">
                    <p className='opacity-40'>Don't have account?</p>
                    <Link className='text-indigo-600 opacity-100 underline'
                        to='/register'> register</Link>
                </span>
            </div>
        </div>
    );
};

export default Login;