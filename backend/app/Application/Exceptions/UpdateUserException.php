<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateUserException extends Exception
{
    public function __construct()
    {
        parent::__construct('Could not update user', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}