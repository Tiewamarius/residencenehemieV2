<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));

Route::get('/a-propos', fn() => Inertia::render('About'));

Route::get('/hebergement', fn() => Inertia::render('Rooms'));

Route::get('/services', fn() => Inertia::render('Services'));

Route::get('/rooms', fn() => Inertia::render('Rooms'));

Route::get('/restauration', fn() => Inertia::render('RestaurationPage'));

Route::get('/reservation', fn() => Inertia::render('Reservation'));
