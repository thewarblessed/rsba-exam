import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/api';
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // alert('nice');
        // console.log('ahahah')
        try {
            await login(email, password);
            Swal.fire({
                icon: "success",
                title: "Logged In!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid credentials',
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
            {/* Big Title */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-white">My Todo App</h1>
            </div>

            {/* Login Form */}
            <div className="max-w-md w-full p-6 bg-neutral rounded-lg shadow-lg">
                <h2 className="text-3xl text-center mb-6 font-semibold text-white">Login</h2>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <div className="mb-4">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full input input-bordered input-primary text-white bg-base-200"
                    />
                </div>
                <div className="mb-6">
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full input input-bordered input-primary text-white bg-base-200"
                    />
                </div>

                <Button
                    onClick={handleLogin}
                    className="w-full py-2 bg-info text-black font-semibold rounded-md hover:bg-primary-focus"
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;
