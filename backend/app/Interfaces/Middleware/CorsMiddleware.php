<?php

namespace App\Interfaces\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        header("Access-Control-Allow-Origin: http://10.10.0.22:3000");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");

        if ($request->getMethod() == "OPTIONS") {
            return response()->json([], 200);
        }

        return $next($request);
    }
}