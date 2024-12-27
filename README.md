This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install (inside docker container)
yarn build:icons (inside docker container)
sudo chmod 777 -R frontend/node_modules
yarn dev (inside docker to start server)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax.
Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Project Information

This project is a Laravel application that simulates a library management system.

Directory Structure Based on Domain-Driven Design (DDD)
-------------------

      config/             contains application configurations

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

Installation
------------

### Getting started with docker

1. Copy `docker-compose.example.yml` to `docker-compose.yml` and `.env.example` to `.env`
2. Configure the environment `JWT_SECRET` in the backend and front end
2. Run `docker compose up -d`
3. Make sure all containers are running
4. Run `docker exec -it library-api bash` to access docker container
5. Inside container run `composer install`
6. Make sure you have all databases created (production and test) in Postgres
7. Inside container run `php artisan key:generate && php artisan jwt:secret` to create keys
8. Inside container run `php artisan migrate` to apply migrations
9. Inside container run `php artisan migrate --database=testing` to apply migrations in database tests
10. Run `php artisan db:seed` to feed the database

Then, you can access the application through the following URL:

    http://10.10.0.72:80

Using the project
-------

#### Create a user:

Endpoint (POST): http://10.10.0.72/api/signup

```
{
   "username": "mynickname",
   "name": "Renato Moura",
   "password": "mypassword",
}
```

#### Afterward, you need to authenticate to get your bearer token:

Endpoint (POST): http://10.10.0.72/api/signin

```
{
   "username": "mynickname",
   "password": "mypassword",
}
```

Now you are logged and can access others endpoints

-----

#### If you want to signout (invalidate token):

Endpoint (POST): http://10.10.0.72/api/signout

-----

#### Examples of valid requests:

- `To create an author`:

Endpoint (POST): http://10.10.0.72/api/createAuthor

```
{
   "name": "Machado de Assis",
   "birthdate": "1839-06-21"
}
```

Obs: You can only add 1 author per request

-----

- `To get a list of authors (with pagination)`:

Endpoint (GET): http://10.10.0.72/api/getAuthors

Using query params:

```
http://10.10.0.72/getAuthors?perPage=20&orderBy=email&orderDirection=desc&filters[name]=Machado
```

-----

- `To update an author`:

Endpoint (PUT): http://10.10.0.72/api/updateAuthor

```
{
   "id": 3,
   "name": "João Guimarães Rosa"
}
```

Obs: You can only update 1 author per request

-----

- `To delete an author`:

Endpoint (DELETE): http://10.10.0.72/api/deleteAuthor

```
{
    "id": 1
}
```

Obs: You can only delete 1 author per request

-----

- `To add a book`:

Endpoint (POST): http://10.10.0.72/api/createBook

```
{
   "title": "Desencantos",
   "publication_year": 1861,
   "author_id": 1
}
```

Obs: You can only add 1 book per request (there is no queue processing)

-----

- `To get a list of books (with Pagination)`:

Endpoint (GET): http://10.10.0.72/api/getBooks

Using query params:

```
http://10.10.0.72/getBooks?perPage=20&orderBy=email&orderDirection=desc&filters[name]=Machado
```

-----

- `To update a book`:

Endpoint (PUT): http://10.10.0.72/api/updateBook

```
{
    "id": 1,
    "publication_year": 1862
}
```

Obs: You can only update 1 book per request

-----

- `To delete a book`:

Endpoint (DELETE): http://10.10.0.72/api/deleteBook

```
{
    "id": 1
}
```

Obs: You can only delete 1 book per request

-----

- `To add a loan`:

Endpoint (POST): http://10.10.0.72/api/createLoan

Inside docker container, run: `php artisan queue:work`

Then, configure Mailtrap credentials in .env:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

Now you can proceed with the request:

```
{
   "book_id": 1,
   "loan_date": "2024-12-01",
   "return_date": "2025-01-01"
}
```

Obs: You can only add 1 loan per request

-----

- `To get a list of loans (with Pagination)`:

Endpoint (GET): http://10.10.0.72/api/getLoans

Using query params:

```
http://10.10.0.72/getLoans?perPage=20&orderBy=email&orderDirection=desc&filters[book_id]=1
```

-----

Testing
-------

Tests can be executed by running

```
php artisan test

