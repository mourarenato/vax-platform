<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class DeleteVaxxedPersonException extends Exception
{
    public function __construct()
    {
        parent::__construct('Could not delete vaxxed person', Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}