<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\UserAddress;

class UsersController extends Controller
{
    public function index(){

        $userData['data'] = User::with('user_address')->get();
        // dd($userData);
        return view('pages.users',$userData);
    }

    public function addUserData(Request $request){

        // dd($request->all());
        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'mobile_no' => $request->mobile_no,
                'gender' => $request->gender,
                'date_of_birth' => $request->dob,
                'age' => $request->age,
            ]);
            if($request->addresses){
                foreach ($request->addresses as $addressData) {
                    UserAddress::create([
                        'user_id' => $user->id,
                        'address' => $addressData['address'],
                        'state' => $addressData['state'],
                        'city' => $addressData['city'],
                        'pincode' => $addressData['pincode'],
                    ]);
                }
            }
            
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Form submitted successfully']);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'An error occurred while saving the data']);
        }
    }

    public function editUserData(Request $request){

        // dd($request->all());
        try {
            DB::beginTransaction();

            // Find the user
            $user = User::findOrFail($request->input('user_id'));
            // dd($user);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'mobile_no' => $request->mobile_no,
                'gender' => $request->gender,
                'date_of_birth' => $request->dob,
                'age' => $request->age,
            ]);

            UserAddress::where('user_id',$request->input('user_id'))->delete();
            if($request->addresses){
                foreach ($request->addresses as $addressData) {

                    UserAddress::create([
                        'user_id' => $user->id,
                        'address' => $addressData['address'],
                        'state' => $addressData['state'],
                        'city' => $addressData['city'],
                        'pincode' => $addressData['pincode'],
                    ]);
                }
            }
            
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Form submitted successfully']);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'An error occurred while saving the data']);
        }
    }

    public function deleteUser(Request $request)
    {
        $userId = $request->input('user_id');

        // dd($userId);
        User::where('id',$userId)->delete();
        UserAddress::where('user_id',$userId)->delete();
        return response()->json(['success' => true]);
    }
}
