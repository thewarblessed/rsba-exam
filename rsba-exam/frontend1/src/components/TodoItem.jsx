import React, { useState } from 'react';
import Button from './Button';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);

    const handleUpdate = () => {
        if (newTitle) {
            onUpdate(todo.id, { title: newTitle, description: newDescription });
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-start justify-between p-2 border-b gap-4">
            <div className="flex flex-col gap-2 w-full max-w-xl">
                <p className="text-sm text-gray-400 italic">
                    Added on {new Date(todo.created_at).toLocaleDateString()}
                </p>
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border p-2 rounded-lg w-full"
                        placeholder="Task Title"
                    />
                ) : (
                    <p className="font-semibold text-lg break-words whitespace-pre-wrap w-full">
                        {todo.title}
                    </p>
                )}

                {isEditing ? (
                    <textarea
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="border p-2 rounded-lg w-full"
                        placeholder="Task Description"
                    />
                ) : (
                    <p className="text-gray-400 break-words whitespace-pre-wrap w-full">
                        {todo.description}
                    </p>
                )}

            </div>

            <div className="flex flex-col items-end gap-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleUpdate}>Save</Button>
                        <Button
                            onClick={() => {
                                setNewTitle(todo.title);
                                setNewDescription(todo.description);
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button onClick={() => onDelete(todo.id)} className="ml-0">
                            Delete
                        </Button>
                    </>
                )}
            </div>

        </div>

    );
};

export default TodoItem;
