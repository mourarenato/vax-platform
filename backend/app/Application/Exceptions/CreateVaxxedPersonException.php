<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class CreateVaxxedPersonException extends Exception
{
    public function __construct()
    {
        parent::__construct('Could not create vaxxed person', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}