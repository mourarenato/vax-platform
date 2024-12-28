<?php

namespace App\Tests\Integration\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\VaxxedPersonAlreadyExistsException;
use App\Application\Exceptions\VaxxedPersonNotFoundException;
use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Application\Exceptions\DeleteVaxxedPersonException;
use App\Application\Services\EmailService;
use App\Domain\Entities\Models\VaxxedPerson;
use App\Domain\Repositories\VaxxedPersonRepository;
use App\Domain\Services\VaxxedPersonService;
use Database\Factories\VaccineFactory;
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
     * @throws CreateVaxxedPersonException|VaxxedPersonAlreadyExistsException
     */
    public function testCreateVaxxedPersonShouldCreateOneVaxxedPerson(): void
    {
        $vaccineFactory = VaccineFactory::new()->create([
            'id' => '1',
            'name' => 'Pfizer',
            'lot' => 'B456',
            'expiry_date' => '2026-05-15',
        ]);

        $requestData = [
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => $vaccineFactory->vaccine_id,
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->emailService
            ->expects($this->once())
            ->method('sendEmail');

        $vaxxedPersonService->createVaxxedPerson();

        $vaxxedPerson = $this->vaxxedPersonRepository->getByCpf('460.793.440-25');

        $this->assertEquals('460.793.440-25', $vaxxedPerson->cpf);
        $this->assertEquals('John Doe', $vaxxedPerson->full_name);
    }

    public function testCreateVaxxedPersonWhenVaccineIdIsNull(): void
    {
        $requestData = [
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->emailService
            ->expects($this->once())
            ->method('sendEmail');

        $vaxxedPersonService->createVaxxedPerson();

        $vaxxedPerson = $this->vaxxedPersonRepository->getByCpf('460.793.440-25');

        $this->assertEquals('460.793.440-25', $vaxxedPerson->cpf);
        $this->assertEquals('John Doe', $vaxxedPerson->full_name);
    }

    public function testCreateVaxxedPersonThrowExceptionWhenVaxxedPersonAlreadyExists(): void
    {
        $this->expectException(VaxxedPersonAlreadyExistsException::class);
        $this->expectExceptionMessage('Person with this cpf has already been registered!');

        $requestData = [
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ];

        VaxxedPersonFactory::new()->create($requestData);

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->emailService
            ->expects($this->never())
            ->method('sendEmail');

        $vaxxedPersonService->createVaxxedPerson();

        $this->assertNull($vaxxedPersonService->createVaxxedPerson());
    }

    /**
     * @throws VaxxedPersonNotFoundException
     * @throws DeleteVaxxedPersonException
     */
    public function testDeleteVaxxedPeople(): void
    {
        $requestData = [
            'ids' => [1, 2],
        ];

        $vaxxedPersonFactory2 = VaxxedPersonFactory::new()->create([
            'id' => 2,
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonFactory1 = VaxxedPersonFactory::new()->create([
            'id' => 1,
            'cpf' => '123.456.789-00',
            'full_name' => 'Jane Smith',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonFactory3 = VaxxedPersonFactory::new()->create([
            'id' => 3,
            'cpf' => '213.654.321-00',
            'full_name' => 'Hanna Smith',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $vaxxedPersonService->deleteVaxxedPeople();

        $vaxxedPersonOne = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory1->id);
        $vaxxedPersonTwo = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory2->id);
        $vaxxedPersonThree = $this->vaxxedPersonRepository->getById($vaxxedPersonFactory3->id);

        $this->assertNull($vaxxedPersonOne);
        $this->assertNull($vaxxedPersonTwo);
        $this->assertInstanceOf(VaxxedPerson::class, $vaxxedPersonThree);
    }

    /**
     * @throws Throwable
     */
    public function testGetVaxxedPeopleShouldReturnVaxxedPeople(): void
    {
        VaxxedPersonFactory::new()->create([
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        VaxxedPersonFactory::new()->create([
            'cpf' => '123.456.789-00',
            'full_name' => 'Jane Smith',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $expected = [
            [
                'cpf' => '460.793.440-25',
                'full_name' => 'John Doe',
                'birthdate' => '1990-01-01',
                'first_dose' => '2022-01-15',
                'second_dose' => '2022-02-15',
                'third_dose' => '2022-09-15',
                'vaccine_applied' => 'AstraZeneca',
                'has_comorbidity' => 0,
                'vaccine_id' => null,
            ],
            [
                'cpf' => '123.456.789-00',
                'full_name' => 'Jane Smith',
                'birthdate' => '1990-01-01',
                'first_dose' => '2022-01-15',
                'second_dose' => '2022-02-15',
                'third_dose' => '2022-09-15',
                'vaccine_applied' => 'CoronaVac',
                'has_comorbidity' => 0,
                'vaccine_id' => null,
            ],
        ];

        $vaxxedPersonService = new VaxxedPersonService([], $this->vaxxedPersonRepository, $this->emailService);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaxxedPersonService->getVaxxedPeople($paginationDtoMock));
        $result = $vaxxedPersonService->getVaxxedPeople($paginationDtoMock)->toArray()['data'];

        $result = array_map(function ($item) {
            unset($item['id']);
            unset($item['created_at']);
            unset($item['updated_at']);
            unset($item['hash_cpf']);
            return $item;
        }, $result);

        $this->assertEquals($expected, $result);
    }
}