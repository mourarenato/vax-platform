<?php

namespace App\Domain\Entities\Models;

use App\Application\Security\SensitiveDataProcessorTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    use SensitiveDataProcessorTrait;

    protected $table = 'users';

    protected $fillable = [
        'id',
        'email',
        'password',
        'first_name',
    ];

    protected $hidden = [
        'password',
    ];

    protected static function booted(): void
    {
        static::updating(function ($user) {
            $user->encryptAttributes();
        });

        static::creating(function ($user) {
            $user->bcryptPassword();
        });

        static::retrieved(function ($user) {
            $user->decryptAttributes();
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
