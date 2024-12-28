<?php

namespace App\Tests;

use Illuminate\Contracts\Console\Kernel;
use Dotenv\Dotenv;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        if (file_exists(__DIR__ . '/../../.env.testing')) {
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../../', '.env.testing');
            $dotenv->load();
        }

        $app = require __DIR__ . '/../../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }
}
