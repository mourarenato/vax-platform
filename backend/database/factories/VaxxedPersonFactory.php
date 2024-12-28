<?php

namespace Database\Factories;

use App\Domain\Entities\Models\VaxxedPerson;
use Illuminate\Database\Eloquent\Factories\Factory;

class VaxxedPersonFactory extends Factory
{
    protected $model = VaxxedPerson::class;

    public function definition(): array
    {
        return [
            'vaccine_id' => $this->faker->numberBetween(1, 100),
            'cpf' => '460.793.440-25',
            'hash_cpf' => '560cfffac9124fcae46bbd4562b378ea58e6524f6173ec6ae8ca0b190d1d3d4d',
            'full_name' => $this->faker->name,
            'birthdate' => '1985-01-01',
            'first_dose' => '2020-01-01',
            'second_dose' => '2020-09-07',
            'third_dose' => '2021-01-01',
            'vaccine_applied' => 'Coronavac',
            'has_comorbidity' => 0,
        ];
    }
}