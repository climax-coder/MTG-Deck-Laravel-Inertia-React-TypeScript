<?php

// DeckStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeckStoreRequest extends FormRequest
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
