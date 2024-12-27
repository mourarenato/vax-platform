<?php

namespace App\Infrastructure\Providers;

use App\Application\Services\EmailService;
use App\Application\Services\UserService;
use App\Domain\Repositories\UserRepository;
use App\Domain\Repositories\VaccineRepository;
use App\Domain\Repositories\VaxxedPersonRepository;
use App\Domain\Services\VaccineService;
use App\Domain\Services\VaxxedPersonService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->bind(UserService::class, function ($app) {
            return new UserService(
                request()->all(),
                $app->make(UserRepository::class),
            );
        });

        $this->app->bind(VaccineService::class, function ($app) {
            return new VaccineService(
                request()->all(),
                $app->make(VaccineRepository::class),
            );
        });

        $this->app->bind(VaxxedPersonService::class, function ($app) {
            return new VaxxedPersonService(
                request()->all(),
                $app->make(VaxxedPersonRepository::class),
                $app->make(EmailService::class),
            );
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
