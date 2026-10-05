<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', fn() => Inertia::render('Home'));

Route::get('/a-propos', fn() => Inertia::render('About'));

Route::get('/hebergement', fn() => Inertia::render('Rooms'));

Route::get('/services', fn() => Inertia::render('Services'));

Route::get('/rooms', fn() => Inertia::render('Rooms'));

Route::get('/restauration', fn() => Inertia::render('RestaurationPage'));

Route::get('/reservation', fn() => Inertia::render('Reservation'));
// Le widget envoie check_in / check_out en POST : on redirige vers la page en GET
Route::post('/reservation', function (Request $request) {
    return redirect('/reservation?' . http_build_query(
        $request->only(['check_in', 'check_out'])
    ));
});

Route::get('/reservation', fn (Request $request) => Inertia::render('Reservation', [
    'checkIn'  => $request->query('check_in'),
    'checkOut' => $request->query('check_out'),
]));