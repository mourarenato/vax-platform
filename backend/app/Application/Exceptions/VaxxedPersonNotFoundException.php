<?php

namespace App\Application\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class VaxxedPersonNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct('Vaxxed person not found', Response::HTTP_NOT_FOUND);
    }
}
