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
        Schema::create('Event', function (Blueprint $table) {
            $table->id();
            $table->string("EventName");
            $table->text("description");
            $table->text("URL");
            $table->timestamps();
        });

        Schema::create('EventDate', function (Blueprint $table) {
            $table->id();
            $table->foreignId("Event_id")->constrained("Event");
            $table->string("date");
            $table->timestamps();
        });

        Schema::create('JoinUser', function (Blueprint $table) {
            $table->id();
            $table->foreignId("Event_id")->constrained("Event");
            $table->string("name");
            $table->string("email");
            $table->timestamps();
        });

        Schema::create('JoinFlag', function (Blueprint $table) {
            $table->id();
            $table->foreignId("Join_id")->constrained("JoinUser");
            $table->foreignId("Date_id")->constrained("EventDate");
            $table->boolean("JoinFlag");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('JoinFlag');
        Schema::dropIfExists('JoinUser');
        Schema::dropIfExists('EventDate');
        Schema::dropIfExists('Event');
    }
};
