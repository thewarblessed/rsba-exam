import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import TodoItem from '../components/TodoItem';
import Button from '../components/Button';
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const tasks = await fetchTodos();
                // console.log(tasks);
                setTodos(tasks);

            } catch (err) {
                setError('Failed to load tasks');
                console.log(err)
            }
        };
        loadTodos();
    }, []);

    const handleAddTask = async () => {
        if (!newTaskTitle) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid title',
                text: 'No Task Title',
            });
            return;
        }
        if (!newTaskDesc) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Description',
                text: 'No Task Description',
            });
            return;
        }
        try {
            const task = await createTodo({ title: newTaskTitle, description: newTaskDesc });
            setTodos([...todos, task]);
            setNewTaskTitle('');
            setNewTaskDesc('');
            setError('');
            Swal.fire({
                icon: "success",
                title: "Task created successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            setError('Failed to add task');
            console.log(err)
        }
    };

    const handleUpdateTask = async (id, data) => {
        // console.log(data)
        try {
            const updatedTask = await updateTodo(id, data);
            setTodos(todos.map((task) => (task.id === id ? updatedTask : task)));
            Swal.fire({
                icon: "success",
                title: "Task updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await deleteTodo(id); // delete only if confirmed
                setTodos(todos.filter((task) => task.id !== id));

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                });
            }

        } catch (err) {
            console.error(err);
            setError("Failed to delete task");
        }
    };

    return (
        <div className="max-w-2xl w-full mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">My To-Do Lists</h2>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className="mb-6">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="New task title"
                />

                <textarea
                    className="mt-3 border border-gray-300 rounded-lg p-3 w-full min-h-[10rem] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    placeholder="Task Description"
                ></textarea>

                <div className="mt-3 flex justify-start">
                    <Button onClick={handleAddTask} className="mt-2 bg-sky-900">
                        Add Task
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {todos
                    .sort((a, b) => b.id - a.id) // Sorting in descending order based on id
                    .map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                        />
                    ))}
            </div>
        </div>

    );
};

export default Dashboard;
