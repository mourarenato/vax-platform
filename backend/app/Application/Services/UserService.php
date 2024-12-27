<?php

namespace App\Application\Services;

use App\Application\Dtos\EmailDto;
use App\Application\Exceptions\CreateTokenException;
use App\Application\Exceptions\DeleteUserException;
use App\Application\Exceptions\InvalidCredentialsException;
use App\Application\Exceptions\ResetUserPasswordException;
use App\Application\Exceptions\UpdateUserException;
use App\Application\Exceptions\UserAlreadyExistsException;
use App\Application\Exceptions\UserNotFoundException;
use App\Domain\Entities\Models\User;
use App\Domain\Repositories\UserRepository;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Throwable;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Shared\Enums\LanguageEnum;
use App\Shared\Enums\CountryEnum;

class UserService
{
    public function __construct(
        protected array                 $requestData,
        private readonly UserRepository $userRepository,
    )
    {
    }

    /**
     * @throws Throwable
     */
    public function signup(): void
    {
        $user = $this->userRepository->getByEmail($this->requestData['email']);
        throw_if($user, new UserAlreadyExistsException($this->requestData['email']));

        $userData = [
            'email' => $this->requestData['email'],
            'password' => $this->requestData['password'],
            'first_name' => $this->requestData['name'],
            'language' => LanguageEnum::English->value,
            'country' => CountryEnum::USA->value,
        ];

        $this->userRepository->createUser($userData);
    }

    /**
     * @throws InvalidCredentialsException
     * @throws CreateTokenException
     */
    public function signin(): string
    {
        $credentials['password'] = $this->requestData['password'];
        $credentials['email'] = $this->requestData['email'];

        if (!JWTAuth::attempt($credentials)) {
            throw new InvalidCredentialsException();
        }

        try {
            $user = JWTAuth::user();
            $customClaims = ['user_id' => $user->id, 'authenticated_true' => true];
            $token = JWTAuth::claims($customClaims)->fromUser($user);
        } catch (Throwable $e) {
            throw new CreateTokenException();
        }

        return $token;
    }

    public function signout(): void
    {
        JWTAuth::invalidate(request()->header('Authorization'));
    }

    /**
     * @throws Throwable
     */
    public function getUser(): User
    {
        $user = JWTAuth::authenticate(request()->header('Authorization'));
        throw_if(!$user, new UserNotFoundException());
        return $user;
    }

    /**
     * @throws UserNotFoundException
     * @throws UpdateUserException
     */
    public function updateUser(): void
    {
        try {
            $user = JWTAuth::authenticate(request()->header('Authorization'));

            $this->userRepository->updateById($user->id, [
                'first_name' => $this->requestData['first_name'],
                'last_name' => $this->requestData['last_name'],
                'email' => $this->requestData['email'],
                'country' => $this->requestData['country'],
                'language' => $this->requestData['language'],
            ]);
        } catch (ModelNotFoundException) {
            throw new UserNotFoundException();
        } catch (Throwable $e) {
            throw new UpdateUserException();
        }
    }

    /**
     * @throws UserNotFoundException
     * @throws DeleteUserException
     */
    public function deleteUser(): void
    {
        try {
            $user = JWTAuth::authenticate(request()->header('Authorization'));
            $this->userRepository->deleteUserById($user->id);
        } catch (ModelNotFoundException) {
            throw new UserNotFoundException();
        } catch (Throwable $e) {
            throw new DeleteUserException();
        }
    }

    /**
     * @throws ResetUserPasswordException
     */
    public function resetUserPassword(EmailService $emailService): void
    {
        try {
            $emailDto = new EmailDto();
            $emailDto->attachValues([
                'receiver' => 'mytestmail@example.com',
                'subject' => 'Password reset request',
            ]);
            $emailService->sendEmail($emailDto);
        } catch (Throwable $e) {
            throw new ResetUserPasswordException();
        }
    }
}
