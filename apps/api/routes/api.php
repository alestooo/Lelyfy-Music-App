<?php

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Lelyfy API',
        'message' => 'La API está funcionando.',
    ]);
});