<?php

use App\Http\Controllers\DeckController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Deck;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $decks = Deck::orderByDesc('updated_at')->take(5)->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'decks' => $decks,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Cards route
Route::get('/cards', function () {
    return Inertia::render('Cards/Index');
})->name('cards');

// News route
Route::get('/news', function () {
    return Inertia::render('News/Index');
})->name('news');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/decks/all', [DeckController::class, 'allDecks'])->name('decks.all');

Route::middleware('auth')->group(function () {
    Route::get('/decks/sandbox', function() {
        return Inertia::render('Decks/Sandbox');
    })->name('decks.sandbox');
    Route::get('/decks/sandbox/{deck}', [DeckController::class, 'edit'])->name('deck.edit');
    Route::resource('decks', DeckController::class);
});

Route::get('/decks/{deck}', [DeckController::class, 'show'])->name('deck.show');

require __DIR__.'/auth.php';
