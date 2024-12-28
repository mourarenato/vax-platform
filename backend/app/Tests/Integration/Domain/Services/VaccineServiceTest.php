<?php

namespace App\Tests\Integration\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\VaccineNotFoundException;
use App\Application\Exceptions\CreateVaccineException;
use App\Application\Exceptions\DeleteVaccineException;
use App\Domain\Entities\Models\Vaccine;
use App\Domain\Repositories\VaccineRepository;
use App\Domain\Services\VaccineService;
use Database\Factories\VaccineFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Tests\TestCase;
use Throwable;

class VaccineServiceTest extends TestCase
{
    use RefreshDatabase;

    private VaccineRepository $vaccineRepository;

    /**
     */
    public function __construct()
    {
        parent::__construct(...func_get_args());
        $this->vaccineRepository = new VaccineRepository();
    }

    /**
     * @throws CreateVaccineException
     */
    public function testCreateVaccineShouldCreateOneVaccine(): void
    {
        $requestData = [
            'id' => '2',
            'name' => 'Johnson & Johnson',
            'lot' => 'D012',
            'expiry_date' => '2026-09-10',
        ];

        VaccineFactory::new()->create([
            'id' => '1',
            'name' => 'Pfizer',
            'lot' => 'B456',
            'expiry_date' => '2026-05-15',
        ]);

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);
        $vaccineService->createVaccine();

        $vaccine = Vaccine::where('id', 2)->first();

        $this->assertEquals(2, $vaccine->id);
        $this->assertEquals("Johnson & Johnson", $vaccine->name);
    }

    /**
     * @throws VaccineNotFoundException
     * @throws DeleteVaccineException
     */
    public function testDeleteVaccines(): void
    {
        $requestData = [
            "ids" => [1, 2],
        ];

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

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);
        $vaccineService->deleteVaccines();

        $vaccineOne = $this->vaccineRepository->getById($vaccineFactory1->id);
        $vaccineTwo = $this->vaccineRepository->getById($vaccineFactory2->id);
        $vaccineThree = $this->vaccineRepository->getById($vaccineFactory3->id);

        $this->assertNull($vaccineOne);
        $this->assertNull($vaccineTwo);
        $this->assertInstanceOf(Vaccine::class, $vaccineThree);
    }

    /**
     * @throws Throwable
     */
    public function testGetVaccinesShouldReturnVaccines(): void
    {
        VaccineFactory::new()->create([
            'id' => 2,
            'name' => 'Johnson & Johnson',
            'lot' => 'D012',
            'expiry_date' => '2026-09-10',
        ]);

        VaccineFactory::new()->create([
            'id' => 3,
            'name' => 'Moderna',
            'lot' => 'C789',
            'expiry_date' => '2027-03-21',
        ]);

        VaccineFactory::new()->create([
            'id' => 1,
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ]);

        $expected = [
            [
                'id' => 2,
                'name' => 'Johnson & Johnson',
                'lot' => 'D012',
                'expiry_date' => '2026-09-10',
            ],
            [
                'id' => 3,
                'name' => 'Moderna',
                'lot' => 'C789',
                'expiry_date' => '2027-03-21',
            ],
            [
                'id' => 1,
                'name' => 'CoronaVac',
                'lot' => 'A123',
                'expiry_date' => '2025-01-01',
            ],
        ];

        $vaccineService = new VaccineService([], $this->vaccineRepository);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaccineService->getVaccines($paginationDtoMock));
        $result = $vaccineService->getVaccines($paginationDtoMock)->toArray()['data'];

        $result = array_map(function ($item) {
            unset($item['created_at']);
            unset($item['updated_at']);
            return $item;
        }, $result);

        $this->assertEquals($expected, $result);
    }

    /**
     * @throws Throwable
     */
    public function testGetVaccinesWithFiltersShouldReturnFilteredVaccines(): void
    {
        VaccineFactory::new()->create([
            'id' => 2,
            'name' => 'Johnson & Johnson',
            'lot' => 'D012',
            'expiry_date' => '2026-09-10',
        ]);

        VaccineFactory::new()->create([
            'id' => 3,
            'name' => 'Moderna',
            'lot' => 'C789',
            'expiry_date' => '2027-03-21',
        ]);

        VaccineFactory::new()->create([
            'id' => 1,
            'name' => 'CoronaVac',
            'lot' => 'A123',
            'expiry_date' => '2025-01-01',
        ]);

        $requestData = [
            "filters" => [
                "name" => 'CoronaVac',
            ]
        ];

        $expected = [
            [
                'id' => 1,
                'name' => 'CoronaVac',
                'lot' => 'A123',
                'expiry_date' => '2025-01-01',
            ],
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaccineService->getVaccines($paginationDtoMock));
        $result = $vaccineService->getVaccines($paginationDtoMock)->toArray()['data'];

        $result = array_map(function ($item) {
            unset($item['created_at']);
            unset($item['updated_at']);
            return $item;
        }, $result);

        $this->assertEquals($expected, $result);
    }
}