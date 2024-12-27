<?php

namespace App\Domain\Repositories;

use App\Application\Dtos\PaginationDto;
use App\Domain\Entities\Models\Vaccine;
use Illuminate\Pagination\LengthAwarePaginator;

class VaccineRepository implements BaseRepositoryInterface
{
    public function getById(int $id): ?Vaccine
    {
        return Vaccine::where('id', $id)->first();
    }

    public function deleteById(int $id): void
    {
        Vaccine::where('id', $id)->delete();
    }

    public function firstOrCreate(array $data): Vaccine
    {
        return Vaccine::firstOrCreate($data);
    }

    public function updateById(int $id, array $data): void
    {
        if (empty($data)) {
            return;
        }

        $vaccine = Vaccine::findOrFail($id);
        $vaccine->fill($data);
        $vaccine->save();
    }

    public function findOrFail(int $id): Vaccine
    {
        return Vaccine::findOrFail($id);
    }

    public function deleteVaccinesById(array $ids): void
    {
        Vaccine::whereIn('id', $ids)->delete();
    }

    public function list(PaginationDto $paginationDto): LengthAwarePaginator
    {
        $query = Vaccine::query();

        if (!empty($paginationDto->filters)) {
            foreach ($paginationDto->filters as $key => $value) {
                $query->where($key, 'like', "%$value%");
            }
        }

        if ($paginationDto->orderBy) {
            $query->orderBy($paginationDto->orderBy, $paginationDto->orderDirection);
        }

        return $query->paginate($paginationDto->perPage);
    }
}