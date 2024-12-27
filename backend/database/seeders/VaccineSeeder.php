<?php

namespace Database\Seeders;

use App\Domain\Entities\Models\Vaccine;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Vaccine::create([
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ]);

        Vaccine::create([
            'name' => 'Pfizer',
            'lot' => 'B456',
            'expiry_date' => '2026-02-15',
        ]);

        Vaccine::create([
            'name' => 'Moderna',
            'lot' => 'C789',
            'expiry_date' => '2026-03-30',
        ]);

        Vaccine::create([
            'name' => 'AstraZeneca',
            'lot' => 'D101',
            'expiry_date' => '2025-11-20',
        ]);

        Vaccine::create([
            'name' => 'Janssen',
            'lot' => 'E112',
            'expiry_date' => '2025-08-12',
        ]);

        Vaccine::create([
            'name' => 'BCG',
            'lot' => 'F131',
            'expiry_date' => '2027-07-01',
        ]);

        Vaccine::create([
            'name' => 'Hepatitis B',
            'lot' => 'G141',
            'expiry_date' => '2026-06-10',
        ]);

        Vaccine::create([
            'name' => 'MMR (Measles, Mumps, Rubella)',
            'lot' => 'H151',
            'expiry_date' => '2026-09-21',
        ]);

        Vaccine::create([
            'name' => 'Polio',
            'lot' => 'I161',
            'expiry_date' => '2025-04-15',
        ]);

        Vaccine::create([
            'name' => 'Varicella (Chickenpox)',
            'lot' => 'J171',
            'expiry_date' => '2027-03-11',
        ]);

        Vaccine::create([
            'name' => 'HPV',
            'lot' => 'K181',
            'expiry_date' => '2026-12-01',
        ]);

        Vaccine::create([
            'name' => 'Yellow Fever',
            'lot' => 'L191',
            'expiry_date' => '2028-05-20',
        ]);

        Vaccine::create([
            'name' => 'Typhoid',
            'lot' => 'M202',
            'expiry_date' => '2026-10-15',
        ]);

        Vaccine::create([
            'name' => 'Rabies',
            'lot' => 'N212',
            'expiry_date' => '2027-02-08',
        ]);

        Vaccine::create([
            'name' => 'Influenza',
            'lot' => 'O223',
            'expiry_date' => '2025-09-30',
        ]);
    }
}
