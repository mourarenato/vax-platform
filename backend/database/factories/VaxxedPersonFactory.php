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
            'cpf' => '91285978005',
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