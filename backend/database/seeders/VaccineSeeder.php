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
            'name' => 'Pfizer',
            'lot' => 'B456',
            'expiry_date' => '2026-02-15',
        ]);

        Vaccine::create([
            'name' => 'Janssen',
            'lot' => 'E112',
            'expiry_date' => '2025-08-12',
        ]);

        Vaccine::create([
            'name' => 'Sputnik V',
            'lot' => 'F131',
            'expiry_date' => '2027-07-01',
        ]);

        Vaccine::create([
            'name' => 'Covaxin',
            'lot' => 'G141',
            'expiry_date' => '2026-06-10',
        ]);

        Vaccine::create([
            'name' => 'Sinopharm',
            'lot' => 'H151',
            'expiry_date' => '2026-09-21',
        ]);

        Vaccine::create([
            'name' => 'Novavax',
            'lot' => 'I161',
            'expiry_date' => '2025-04-15',
        ]);

        Vaccine::create([
            'name' => 'Covovax',
            'lot' => 'J171',
            'expiry_date' => '2027-03-11',
        ]);

        Vaccine::create([
            'name' => 'Pfizer Bivalent',
            'lot' => 'K181',
            'expiry_date' => '2026-12-01',
        ]);

        Vaccine::create([
            'name' => 'Moderna Bivalent',
            'lot' => 'L191',
            'expiry_date' => '2028-05-20',
        ]);

        Vaccine::create([
            'name' => 'CanSinoBIO',
            'lot' => 'M202',
            'expiry_date' => '2026-10-15',
        ]);

        Vaccine::create([
            'name' => 'Zifivax',
            'lot' => 'N212',
            'expiry_date' => '2027-02-08',
        ]);
    }
}
