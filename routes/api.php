<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuManagement\MenuController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/menu-management/menuList', [MenuController::class, 'index']);
Route::post('/menu-management/list', [MenuController::class, 'getMenuAuth']);
Route::post('/menu-management/getParent/{cat}', [MenuController::class, 'getParent']);
Route::post('/menu-management/add/', [MenuController::class, 'store']);
Route::post('/menu-management/delete/', [MenuController::class, 'delete']);




