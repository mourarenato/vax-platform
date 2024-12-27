<?php

namespace App\Interfaces\Controllers;

use App\Application\Dtos\PaginationDto;
use App\Domain\Services\VaccineService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VaccineController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception|Throwable
     * @throws ValidationException
     */
    public function create(Request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'min:1', 'max:200'],
            'lot' => ['required', 'string', 'min:1', 'max:200'],
            'expiry_date' => ['required', 'date'],
        ]);

        $service = app(VaccineService::class);

        $service->createVaccine();

        return response()->json([
            'success' => true,
            'message' => 'Vaccine created successfully',
        ], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception|Throwable
     */
    public function get(Request $request): JsonResponse
    {
        $this->validate($request, [
            'perPage' => ['sometimes', 'nullable', 'integer'],
            'orderBy' => ['sometimes', 'nullable', 'string', 'in:name,lot,expiry_date'],
            'orderDirection' => ['sometimes', 'nullable', 'string', 'in:asc,desc'],
            'filters' => ['sometimes', 'array'],
            'filters.name' => ['nullable', 'string'],
            'filters.lot' => ['nullable', 'string'],
            'filters.expiry_date' => ['nullable', 'date'],
        ]);

        $service = app(VaccineService::class);

        $paginationDto = new PaginationDto();
        $vaccines = $service->getVaccines($paginationDto);

        return response()->json([
            'data' => $vaccines->toArray(),
        ], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function delete(Request $request): JsonResponse
    {
        $this->validate($request, [
            'ids' => ['required', 'array'],
            'ids.*' => ['numeric'],
        ]);

        $service = app(VaccineService::class);

        $service->deleteVaccines();

        return response()->json([
            'success' => true,
            'message' => 'Vaccines deleted with success'
        ], Response::HTTP_OK);
    }
}