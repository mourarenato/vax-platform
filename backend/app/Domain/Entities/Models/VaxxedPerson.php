<?php

namespace App\Domain\Entities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VaxxedPerson extends Model
{
    use HasFactory;

    protected $table = 'vaxxed_people';

    protected $fillable = [
        'id',
        'vaccine_id',
        'cpf',
        'full_name',
        'birthdate',
        'first_dose',
        'second_dose',
        'third_dose',
        'vaccine_applied',
        'has_comorbidity'
    ];
}