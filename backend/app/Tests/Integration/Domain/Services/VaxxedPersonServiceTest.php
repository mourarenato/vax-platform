<?php

namespace App\Tests\Integration\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\VaxxedPersonNotFoundException;
use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Application\Exceptions\DeleteVaxxedPersonException;
use App\Application\Services\EmailService;
use App\Domain\Entities\Models\VaxxedPerson;
use App\Domain\Repositories\VaxxedPersonRepository;
use App\Domain\Services\VaxxedPersonService;
use Database\Factories\VaxxedPersonFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Tests\TestCase;
use Throwable;

class VaxxedPersonServiceTest extends TestCase
{
    use RefreshDatabase;

    private VaxxedPersonRepository $vaxxedPersonRepository;
    private EmailService $emailService;

    /**
     */
    public function __construct()
    {
        parent::__construct(...func_get_args());
        $this->vaxxedPersonRepository = new VaxxedPersonRepository();
        $this->emailService = $this->createMock(EmailService::class);
    }

    /**
     * @throws CreateVaxxedPersonException
     */
    public function testCreateVaxxedPersonShouldCreateOneVaxxedPerson(): void
    {
        $this->markTestSkipped('Fix in the future');

        $requestData = [
            'cpf' => '123.456.789-00',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'hasComorbidity' => 0,
        ];

        VaxxedPersonFactory::new()->create([
            'cpf' => '123.456.789-00',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'Pfizer',
            'hasComorbidity' => 0,
        ]);

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);
        $vaxxedPersonService->createVaxxedPerson();

        $vaxxedPerson = VaxxedPerson::where('id', 2)->first();

        $this->assertEquals(2, $vaxxedPerson->id);
        $this->assertEquals("Johnson & Johnson", $vaxxedPerson->name);
    }

//    /**
//     * @throws VaxxedPersonNotFoundException
//     * @throws DeleteVaxxedPersonException
//     */
//    public function testDeleteVaxxedPersons(): void
//    {
//        $requestData = [
//            "ids" => [1, 2],
//        ];
//
//        $vaxxedPersonFactory2 = VaxxedPersonFactory::new()->create([
//            'id' => 2,
//            'name' => 'Johnson & Johnson',
//            'lot' => 'D012',
//            'expiry_date' => '2026-09-10',
//        ]);
//
//        $vaxxedPersonFactory3 = VaxxedPersonFactory::new()->create([
//            'id' => 3,
//            'name' => 'Moderna',
//            'lot' => 'C789',
//            'expiry_date' => '2027-03-21',
//        ]);
//
//        $vaxxedPersonFactory1 = VaxxedPersonFactory::new()->create([
//            'id' => 1,
//            'name' => 'CoronaVac',
//            'lot' => 'A123',
//            'expiry_date' => '2025-01-01',
//        ]);
//
//        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository);
//        $vaxxedPersonService->deleteVaxxedPersons();
//
//        $vaxxedPersonOne = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory1->id);
//        $vaxxedPersonTwo = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory2->id);
//        $vaxxedPersonThree = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory3->id);
//
//        $this->assertNull($vaxxedPersonOne);
//        $this->assertNull($vaxxedPersonTwo);
//        $this->assertInstanceOf(VaxxedPerson::class, $vaxxedPersonThree);
//    }
//
//    /**
//     * @throws Throwable
//     */
//    public function testGetVaxxedPersonsShouldReturnVaxxedPersons(): void
//    {
//        VaxxedPersonFactory::new()->create([
//            'id' => 2,
//            'name' => 'Johnson & Johnson',
//            'lot' => 'D012',
//            'expiry_date' => '2026-09-10',
//        ]);
//
//        VaxxedPersonFactory::new()->create([
//            'id' => 3,
//            'name' => 'Moderna',
//            'lot' => 'C789',
//            'expiry_date' => '2027-03-21',
//        ]);
//
//        VaxxedPersonFactory::new()->create([
//            'id' => 1,
//            'name' => 'CoronaVac',
//            'lot' => 'A123',
//            'expiry_date' => '2025-01-01',
//        ]);
//
//        $expected = [
//            [
//                'id' => 2,
//                'name' => 'Johnson & Johnson',
//                'lot' => 'D012',
//                'expiry_date' => '2026-09-10 00:00:00',
//            ],
//            [
//                'id' => 3,
//                'name' => 'Moderna',
//                'lot' => 'C789',
//                'expiry_date' => '2027-03-21 00:00:00',
//            ],
//            [
//                'id' => 1,
//                'name' => 'CoronaVac',
//                'lot' => 'A123',
//                'expiry_date' => '2025-01-01 00:00:00',
//            ],
//        ];
//
//        $vaxxedPersonService = new VaxxedPersonService([], $this->vaxxedPersonRepository);
//
//        $paginationDtoMock = new PaginationDto();
//
//        $this->assertInstanceOf(LengthAwarePaginator::class, $vaxxedPersonService->getVaxxedPersons($paginationDtoMock));
//        $result = $vaxxedPersonService->getVaxxedPersons($paginationDtoMock)->toArray()['data'];
//
//        $result = array_map(function ($item) {
//            unset($item['created_at']);
//            unset($item['updated_at']);
//            return $item;
//        }, $result);
//
//        $this->assertEquals($expected, $result);
//    }
//
//    /**
//     * @throws Throwable
//     */
//    public function testGetVaxxedPersonsWithFiltersShouldReturnFilteredVaxxedPersons(): void
//    {
//        VaxxedPersonFactory::new()->create([
//            'id' => 2,
//            'name' => 'Johnson & Johnson',
//            'lot' => 'D012',
//            'expiry_date' => '2026-09-10',
//        ]);
//
//        VaxxedPersonFactory::new()->create([
//            'id' => 3,
//            'name' => 'Moderna',
//            'lot' => 'C789',
//            'expiry_date' => '2027-03-21',
//        ]);
//
//        VaxxedPersonFactory::new()->create([
//            'id' => 1,
//            'name' => 'CoronaVac',
//            'lot' => 'A123',
//            'expiry_date' => '2025-01-01',
//        ]);
//
//        $requestData = [
//            "filters" => [
//                "name" => 'CoronaVac',
//            ]
//        ];
//
//        $expected = [
//            [
//                'id' => 1,
//                'name' => 'CoronaVac',
//                'lot' => 'A123',
//                'expiry_date' => '2025-01-01 00:00:00',
//            ],
//        ];
//
//        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository);
//
//        $paginationDtoMock = new PaginationDto();
//
//        $this->assertInstanceOf(LengthAwarePaginator::class, $vaxxedPersonService->getVaxxedPersons($paginationDtoMock));
//        $result = $vaxxedPersonService->getVaxxedPersons($paginationDtoMock)->toArray()['data'];
//
//        $result = array_map(function ($item) {
//            unset($item['created_at']);
//            unset($item['updated_at']);
//            return $item;
//        }, $result);
//
//        $this->assertEquals($expected, $result);
//    }
}