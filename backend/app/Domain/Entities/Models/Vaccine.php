<?php

namespace App\Domain\Entities\Models;

use App\Application\Security\SensitiveDataProcessorTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;
    use SensitiveDataProcessorTrait;

    protected $table = 'vaccines';

    protected $fillable = [
        'id',
        'name',
        'lot',
        'expiry_date',
    ];

    protected array $dateAttributes = [
        'expiry_date',
    ];

    protected static function booted(): void
    {
        static::retrieved(function ($user) {
            $user->formatData();
        });
    }
}