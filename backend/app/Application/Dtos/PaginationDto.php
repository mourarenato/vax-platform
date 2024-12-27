<?php

namespace App\Application\Dtos;

class PaginationDto extends BaseDto
{
    public int $perPage = 5;
    public ?string $orderBy = null;
    public string $orderDirection = 'asc';
    public array $filters = [];
}
