<?php

namespace Database\Factories;

use App\Domain\Entities\Models\Vaccine;
use Illuminate\Database\Eloquent\Factories\Factory;

class VaccineFactory extends Factory
{
    protected $model = Vaccine::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'lot' => $this->faker->name(),
            'expiry_date' => '2021-01-01',
        ];
    }
}
