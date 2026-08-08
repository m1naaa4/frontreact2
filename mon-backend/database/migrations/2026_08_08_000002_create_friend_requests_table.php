<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (Schema::hasTable('friend_requests')) {
            return;
        }

        Schema::create('friend_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('requester_id');
            $table->unsignedBigInteger('receiver_id');
            $table->string('status', 20)->default('pending');
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();

            $table->unique(['requester_id', 'receiver_id']);
            $table->index(['receiver_id', 'status']);
            $table->index(['requester_id', 'status']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('friend_requests');
    }
};
