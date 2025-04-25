// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();
// const API_URL = 'http://localhost:8000/api';

// export const useAuth = () => useContext(AuthContext);

// // AuthProvider to wrap your app
// export const AuthProvider = ({ children }) => {
//     // const [user, setUser] = useState({ name: 'John Doe' }); // Example default user

//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 // const res = await axios.get('/user', { withCredentials: true });
//                 const res = await axios.get(`${API_URL}/user`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     // withCredentials: true
//                 });
//                 console.log(res);
//                 // setUser(res.data); // Assumes backend returns the user object
//             } catch (err) {
//                 console.error('Failed to fetch user:', err);
//                 setUser(null); // not logged in or error
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };