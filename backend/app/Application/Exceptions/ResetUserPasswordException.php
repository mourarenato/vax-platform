<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class ResetUserPasswordException extends Exception
{
    public function __construct()
    {
        parent::__construct('Unable to request password reset', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
