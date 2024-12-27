<?php

use App\Interfaces\Controllers\UserController;
use App\Interfaces\Controllers\VaccineController;
use App\Interfaces\Controllers\VaxxedPersonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['exception.handleUser', 'cors']], function () {
    Route::post('signin', [UserController::class, 'signin']);
    Route::post('signup', [UserController::class, 'signup']);
});

Route::group(['middleware' => ['jwt.verify', 'cors']], function () {
    Route::group(['middleware' => ['exception.handleUser']], function () {
        Route::get('getProfile', [UserController::class, 'get']);
        Route::put('updateProfile', [UserController::class, 'update']);
        Route::delete('deleteProfile', [UserController::class, 'delete']);
        Route::post('signout', [UserController::class, 'signout']);
    });

    Route::group(['middleware' => ['exception.handleVax', 'cors']], function () {
        //Vaccine
        Route::post('registerVaccine', [VaccineController::class, 'create']);
        Route::get('getVaccines', [VaccineController::class, 'get']);
        Route::delete('deleteVaccines', [VaccineController::class, 'delete']);
        //Vaxxed Person
        Route::post('registerVaxxedPerson', [VaxxedPersonController::class, 'create']);
        Route::get('getVaxxedPeople', [VaxxedPersonController::class, 'get']);
        Route::delete('deleteVaxxedPeople', [VaxxedPersonController::class, 'delete']);
    });
});
