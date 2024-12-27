<?php

namespace App\Interfaces\Middleware;

use App\Application\Exceptions\VaccineNotFoundException;
use App\Application\Exceptions\VaxxedPersonNotFoundException;
use App\Application\Exceptions\CreateVaccineException;
use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Application\Exceptions\DeleteVaccineException;
use App\Application\Exceptions\DeleteVaxxedPersonException;
use App\Application\Exceptions\UpdateVaccineException;
use App\Application\Exceptions\UpdateVaxxedPersonException;
use Closure;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class HandleVaxExceptions
{

    public function handle(Request $request, Closure $next): JsonResponse
    {
        try {
            $response = $next($request);

            if (!empty($response->exception)) {
                throw $response->exception;
            }

            return $response;
        } catch (Exception $e) {
            if ($e instanceof VaccineNotFoundException) {
                Log::error(
                    'Vaccine not found',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to find vaccine',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof CreateVaccineException) {
                Log::error(
                    'Error trying to create vaccine',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to create vaccine',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof UpdateVaccineException) {
                Log::error(
                    'Error trying to update vaccine',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to update vaccine',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof DeleteVaccineException) {
                Log::error(
                    'Error trying to delete vaccine',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to delete vaccine',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof VaxxedPersonNotFoundException) {
                Log::error(
                    'Vaxxed person not found',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to find vaxxed person',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof CreateVaxxedPersonException) {
                Log::error(
                    'Error trying to create vaxxed person',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to create vaxxed person',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof UpdateVaxxedPersonException) {
                Log::error(
                    'Error trying to update vaxxed person',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to update vaxxed person',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            if ($e instanceof DeleteVaxxedPersonException) {
                Log::error(
                    'Error trying to delete vaxxed person',
                    ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
                );
                return response()->json([
                    'success' => false,
                    'message' => 'Error trying to delete vaxxed person',
                    'errors' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            Log::error(
                'Error trying to process your request',
                ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
            );
            return response()->json([
                'success' => false,
                'message' => 'Error trying to process your request.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (Throwable $e) {
            Log::error(
                'Error trying to process your request',
                ['user_id' => $this->getCurrentUserId(), 'error' => $e->getMessage()]
            );
            return response()->json([
                'success' => false,
                'message' => 'Error trying to process your request.',
                'errors' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getCurrentUserId(): int
    {
        return auth()->id();
    }
}
