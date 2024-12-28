<?php

namespace App\Domain\Services;

use App\Application\Dtos\EmailDto;
use App\Application\Dtos\PaginationDto;
use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Application\Exceptions\DeleteVaxxedPersonException;
use App\Application\Exceptions\UpdatevaxxedPersonException;
use App\Application\Exceptions\VaxxedPersonAlreadyExistsException;
use App\Application\Exceptions\vaxxedPersonNotFoundException;
use App\Application\Services\EmailService;
use App\Domain\Repositories\VaxxedPersonRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Throwable;

class VaxxedPersonService
{
    public function __construct(
        protected array                 $requestData,
        private readonly VaxxedPersonRepository $vaxxedPersonRepository,
        private readonly EmailService   $emailService,
    )
    {
    }

    /**
     * @throws CreateVaxxedPersonException
     * @throws VaxxedPersonAlreadyExistsException
     */
    public function createVaxxedPerson(): void
    {
        try {
            if ($this->vaxxedPersonRepository->getByCpf($this->requestData['cpf'])) {
                throw new VaxxedPersonAlreadyExistsException();
            }
            $vaxxedPerson = $this->vaxxedPersonRepository->firstOrCreate($this->requestData);
            $emailDto = new EmailDto();
            $emailDto->attachValues([
                'receiver' => 'mytestmail@example.com',
                'subject' => 'New vaccinated person registered',
                'body' => $vaxxedPerson->toArray(),
            ]);
            $this->emailService->sendEmail($emailDto);
        }  catch (VaxxedPersonAlreadyExistsException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new CreateVaxxedPersonException();
        }
    }

    /**
     * @throws DeletevaxxedPersonException
     * @throws vaxxedPersonNotFoundException
     */
    public function deleteVaxxedPeople(): void
    {
        try {
            $this->vaxxedPersonRepository->deleteVaxxedPeopleById($this->requestData['ids']);
        } catch (ModelNotFoundException) {
            throw new VaxxedPersonNotFoundException();
        } catch (Throwable $e) {
            throw new DeleteVaxxedPersonException();
        }
    }

    /**
     * @throws Throwable
     */
    public function updateVaxxedPerson(): void
    {
        try {
            $vaxxedPerson = $this->vaxxedPersonRepository->findOrFail($this->requestData['id']);
            $this->vaxxedPersonRepository->updateById($vaxxedPerson->id, $this->requestData);
        } catch (ModelNotFoundException) {
            throw new VaxxedPersonNotFoundException();
        } catch (Throwable $e) {
            throw new UpdateVaxxedPersonException();
        }
    }

    /**
     * @throws Throwable
     */
    public function getVaxxedPeople(PaginationDto $paginationDto): LengthAwarePaginator
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

        return $this->vaxxedPersonRepository->list($paginationDto);
    }
}