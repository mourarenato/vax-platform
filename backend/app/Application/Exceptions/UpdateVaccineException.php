<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateVaccineException extends Exception
{
    public function __construct()
    {
        parent::__construct('Could not update vaccine', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}