<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //
    public function signin(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
    
            $token = $user->createToken('api_token')->plainTextToken;
            // dd($token);
    
            return response()->json([
                'message' => "Logged In Successfully",
                'success' => true,
                'token' => $token,
                'Type' => 'Bearer',
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'message' => "Invalid email or password",
                'success' => false,
            ], 401);
        }
    }

    public function signout(Request $request) {
        // Check if the user is authenticated
        if ($request->user()) {
            try {
                // Log out the user by deleting the current token
                $request->user()->currentAccessToken()->delete();
    
                // Optionally, if needed, log out from the session as well
                // Auth::logout(); // Uncomment if using session-based logout as well
    
                // Log the sign-out action for auditing (Optional)
                \Log::info('User logged out', ['user_id' => $request->user()->id]);
    
                // Return success response
                return response()->json(['message' => 'Logged out successfully'], 200);
            } catch (\Exception $e) {
                // In case of any error, return an error message
                \Log::error('Error during sign out', ['error' => $e->getMessage()]);
    
                return response()->json(['message' => 'Error logging out, please try again.'], 500);
            }
        }
    
        // If the user is not authenticated, return an error
        return response()->json(['message' => 'No user is authenticated'], 401);
    }
    

}
