<?php

namespace App\Tests\Unit\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Application\Exceptions\DeleteVaxxedPersonException;
use App\Application\Services\EmailService;
use App\Domain\Entities\Models\VaxxedPerson;
use App\Domain\Repositories\VaxxedPersonRepository;
use App\Domain\Services\VaxxedPersonService;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Tests\TestCase;
use Mockery;

class VaxxedPersonServiceTest extends TestCase
{
    private VaxxedPersonRepository $vaxxedPersonRepository;
    private EmailService $emailService;

    public function __construct()
    {
        parent::__construct(...func_get_args());
        $this->vaxxedPersonRepository = $this->createMock(VaxxedPersonRepository::class);
        $this->emailService = $this->createMock(EmailService::class);
    }

    public function testCreateVaxxedPersonShouldCreateOneVaxxedPerson(): void
    {
        $requestData = [
            'cpf' => '456.789.123-22',
            'name' => 'Robert Johnson',
            'birthdate' => '1975-07-23',
            'first_dose' => '2022-01-20',
            'second_dose' => '2022-09-20',
            'third_dose' => '2023-09-20',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $loanMock = Mockery::mock(VaxxedPerson::class)
            ->shouldReceive('getAttribute')
            ->with('id')->andReturn(1)
            ->with('name')->andReturn('Robert Johnson')
            ->with('birthdate')->andReturn('1975-07-23')
            ->with('first_dose')->andReturn("2024-12-01")
            ->with('second_dose')->andReturn("2025-01-01")
            ->with('third_dose')->andReturn("2025-07-01")
            ->with('vaccine_applied')->andReturn('AstraZeneca')
            ->with('has_comorbidity')->andReturn(0)
            ->shouldReceive('toArray')
            ->andReturn([
                'id' => 1,
                'name' => 'Robert Johnson',
                'birthdate' => '1975-07-23',
                'first_dose' => '2024-12-01',
                'second_dose' => '2025-01-01',
                'third_dose' => '2025-07-01',
                'vaccine_applied' => 'AstraZeneca',
                'has_comorbidity' => 0,
            ])
            ->getMock();

        $this->vaxxedPersonRepository
            ->expects($this->once())
            ->method('firstOrCreate')
            ->willReturn($loanMock);

        $this->emailService
            ->expects($this->once())
            ->method('sendEmail');

        $this->assertNull($vaxxedPersonService->createVaxxedPerson());
    }

    public function testCreateVaxxedPersonWhenExceptionIsThrown(): void
    {
        $this->expectException(CreateVaxxedPersonException::class);
        $this->expectExceptionMessage('Could not create vaxxed person');

        $requestData = [
            'id' => 1,
            'name' => 'Robert Johnson',
            'birthdate' => '1975-07-23',
            'first_dose' => '2024-12-01',
            'second_dose' => '2025-01-01',
            'third_dose' => '2025-07-01',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->vaxxedPersonRepository
            ->expects($this->once())
            ->method('firstOrCreate')
            ->willThrowException(new Exception('Erro'));

        $this->assertNull($vaxxedPersonService->createVaxxedPerson());
    }

    public function testDeleteVaxxedPeople(): void
    {
        $requestData = [
            'ids' => ['1', '2'],
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->vaxxedPersonRepository
            ->expects($this->once())
            ->method('deleteVaxxedPeopleById');

        $this->assertNull($vaxxedPersonService->deleteVaxxedPeople());
    }

    public function testDeleteVaxxedPeopleWhenExceptionIsThrown(): void
    {
        $this->expectException(DeleteVaxxedPersonException::class);
        $this->expectExceptionMessage('Could not delete vaxxed person');

        $requestData = [
            'id' => 1,
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $this->vaxxedPersonRepository
            ->expects($this->never())
            ->method('deleteVaxxedPeopleById')
            ->willThrowException(new Exception('Error'));

        $this->assertNull($vaxxedPersonService->deleteVaxxedPeople());
    }

    /**
     * @throws \Throwable
     */
    public function testGetVaxxedPeopleShouldReturnVaxxedPeople(): void
    {
        $vaxxedPersonService = new VaxxedPersonService([], $this->vaxxedPersonRepository, $this->emailService);

        $paginatorMock = $this->createMock(LengthAwarePaginator::class);

        $this->vaxxedPersonRepository
            ->expects($this->once())
            ->method('list')
            ->willReturn($paginatorMock);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaxxedPersonService->getVaxxedPeople($paginationDtoMock));
    }

    /**
     * @throws \Throwable
     */
    public function testGetVaxxedPeopleWithFiltersShouldReturnFilteredVaxxedPeople(): void
    {
        $requestData = [
            'filter' => [
                'name' => 'Influenza',
            ]
        ];

        $vaxxedPersonService = new VaxxedPersonService($requestData, $this->vaxxedPersonRepository, $this->emailService);

        $paginatorMock = $this->createMock(LengthAwarePaginator::class);

        $this->vaxxedPersonRepository
            ->expects($this->once())
            ->method('list')
            ->willReturn($paginatorMock);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaxxedPersonService->getVaxxedPeople($paginationDtoMock));
    }
}