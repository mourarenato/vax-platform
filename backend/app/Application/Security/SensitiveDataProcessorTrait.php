<?php

namespace App\Application\Security;

use Carbon\Carbon;

trait SensitiveDataProcessorTrait
{
    protected function processAttributes(callable $callback): void
    {
        if (!empty($this->sensitiveAttributes)) {
            foreach ($this->sensitiveAttributes as $attribute) {
                if (isset($this->attributes[$attribute])) {
                    $this->attributes[$attribute] = $callback($this->attributes[$attribute]);
                }
            }
        }
    }

    protected function encryptAttributes(): void
    {
        $this->processAttributes(fn($value) => encrypt($value));
    }

    protected function decryptAttributes(): void
    {
        $this->processAttributes(fn($value) => decrypt($value));
    }

    protected function formatData(): void
    {
        if (!empty($this->dateAttributes)) {
            foreach ($this->dateAttributes as $attribute) {
                if (!empty($this->attributes[$attribute])) {
                    $this->attributes[$attribute] = Carbon::parse($this->attributes[$attribute])->format('Y-m-d');
                }
            }
        }
    }

    protected function bcryptPassword(): void
    {
        if (!empty($this->attributes['password'])) {
            $this->attributes['password'] = bcrypt($this->attributes['password']);
        }
    }
}
