<?php

// DeckController.php

namespace App\Http\Controllers;

use App\Http\Requests\DeckRequest;
use App\Models\Deck;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class DeckController extends Controller
{
    public function index(): Response
    {
        $decks = Auth::user()->decks()->orderByDesc('updated_at')->get();
        
        return Inertia::render('Decks/Index', [
            'decks' => $decks
        ]);
    }

    public function allDecks(Request $request): Response
    {
        $name = $request->query('name');
        $decks = Deck::query();

        if($name) {
            $decks->where('name', $name);
        }

        $filteredDecks = $decks->orderByDesc('updated_at')->get();

        return Inertia::render('Decks/Index', [
            'decks' => $filteredDecks
        ]);
    }

    public function store(DeckRequest $request) : RedirectResponse {
        DB::beginTransaction();

        try {
            $validated = $request->validated();
            $validated['user_id'] = Auth::id();
            $deck = Deck::create($validated);

            DB::commit();

            return redirect()->route('decks.index')->withSuccess('Deck created successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error storing deck: ' . $e->getMessage());
            return back()->withError('Failed to store deck. Please try again.');
        }
    }

    public function show(Deck $deck): Response
    {
        return Inertia::render('Decks/DeckDetail', [
            'deck' => $deck->toArray()
        ]);
    }

    public function edit(Deck $deck): Response
    {
        
        return Inertia::render('Decks/UpdateDeck', [
            'deck' => $deck->toArray()
        ]);
    }

    public function update(DeckRequest $request, Deck $deck) : RedirectResponse
    {
        if (Gate::denies('update-or-delete-deck', $deck)) {
            abort(403, 'Unauthorized');
        }

        DB::beginTransaction();

        try {
            $validated = $request->validated();
            $deck->update($validated);

            DB::commit();

            return redirect()->route('decks.index')->withSuccess('Deck updated successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error updating deck: ' . $e->getMessage());
            return back()->withError('Failed to update deck. Please try again.');
        }
    }

    public function destroy(Deck $deck) : RedirectResponse
    {
        if (Gate::denies('update-or-delete-deck', $deck)) {
            abort(403, 'Unauthorized');
        }

        DB::beginTransaction();

        try {
            $deck->delete();

            DB::commit();

            return redirect()->route('decks.index')->withSuccess('Deck deleted successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error deleting deck: ' . $e->getMessage());
            return back()->withError('Failed to delete deck. Please try again.');
        }
    }
}
