<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class VaccineNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct('Vaccine not found', Response::HTTP_NOT_FOUND);
    }
}