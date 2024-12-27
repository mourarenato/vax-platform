<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('vaxxed_people', function (Blueprint $table) {
            $table->id();
            $table->integer('vaccine_id')->nullable();
            $table->foreign('vaccine_id')->references('id')->on('vaccines');
            $table->string('cpf')->nullable()->unique()->index();
            $table->string('full_name')->nullable();
            $table->dateTime('birthdate')->nullable();
            $table->dateTime('first_dose')->nullable();
            $table->dateTime('second_dose')->nullable();
            $table->dateTime('third_dose')->nullable();
            $table->string('vaccine_applied')->nullable();
            $table->integer('has_comorbidity')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('vaxxed_people');
    }
};
