<?php

namespace Database\Seeders;

use App\Domain\Entities\Models\VaxxedPerson;
use Illuminate\Database\Seeder;

class VaxxedPersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        VaxxedPerson::create([
            'cpf' => '123.456.789-00',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'Pfizer',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '987.654.321-11',
            'full_name' => 'Jane Smith',
            'birthdate' => '1985-05-12',
            'first_dose' => '2022-02-10',
            'second_dose' => '2022-03-10',
            'third_dose' => '2022-10-10',
            'vaccine_applied' => 'Moderna',
            'has_comorbidity' => 1,
        ]);

        VaxxedPerson::create([
            'cpf' => '456.789.123-22',
            'full_name' => 'Robert Johnson',
            'birthdate' => '1975-07-23',
            'first_dose' => '2022-01-20',
            'second_dose' => '2022-02-20',
            'third_dose' => '2022-09-20',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '321.654.987-33',
            'full_name' => 'Emily Davis',
            'birthdate' => '2000-11-02',
            'first_dose' => '2022-03-01',
            'second_dose' => '2022-04-01',
            'third_dose' => '2022-11-01',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '789.123.456-44',
            'full_name' => 'Michael Brown',
            'birthdate' => '1995-09-17',
            'first_dose' => '2022-02-25',
            'second_dose' => '2022-03-25',
            'third_dose' => '2022-10-25',
            'vaccine_applied' => 'Janssen',
            'has_comorbidity' => 1,
        ]);

        VaxxedPerson::create([
            'cpf' => '147.258.369-55',
            'full_name' => 'Jessica Wilson',
            'birthdate' => '1992-03-14',
            'first_dose' => '2022-01-18',
            'second_dose' => '2022-02-18',
            'third_dose' => '2022-09-18',
            'vaccine_applied' => 'Pfizer',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '258.369.147-66',
            'full_name' => 'David White',
            'birthdate' => '1965-12-30',
            'first_dose' => '2022-01-10',
            'second_dose' => '2022-02-10',
            'third_dose' => '2022-09-10',
            'vaccine_applied' => 'Moderna',
            'has_comorbidity' => 1,
        ]);

        VaxxedPerson::create([
            'cpf' => '369.147.258-77',
            'full_name' => 'Linda Harris',
            'birthdate' => '1978-06-05',
            'first_dose' => '2022-02-15',
            'second_dose' => '2022-03-15',
            'third_dose' => '2022-10-15',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '951.753.852-88',
            'full_name' => 'Kevin Clark',
            'birthdate' => '1999-08-10',
            'first_dose' => '2022-03-05',
            'second_dose' => '2022-04-05',
            'third_dose' => '2022-11-05',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '753.951.852-99',
            'full_name' => 'Sarah Martinez',
            'birthdate' => '1988-04-20',
            'first_dose' => '2022-01-12',
            'second_dose' => '2022-02-12',
            'third_dose' => '2022-09-12',
            'vaccine_applied' => 'Pfizer',
            'has_comorbidity' => 1,
        ]);

        VaxxedPerson::create([
            'cpf' => '852.741.963-00',
            'full_name' => 'Anthony Lee',
            'birthdate' => '1982-05-15',
            'first_dose' => '2022-02-18',
            'second_dose' => '2022-03-18',
            'third_dose' => '2022-10-18',
            'vaccine_applied' => 'Janssen',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '654.321.987-11',
            'full_name' => 'Patricia Anderson',
            'birthdate' => '2001-02-25',
            'first_dose' => '2022-03-10',
            'second_dose' => '2022-04-10',
            'third_dose' => '2022-11-10',
            'vaccine_applied' => 'Moderna',
            'has_comorbidity' => 0,
        ]);

        VaxxedPerson::create([
            'cpf' => '123.789.456-22',
            'full_name' => 'Edward Taylor',
            'birthdate' => '1990-09-05',
            'first_dose' => '2022-01-28',
            'second_dose' => '2022-02-28',
            'third_dose' => '2022-09-28',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 1,
        ]);

        VaxxedPerson::create([
            'cpf' => '987.123.654-33',
            'full_name' => 'Barbara Thomas',
            'birthdate' => '1977-07-07',
            'first_dose' => '2022-02-20',
            'second_dose' => '2022-03-20',
            'third_dose' => '2022-10-20',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
        ]);
    }
}