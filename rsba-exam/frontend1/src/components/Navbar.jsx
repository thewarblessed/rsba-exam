import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Navbar({ user }) {
    // const { user } = useAuth();
    // const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage or sessionStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // If you're using JWT token

        // Optionally, remove token from API requests headers
        // api.setAuthToken(null); // If you're using Axios with token in headers

        // Redirect to login page
        navigate('/'); // Assuming your login page route is '/'
        Swal.fire({
            title: "Logged Out Successfully",
            icon: "success",
        });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">TODO</a>
            </div>
            <div className="flex-none">
                <button
                    className="btn btn-rectangle btn-solid bg-gray-400"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
