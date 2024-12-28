<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class VaxxedPersonAlreadyExistsException extends Exception
{
    public function __construct()
    {
        parent::__construct('Person with this cpf has already been registered!', Response::HTTP_CONFLICT);
    }
}
