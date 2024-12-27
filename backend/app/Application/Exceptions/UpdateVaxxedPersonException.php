<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateVaxxedPersonException extends Exception
{
    public function __construct()
    {
        parent::__construct('Could not update vaxxed person', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}