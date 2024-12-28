<?php

namespace App\Domain\Repositories;

use App\Application\Dtos\PaginationDto;
use App\Domain\Entities\Models\VaxxedPerson;
use Illuminate\Pagination\LengthAwarePaginator;

class VaxxedPersonRepository implements BaseRepositoryInterface
{
    public function getById(int $id): ?VaxxedPerson
    {
        return VaxxedPerson::where('id', $id)->first();
    }

    public function getByCpf(string $cpf): ?VaxxedPerson
    {
        return VaxxedPerson::where('hash_cpf', hash('sha256', $cpf))->first();
    }

    public function deleteById(int $id): void
    {
        VaxxedPerson::where('id', $id)->delete();
    }

    public function firstOrCreate(array $data): VaxxedPerson
    {
        return VaxxedPerson::firstOrCreate($data);
    }

    public function updateById(int $id, array $data): void
    {
        if (empty($data)) {
            return;
        }

        $vaxxedPerson = VaxxedPerson::findOrFail($id);
        $vaxxedPerson->fill($data);
        $vaxxedPerson->save();
    }

    public function findOrFail(int $id): VaxxedPerson
    {
        return VaxxedPerson::findOrFail($id);
    }

    public function deleteVaxxedPeopleById(array $ids): void
    {
        VaxxedPerson::whereIn('id', $ids)->delete();
    }

    public function list(PaginationDto $paginationDto): LengthAwarePaginator
    {
        $query = VaxxedPerson::query();

        if (!empty($paginationDto->filters)) {
            foreach ($paginationDto->filters as $key => $value) {
                $query->where($key, 'ilike', "%$value%");
            }
        }

        if ($paginationDto->orderBy) {
            $query->orderBy($paginationDto->orderBy, $paginationDto->orderDirection);
        }

        return $query->paginate($paginationDto->perPage);
    }

    public function getUserId(): int
    {
        return auth()->id();
    }
}