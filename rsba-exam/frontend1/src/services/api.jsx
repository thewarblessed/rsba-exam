import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Replace with your API URL

const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Or use another method if stored differently
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/signin`, { email, password });
  localStorage.setItem('token', response.data.token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Fetch all todos
export const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response.data)
    return response.data;
  };
  
  // Create a task
  export const createTodo = async (data) => {
    console.log(data);
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/todos`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  // Update a task
  export const updateTodo = async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/todos/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  // Delete a task
  export const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };