<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * One-time reset for the local Admin demo thread.
 * It only clears conversations involving the demo account (id 900003).
 */
class ResetAdminDemoConversationSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('users')->updateOrInsert(
            ['id' => 900003],
            [
                'name' => 'Admin',
                'email' => 'admin.demo@local.test',
                'username' => 'admin',
                'profile_id' => 900003,
                'job' => 'Administration',
                'updated_at' => $now,
                'created_at' => $now,
            ]
        );

        $conversationIds = DB::table('conversation_user')
            ->where('user_id', 900003)
            ->pluck('conversation_id');

        if ($conversationIds->isNotEmpty()) {
            DB::table('messages')->whereIn('conversation_id', $conversationIds)->delete();
            DB::table('conversations')->whereIn('id', $conversationIds)->update(['updated_at' => $now]);
        }
    }
}
