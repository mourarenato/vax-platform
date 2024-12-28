<?php

namespace App\Interfaces\Controllers;

use App\Application\Dtos\PaginationDto;
use App\Domain\Services\VaxxedPersonService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VaxxedPersonController extends Controller
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
            'cpf' => ['required', 'cpf'],
            'vaccine_id' => ['nullable', 'integer'],
            'full_name' => ['required', 'string', 'min:2', 'max:200'],
            'birthdate' => ['required', 'date'],
            'first_dose' => ['nullable', 'date'],
            'second_dose' => ['nullable', 'date'],
            'third_dose' => ['nullable', 'date'],
            'vaccine_applied' => ['nullable', 'string', 'max:255'],
            'has_comorbidity' => ['nullable', 'integer'],
        ]);

        $service = app(VaxxedPersonService::class);

        $service->createVaxxedPerson();

        return response()->json([
            'success' => true,
            'message' => 'Vaxxed person register successfully',
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
            'perPage' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'orderBy' => ['sometimes', 'nullable', 'string', 'in:vaccine_id,cpf,full_name'],
            'orderDirection' => ['sometimes', 'nullable', 'string', 'in:asc,desc'],
            'filters' => ['sometimes', 'array'],
            'filters.vaccine_id' => ['nullable', 'integer'],
            'filters.cpf' => ['nullable', 'cpf'],
            'filters.full_name' => ['nullable', 'string'],
        ]);

        $service = app(VaxxedPersonService::class);

        $paginationDto = new PaginationDto();
        $vaxxedPeople = $service->getVaxxedPeople($paginationDto);

        return response()->json([
            'data' => $vaxxedPeople->toArray(),
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
            'ids.*' => ['regex:/^\d+$/'],
        ]);

        $ids = $request->input('ids');

        $service = app(VaxxedPersonService::class);

        try {
            $service->deleteVaxxedPeople($ids);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete vaxxed people: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Vaxxed people deleted successfully',
        ], Response::HTTP_OK);
    }
}