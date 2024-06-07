<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/index',[UsersController::class,'index'])->name('index');
Route::post('/addUserData',[UsersController::class,'addUserData'])->name('addUserData');
Route::post('/editUserData',[UsersController::class,'editUserData'])->name('editUserData');
Route::post('/deleteUser',[UsersController::class,'deleteUser'])->name('deleteUser');

