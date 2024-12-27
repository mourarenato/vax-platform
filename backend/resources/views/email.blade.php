<!-- resources/views/emails/send.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ $emailDto->subject }}</title>
</head>
<body>
<h1>{{ $emailDto->subject }}</h1>
<p>Name: {{ $emailDto->body['full_name'] }}</p>
<p>Vaccine Applied: {{ $emailDto->body['vaccine_applied'] }}</p>
</body>
</html>


