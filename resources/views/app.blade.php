<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Résidence Néhémie') }}</title>
    <!-- Style hotelLink -->
    <link rel="stylesheet" href="https://book.securebookings.net/css/app-v2.css" />


    <link rel="stylesheet" href="/css/Hero.css">
    <link rel="stylesheet" href="/css/Header.css">
    <link rel="stylesheet" href="/css/Gallery.css">


    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>