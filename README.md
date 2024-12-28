<p align="center">
  <a href="" target="_blank">
    <img src="https://raw.githubusercontent.com/mourarenato/vax-platform/refs/heads/master/frontend/public/images/homepage-vax.png" width="600">
  </a>
</p>
<p align="center">
<a href="https://travis-ci.org/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"></a>
<a href="https://packagist.org/packages/laravel/framework"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax.
Laravel is accessible, powerful, and provides tools required for large, robust applications.

## About Next.js

Next.js is a React framework for building fast, scalable web applications with features like server-side rendering 
and static site generation. It simplifies development and optimizes performance.

## Project Information

This project is a vaccine management system for tracking vaccines and vaccinated individuals. 
It is built with Next.js for the front-end, based on the [Materio Free Template](https://github.com/themeselection/materio-mui-nextjs-admin-template-free), 
and Laravel for the back-end. The system uses Docker for containerization and JWT for secure authentication.

> The system follows **Clean Code** principles, **SOLID** principles, and architectural techniques such as **Controller-Service-Repository** and **DDD** on the backend. **Unit testing** is also implemented to ensure reliability. On the front-end, **lazy loading** techniques optimize performance, while the back-end utilizes **queue processing** for background tasks.

Laravel directory structure based on Domain-Driven Design (DDD)
-------------------
    ...
    backend/

      app/

         Application/
            Commands/         contains application commands
            Dtos/             contains dto classes
            Exceptions/       contains application exceptions
            Services/         contains application services

         Console/
             Commands/        contains specific commands

         Domain/
             Agregates/       contains agregate entities
             Entities/        contains domain entities
                Models/         contains laravel model classes
             Events/          contains domain events
             Repositories/    contains domain repositories
             Services/        contains domain services
             ValueObjects/    contains value objects

         Infrastructure/
             Jobs/            contains laravel jobs
             Mail/            contains mail classes
             Providers/       contains laravel providers
             Strategies/      contains strategy classes

         Interfaces/
             Controllers/     contains controller classes
             Middleware/      contains laravel middlewares
             Requests/        contains requests

         Shared/
             Enums/           contains enums
             Exceptions/      contains generic exceptions
             Helpers/         contains helpers

         Tests/
             Unit/            contains unit tests
             Integration/     contains integration tests

         routes/              contains laravel routes (web and api)
         database/            contains laravel database files (factories, seeders and migrations) 

                                    ...

Next.js directory structure (App Router)
-------------------
    ...
    frontend/

      src/
        
         @core/              ... MUI componentes
         @layouts/
         @menu/

         app/                 route pages
            ...
            api/              backend apis
            ...

         components/          general React Components
         context/             React Contexts
         hooks/               React Hooks
         services/            api services
         views/               all views used mainly in /app

                                    ...

Installation
------------

### Getting started with Docker

#### General settings:

1. Copy `docker-compose.example.yml` to `docker-compose.yml`
2. In the `/frontend` and `/backend` directories copy `.env.example` to `.env`
3. Configure the environment `JWT_SECRET` in the backend and front end
4. Run `docker compose up -d`
5. Make sure all containers are running
6. Make sure you have all databases created (production and test) in Postgres (see the `.env` in backend project)
7. Don't forget about to configure your Mailtrap credentials in .env:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

#### Backend:

1. Copy `.env.example.testing` to `.env`
2. Run `php artisan key:generate --env=testing`
3. Run `docker exec -it vax-api bash` to access the docker container
4. Inside the container run `composer install`
5. Run `php artisan key:generate && php artisan jwt:secret` to create keys
6. Run `php artisan migrate` to apply migrations
7. Run `php artisan migrate --database=testing` to apply migrations in database tests
8. Run `php artisan db:seed` to feed the database
9. Run `php artisan queue:work` to start the queue processing

#### Frontend:

1. Run `docker exec -it next-app bash` to access the docker container
2. Inside the container run `yarn install`
3. Run `yarn build:icons` to build the icons (first time only)
4. Run `yarn dev` to start the server

Then, you can access the application through the following URL:

    http://10.10.0.22:3000/

-----

Testing
-------

Tests can be executed by running

```
php artisan test

