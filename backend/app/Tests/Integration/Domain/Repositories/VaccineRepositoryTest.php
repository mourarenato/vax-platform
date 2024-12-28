<?php

namespace App\Tests\Integration\Domain\Repositories;

use App\Domain\Entities\Models\Vaccine;
use App\Domain\Repositories\VaccineRepository;
use App\Tests\TestCase;
use Database\Factories\VaccineFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VaccineRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     */
    public function testFirstOrCreateShouldCreate(): void
    {
        $data = [
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ];

        $vaccineRepository = new VaccineRepository();
        $vaccine = $vaccineRepository->firstOrCreate($data);

        $this->assertEquals('CoronaVac', $vaccine->name);
        $this->assertEquals('A123', $vaccine->lot);
        $this->assertEquals('2025-01-01', $vaccine->expiry_date);
    }

    /**
     */
    public function testGetById(): void
    {
        $data = [
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ];

        $vaccineFactory = VaccineFactory::new()->create($data);

        $vaccineRepository = new VaccineRepository();
        $vaccine = $vaccineRepository->getById($vaccineFactory->id);

        $this->assertEquals('CoronaVac', $vaccine->name);
        $this->assertEquals('A123', $vaccine->lot);
        $this->assertEquals('2025-01-01', $vaccine->expiry_date);
    }

    public function testDeleteVaccinesById(): void
    {
        $dataToDelete = [1, 2];

        $vaccineFactory2 = VaccineFactory::new()->create([
            'id' => 2,
            'name' => 'Johnson & Johnson',
            'lot' => 'D012',
            'expiry_date' => '2026-09-10',
        ]);

        $vaccineFactory3 = VaccineFactory::new()->create([
            'id' => 3,
            'name' => 'Moderna',
            'lot' => 'C789',
            'expiry_date' => '2027-03-21',
        ]);

        $vaccineFactory1 = VaccineFactory::new()->create([
            'id' => 1,
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ]);

        $vaccineRepository = new VaccineRepository();
        $vaccineRepository->deleteVaccinesById($dataToDelete);

        $vaccineOne = $vaccineRepository->getById($vaccineFactory1->id);
        $vaccineTwo = $vaccineRepository->getById($vaccineFactory2->id);
        $vaccineThree = $vaccineRepository->getById($vaccineFactory3->id);


        $this->assertNull($vaccineOne);
        $this->assertNull($vaccineTwo);
        $this->assertInstanceOf(Vaccine::class, $vaccineThree);
    }
}