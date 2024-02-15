<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Deck;

class DeckRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'imageId' =>'nullable|string',
            'avgCmc' =>'nullable|numeric',
            'cards' => 'required|array',
            'count' =>'nullable|numeric',
        ];
    }
}
