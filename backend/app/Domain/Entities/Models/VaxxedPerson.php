<?php

namespace App\Domain\Entities\Models;

use App\Application\Security\SensitiveDataProcessorTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VaxxedPerson extends Model
{
    use HasFactory;
    use SensitiveDataProcessorTrait;

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

    protected array $sensitiveAttributes = [
        'cpf',
        'full_name',
    ];

    protected $hidden = [
        'hash_cpf',
    ];

    protected array $dateAttributes = [
        'birthdate',
        'first_dose',
        'second_dose',
        'third_dose',
    ];

    protected static function booted(): void
    {
        static::updating(function ($user) {
            $user->attributes['hash_cpf'] = hash('sha256', $user->attributes['cpf']);
            $user->encryptAttributes();
        });

        static::creating(function ($user) {
            $user->attributes['hash_cpf'] = hash('sha256', $user->attributes['cpf']);
            $user->encryptAttributes();
        });

        static::retrieved(function ($user) {
            $user->decryptAttributes();
            $user->formatData();
        });
    }
}