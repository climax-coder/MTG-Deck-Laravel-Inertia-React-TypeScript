<?php

// Deck Model

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'imageId',
        'avgCmc',
        'cards',
        'user_id',
        'count',
    ];

    protected $casts = [
        'cards' => 'array'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function decodeCardsAttribute()
    {
        return json_decode($this->attributes['cards']);
    }
}

