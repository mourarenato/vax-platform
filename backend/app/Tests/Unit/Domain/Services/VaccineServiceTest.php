<?php

namespace App\Tests\Unit\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\CreateVaccineException;
use App\Application\Exceptions\DeleteVaccineException;
use App\Domain\Repositories\VaccineRepository;
use App\Domain\Services\VaccineService;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Tests\TestCase;

class VaccineServiceTest extends TestCase
{
    private VaccineRepository $vaccineRepository;
    
    public function __construct()
    {
        parent::__construct(...func_get_args());
        $this->vaccineRepository = $this->createMock(VaccineRepository::class);
    }

    public function testCreateVaccineShouldCreateOneVaccine(): void
    {
        $requestData = [
            'name' => 'CoronaVac',
            'lot' => 'ADCE9',
            'expiry_date' => '2025-12-01'
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $this->vaccineRepository
            ->expects($this->once())
            ->method('firstOrCreate');

        $this->assertNull($vaccineService->createVaccine());
    }

    public function testCreateVaccineWhenExceptionIsThrown(): void
    {
        $this->expectException(CreateVaccineException::class);
        $this->expectExceptionMessage('Could not create vaccine');

        $requestData = [
            'name' => 'Influenza',
            'lot' => 'FDCE6',
            'expiry_date' => '2026-11-03'
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $this->vaccineRepository
            ->expects($this->once())
            ->method('firstOrCreate')
            ->willThrowException(new Exception('Erro'));

        $this->assertNull($vaccineService->createVaccine());
    }

    public function testDeleteVaccines(): void
    {
        $requestData = [
            'ids' => ['1', '2'],
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $this->vaccineRepository
            ->expects($this->once())
            ->method('deleteVaccinesById');

        $this->assertNull($vaccineService->deleteVaccines());
    }

    public function testDeleteVaccineWhenExceptionIsThrown(): void
    {
        $this->expectException(DeleteVaccineException::class);
        $this->expectExceptionMessage('Could not delete vaccine');

        $requestData = [
            'id' => 1,
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $this->vaccineRepository
            ->expects($this->never())
            ->method('deleteVaccinesById')
            ->willThrowException(new Exception('Error'));

        $this->assertNull($vaccineService->deleteVaccines());
    }

    /**
     * @throws \Throwable
     */
    public function testGetVaccinesShouldReturnVaccines(): void
    {
        $vaccineService = new VaccineService([], $this->vaccineRepository);

        $paginatorMock = $this->createMock(LengthAwarePaginator::class);

        $this->vaccineRepository
            ->expects($this->once())
            ->method('list')
            ->willReturn($paginatorMock);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaccineService->getVaccines($paginationDtoMock));
    }

    public function testGetVaccinesWithFiltersShouldReturnFilteredVaccines(): void
    {
        $requestData = [
            'filter' => [
                'name' => 'Influenza',
            ]
        ];

        $vaccineService = new VaccineService($requestData, $this->vaccineRepository);

        $paginatorMock = $this->createMock(LengthAwarePaginator::class);

        $this->vaccineRepository
            ->expects($this->once())
            ->method('list')
            ->willReturn($paginatorMock);

        $paginationDtoMock = new PaginationDto();

        $this->assertInstanceOf(LengthAwarePaginator::class, $vaccineService->getVaccines($paginationDtoMock));
    }
}