<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EventController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/show',[EventController::class,'show']);
Route::post('/create',[EventController::class,'create']);
Route::put('/update',[EventController::class,'update']);
Route::delete('/delete',[EventController::class,'destroy']);