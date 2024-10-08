<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("event_name");
            $table->text("description")->nullable();
            $table->string("url");
            $table->text("mail_text")->nullable();
            $table->timestamps();
        });

        Schema::create('event_dates', function (Blueprint $table) {
            $table->id();

            $table->foreignId("event_id")->
            constrained("events")->
            cascadeOnDelete();

            $table->string("date");
            $table->timestamps();
        });

        Schema::create('join_users', function (Blueprint $table) {
            $table->id();

            $table->foreignId("event_id")->
            constrained("events")->
            cascadeOnDelete();

            $table->string("name");
            $table->string("email")->nullable();
            $table->timestamps();
        });

        Schema::create('join_flags', function (Blueprint $table) {
            $table->id();
            $table->foreignId("join_id")->constrained("join_users");
            
            $table->foreignId("date_id")->
            constrained("event_dates")->
            cascadeOnDelete();
            
            $table->boolean("join_flag");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('join_flags');
        Schema::dropIfExists('join_users');
        Schema::dropIfExists('event_dates');
        Schema::dropIfExists('events');
    }
};
