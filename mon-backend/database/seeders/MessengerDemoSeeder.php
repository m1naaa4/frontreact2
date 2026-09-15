<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Optional local-only data for demonstrating the Messenger UI.
 * Run explicitly with: php artisan db:seed --class=MessengerDemoSeeder
 */
class MessengerDemoSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $users = [
            [
                'id' => 900001,
                'name' => 'Amine Démo',
                'email' => 'amine.demo@local.test',
                'username' => 'amine-demo',
                'profile_id' => 900001,
                'job' => 'Entrepreneur',
            ],
            [
                'id' => 900002,
                'name' => 'Sarah Démo',
                'email' => 'sarah.demo@local.test',
                'username' => 'sarah-demo',
                'profile_id' => 900002,
                'job' => 'Mentore',
            ],
            [
                'id' => 900003,
                'name' => 'Admin',
                'email' => 'admin.demo@local.test',
                'username' => 'admin',
                'profile_id' => 900003,
                'job' => 'Administration',
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(
                ['id' => $user['id']],
                $user + ['created_at' => $now, 'updated_at' => $now]
            );
        }

        // Attach test threads to every real local account so the currently
        // connected user sees them immediately. Existing conversations and
        // messages are never modified.
        $recipients = DB::table('users')
            ->whereNotIn('id', [900001, 900002, 900003])
            ->pluck('id');

        foreach ($recipients as $recipientId) {
            $this->seedConversation(
                (int) $recipientId,
                900001,
                'Bonjour ! Ceci est une conversation fictive pour tester la messagerie.',
                $now->copy()->subMinutes(12)
            );
            $this->seedConversation(
                (int) $recipientId,
                900002,
                'La messagerie est prête : tu peux répondre, envoyer un fichier et tester les messages non lus.',
                $now->copy()->subMinutes(6)
            );
            $this->seedConversation(
                (int) $recipientId,
                900003,
                'On se retrouve demain pour faire le point sur le projet ?',
                $now->copy()->subMinutes(2)
            );
        }
    }

    private function seedConversation(int $recipientId, int $demoUserId, string $message, Carbon $createdAt): void
    {
        $conversationId = DB::table('conversation_user as left_user')
            ->join('conversation_user as right_user', 'left_user.conversation_id', '=', 'right_user.conversation_id')
            ->where('left_user.user_id', $recipientId)
            ->where('right_user.user_id', $demoUserId)
            ->value('left_user.conversation_id');

        if (!$conversationId) {
            $conversationId = DB::table('conversations')->insertGetId([
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
            DB::table('conversation_user')->insert([
                ['conversation_id' => $conversationId, 'user_id' => $recipientId],
                ['conversation_id' => $conversationId, 'user_id' => $demoUserId],
            ]);
        }

        if (!DB::table('messages')->where('conversation_id', $conversationId)->exists()) {
            DB::table('messages')->insert([
                'conversation_id' => $conversationId,
                'sender_id' => $demoUserId,
                'receiver_id' => $recipientId,
                'content' => $message,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
