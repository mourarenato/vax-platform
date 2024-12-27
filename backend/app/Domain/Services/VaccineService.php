<?php

namespace App\Domain\Services;

use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\CreateVaccineException;
use App\Application\Exceptions\DeleteVaccineException;
use App\Application\Exceptions\UpdateVaccineException;
use App\Application\Exceptions\VaccineNotFoundException;
use App\Domain\Repositories\VaccineRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Throwable;

class VaccineService
{
    public function __construct(
        protected array                 $requestData,
        private readonly VaccineRepository $vaccineRepository,
    )
    {
    }

    /**
     * @throws CreateVaccineException
     */
    public function createVaccine(): void
    {
        try {
            $this->vaccineRepository->firstOrCreate($this->requestData);
        } catch (Throwable $e) {
            throw new CreateVaccineException();
        }
    }

    /**
     * @throws VaccineNotFoundException
     * @throws DeleteVaccineException
     */
    public function deleteVaccines(): void
    {
        try {
            $this->vaccineRepository->deleteVaccinesById($this->requestData['ids']);
        } catch (ModelNotFoundException) {
            throw new VaccineNotFoundException();
        } catch (Throwable $e) {
            throw new DeleteVaccineException();
        }
    }

    /**
     * @throws Throwable
     */
    public function updateVaccine(): void
    {
        try {
            $vaccine = $this->vaccineRepository->findOrFail($this->requestData['id']);
            $this->vaccineRepository->updateById($vaccine->id, $this->requestData);
        } catch (ModelNotFoundException) {
            throw new VaccineNotFoundException();
        } catch (Throwable $e) {
            throw new UpdateVaccineException();
        }
    }

    /**
     * @throws Throwable
     */
    public function getVaccines(PaginationDto $paginationDto): LengthAwarePaginator
    {
        $perPage = $this->requestData['perPage'] ?? 5;
        $orderBy = $this->requestData['orderBy'] ?? null;
        $orderDirection = $this->requestData['orderDirection'] ?? 'asc';
        $filters = $this->requestData['filters'] ?? [];

        $paginationDto->attachValues([
            'perPage' => $perPage,
            'orderBy' => $orderBy,
            'orderDirection' => $orderDirection,
            'filters' => $filters
        ]);

        return $this->vaccineRepository->list($paginationDto);
    }
}