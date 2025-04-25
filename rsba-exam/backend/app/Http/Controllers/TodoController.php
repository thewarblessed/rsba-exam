<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
        $todos = Auth::user()->todos;  // Fetch tasks for logged-in user
        return response()->json($todos, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // Validation
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',  // Optional 'completed' field
        ]);
    
        // Create a new todo task and associate it with the authenticated user
        $todo = Auth::user()->todos()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'completed' => $validated['completed'] ?? false, // Default to false if not provided
        ]);
    
        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $todo = Todo::find($id);
        // dd($todo->user_id);
        if ($todo->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'You are not authorized to update this task.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        // Update task
        $todo->update($request->all());

        return response()->json($todo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $todo = Todo::find($id);
        if ($todo->user_id !== Auth::id()) {
            return response()->json([
                'error' => 'You are not authorized to delete this task.'
            ], 403);
        }

        // Delete task
        $todo->delete();

        return response()->json([
            'message' => 'Todo task deleted successfully.'
        ], 200);
    }
}
