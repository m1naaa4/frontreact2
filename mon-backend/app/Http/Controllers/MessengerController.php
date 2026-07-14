<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MessengerController extends Controller
{
    private const PAGE_SIZE = 20;
    private const MAX_ATTACHMENT_SIZE = 10485760; // 10MB
    private const ALLOWED_IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    private const ALLOWED_VIDEO_MIMES = ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/mpeg'];
    private const ALLOWED_FILE_MIMES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

    public function searchUsers(Request $request)
    {
        $userId = (int) $request->input('user_id');
        $name = trim((string) $request->input('name', ''));

        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        if (strlen($name) < 2) {
            return response()->json(['success' => true, 'users' => []]);
        }

        // Check if friends table exists
        $hasFriendsTable = Schema::hasTable('friends');
        
        if (!$hasFriendsTable) {
            // If no friends table, search all users except current user
            $query = DB::table('users')
                ->where('users.id', '!=', $userId)
                ->where('users.name', 'like', '%' . $name . '%')
                ->select('users.id', 'users.name', 'users.avatar');
        } else {
            // Search only among friends
            $query = DB::table('users')
                ->join('friends', function ($join) use ($userId) {
                    $join->on('friends.friend_id', '=', 'users.id')
                        ->where('friends.user_id', '=', $userId);
                })
                ->where('users.id', '!=', $userId)
                ->select('users.id', 'users.name', 'users.avatar');

            $query->where('users.name', 'like', '%' . $name . '%');
        }

        return response()->json([
            'success' => true,
            'users' => $query->orderBy('users.name')->limit(20)->get()
        ]);
    }

    public function getConversations(Request $request, $routeUserId = null)
    {
        $userId = (int) ($request->input('user_id') ?: $routeUserId);

        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        $conversationIds = DB::table('conversation_user')
            ->where('user_id', $userId)
            ->pluck('conversation_id');

        if ($conversationIds->isEmpty()) {
            return response()->json(['success' => true, 'conversations' => []]);
        }

        $lastMessageIds = DB::table('messages')
            ->select(DB::raw('MAX(id) as id'))
            ->whereIn('conversation_id', $conversationIds)
            ->whereNull('deleted_at')
            ->groupBy('conversation_id')
            ->pluck('id');

        $lastMessages = DB::table('messages')
            ->whereIn('id', $lastMessageIds)
            ->get()
            ->keyBy('conversation_id');

        $unreads = DB::table('messages')
            ->select('conversation_id', DB::raw('COUNT(*) as total'))
            ->whereIn('conversation_id', $conversationIds)
            ->where('receiver_id', $userId)
            ->whereNull('read_at')
            ->whereNull('deleted_at')
            ->groupBy('conversation_id')
            ->pluck('total', 'conversation_id');

        $conversations = DB::table('conversation_user as cu')
            ->join('users as u', 'u.id', '=', 'cu.user_id')
            ->whereIn('cu.conversation_id', $conversationIds)
            ->where('cu.user_id', '!=', $userId)
            ->select('cu.conversation_id as id', 'u.id as user_id', 'u.name', 'u.avatar')
            ->get()
            ->map(function ($conversation) use ($lastMessages, $unreads) {
                $lastMessage = $lastMessages->get($conversation->id);
                $conversation->messages = $lastMessage ? [$lastMessage] : [];
                $conversation->last_message = $this->messagePreview($lastMessage);
                $conversation->content = $conversation->last_message;
                $conversation->created_at = $lastMessage ? $lastMessage->created_at : null;
                $conversation->unread = (int) ($unreads[$conversation->id] ?? 0);

                return $conversation;
            })
            ->sortByDesc('created_at')
            ->values();

        return response()->json(['success' => true, 'conversations' => $conversations]);
    }

    public function getMessages(Request $request, $routeConversationId = null)
    {
        $userId = (int) $request->input('user_id');
        $receiverId = (int) $request->input('receiver_id');
        $conversationId = (int) ($request->input('conversation_id') ?: $routeConversationId);
        $before = $request->input('before');

        if (!$conversationId && $userId && $receiverId) {
            $conversationId = $this->findConversationId($userId, $receiverId);
        }

        if (!$conversationId) {
            return response()->json([
                'success' => true,
                'messages' => [],
                'count' => 0,
                'user' => $receiverId ? DB::table('users')->where('id', $receiverId)->first() : null,
            ]);
        }

        if (!$this->belongsToConversation($conversationId, $userId)) {
            return response()->json(['success' => false, 'message' => 'Forbidden'], 403);
        }

        $messagesQuery = DB::table('messages')
            ->where('conversation_id', $conversationId)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        if ($before) {
            $messagesQuery->where('created_at', '<', $before);
        }

        $totalCount = $before ? null : (clone $messagesQuery)->count();
        $messages = $messagesQuery
            ->limit(self::PAGE_SIZE)
            ->get()
            ->sortBy('created_at')
            ->values()
            ->map(fn ($message) => $this->withAttachmentUrl($message));

        return response()->json([
            'success' => true,
            'messages' => $messages,
            'count' => $totalCount,
            'user' => $receiverId ? DB::table('users')->where('id', $receiverId)->first() : null,
        ]);
    }

    public function sendMessage(Request $request)
    {
        $senderId = (int) $request->input('user_id');
        $receiverId = (int) $request->input('receiver_id');
        $content = trim((string) $request->input('content', ''));
        $file = $request->file('attachment');

        if (!$senderId || !$receiverId) {
            return $this->validationError('user_id and receiver_id are required');
        }

        if ($content === '' && !$file) {
            return $this->validationError('content or attachment is required');
        }

        if ($file && (!$file->isValid() || $file->getSize() > self::MAX_ATTACHMENT_SIZE)) {
            return $this->validationError('Invalid attachment');
        }

        $conversationId = $this->findConversationId($senderId, $receiverId);

        DB::beginTransaction();
        try {
            if (!$conversationId) {
                if (!$this->canStartConversation($senderId, $receiverId)) {
                    DB::rollBack();
                    return response()->json(['success' => false, 'message' => 'Users are not friends'], 403);
                }

                $conversationId = DB::table('conversations')->insertGetId([
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('conversation_user')->insert([
                    ['conversation_id' => $conversationId, 'user_id' => $senderId],
                    ['conversation_id' => $conversationId, 'user_id' => $receiverId],
                ]);
            }

            $attachment = $this->storeAttachment($file);
            $messageId = DB::table('messages')->insertGetId([
                'conversation_id' => $conversationId,
                'sender_id' => $senderId,
                'receiver_id' => $receiverId,
                'content' => $content ?: null,
                'attachment_path' => $attachment['path'] ?? null,
                'attachment_name' => $attachment['name'] ?? null,
                'attachment_mime' => $attachment['mime'] ?? null,
                'attachment_size' => $attachment['size'] ?? null,
                'read_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('conversations')->where('id', $conversationId)->update(['updated_at' => now()]);
            DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        $message = $this->withAttachmentUrl(DB::table('messages')->where('id', $messageId)->first());
        $payload = ['message' => $message, 'conversation_id' => $conversationId];
        $this->broadcastToUser($receiverId, 'message.created', $payload);
        $this->broadcastToUser($senderId, 'message.created', $payload);

        return response()->json(['success' => true, 'message' => $message]);
    }

    public function createConversation(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'receiver_id' => 'required|integer',
        ]);

        $userId = (int) $request->user_id;
        $receiverId = (int) $request->receiver_id;
        $existingConversation = $this->findConversationId($userId, $receiverId);

        if ($existingConversation) {
            return response()->json([
                'success' => true,
                'conversation_id' => $existingConversation,
                'exists' => true
            ]);
        }

        if (!$this->canStartConversation($userId, $receiverId)) {
            return response()->json(['success' => false, 'message' => 'Users are not friends'], 403);
        }

        $conversationId = DB::transaction(function () use ($userId, $receiverId) {
            $conversationId = DB::table('conversations')->insertGetId([
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('conversation_user')->insert([
                ['conversation_id' => $conversationId, 'user_id' => $userId],
                ['conversation_id' => $conversationId, 'user_id' => $receiverId],
            ]);

            return $conversationId;
        });

        return response()->json([
            'success' => true,
            'conversation_id' => $conversationId,
            'exists' => false
        ]);
    }

    public function markSeen(Request $request)
    {
        $userId = (int) $request->input('user_id');
        $receiverId = (int) $request->input('receiver_id');

        if (!$userId || !$receiverId) {
            return $this->validationError('user_id and receiver_id are required');
        }

        $conversationId = $this->findConversationId($userId, $receiverId);

        if ($conversationId) {
            DB::table('messages')
                ->where('conversation_id', $conversationId)
                ->where('receiver_id', $userId)
                ->whereNull('read_at')
                ->whereNull('deleted_at')
                ->update(['read_at' => now(), 'updated_at' => now()]);

            $this->broadcastToUser($receiverId, 'message.seen', [
                'conversation_id' => $conversationId,
                'seen_by' => $userId,
            ]);
        }

        return response()->json(['success' => true]);
    }

    public function deleteMessage(Request $request, $messageId)
    {
        $userId = (int) $request->input('user_id');
        $message = DB::table('messages')->where('id', $messageId)->whereNull('deleted_at')->first();

        if (!$userId || !$message) {
            return response()->json(['success' => false, 'message' => 'Message not found'], 404);
        }

        if ((int) $message->sender_id !== $userId) {
            return response()->json(['success' => false, 'message' => 'Forbidden'], 403);
        }

        DB::table('messages')->where('id', $messageId)->update([
            'deleted_at' => now(),
            'updated_at' => now(),
        ]);

        $payload = [
            'message_id' => (int) $messageId,
            'conversation_id' => (int) $message->conversation_id,
        ];
        $this->broadcastToUser((int) $message->sender_id, 'message.deleted', $payload);
        $this->broadcastToUser((int) $message->receiver_id, 'message.deleted', $payload);

        return response()->json(['success' => true] + $payload);
    }

    public function downloadAttachment(Request $request, $messageId)
    {
        $userId = (int) $request->input('user_id');
        $message = DB::table('messages')->where('id', $messageId)->whereNull('deleted_at')->first();

        if (!$userId || !$message || !$message->attachment_path) {
            return response()->json(['success' => false, 'message' => 'File not found'], 404);
        }

        if (!$this->belongsToConversation((int) $message->conversation_id, $userId)) {
            return response()->json(['success' => false, 'message' => 'Forbidden'], 403);
        }

        $path = storage_path('app/' . $message->attachment_path);

        if (!is_file($path)) {
            return response()->json(['success' => false, 'message' => 'File not found'], 404);
        }

        return response()->download($path, $message->attachment_name ?: basename($path));
    }

    private function findConversationId(int $userId, int $receiverId): ?int
    {
        $conversationId = DB::table('conversation_user as cu1')
            ->join('conversation_user as cu2', 'cu1.conversation_id', '=', 'cu2.conversation_id')
            ->where('cu1.user_id', $userId)
            ->where('cu2.user_id', $receiverId)
            ->value('cu1.conversation_id');

        return $conversationId ? (int) $conversationId : null;
    }

    private function belongsToConversation(int $conversationId, int $userId): bool
    {
        return DB::table('conversation_user')
            ->where('conversation_id', $conversationId)
            ->where('user_id', $userId)
            ->exists();
    }

    private function canStartConversation(int $userId, int $receiverId): bool
    {
        if (!Schema::hasTable('friends')) {
            return true;
        }

        return DB::table('friends')
            ->where(function ($query) use ($userId, $receiverId) {
                $query->where('user_id', $userId)->where('friend_id', $receiverId);
            })
            ->orWhere(function ($query) use ($userId, $receiverId) {
                $query->where('user_id', $receiverId)->where('friend_id', $userId);
            })
            ->exists();
    }

    private function storeAttachment($file): array
    {
        if (!$file) {
            return [];
        }

        // Validate MIME type
        $mime = $file->getClientMimeType();
        $allowedMimes = array_merge(self::ALLOWED_IMAGE_MIMES, self::ALLOWED_VIDEO_MIMES, self::ALLOWED_FILE_MIMES);
        
        if (!in_array($mime, $allowedMimes)) {
            throw new \InvalidArgumentException('File type not allowed');
        }

        // Sanitize filename
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $safeName = pathinfo($originalName, PATHINFO_FILENAME);
        $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $safeName);
        $filename = substr($safeName, 0, 50) . '_' . uniqid('', true) . ($extension ? '.' . $extension : '');

        $directory = storage_path('app/message-attachments');

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file->move($directory, $filename);

        return [
            'path' => 'message-attachments/' . $filename,
            'name' => $originalName,
            'mime' => $mime,
            'size' => $file->getSize(),
        ];
    }

    private function withAttachmentUrl($message)
    {
        if ($message && $message->attachment_path) {
            $message->attachment_url = url('/messages/download/' . $message->id);
            $message->attachment_type = str_starts_with((string) $message->attachment_mime, 'image/')
                ? 'image'
                : 'file';
        }

        return $message;
    }

    private function messagePreview($message): string
    {
        if (!$message) {
            return '';
        }

        if ($message->content) {
            return $message->content;
        }

        return $message->attachment_name ? 'Fichier: ' . $message->attachment_name : '';
    }

    private function broadcastToUser(int $userId, string $event, array $payload): void
    {
        $key = env('PUSHER_APP_KEY') ?: env('REACT_APP_KEY_PUSHER_CONSOLE');
        $secret = env('PUSHER_APP_SECRET');
        $appId = env('PUSHER_APP_ID');
        $cluster = env('PUSHER_APP_CLUSTER') ?: env('PUSHER_CLUSTER');

        if (!$key || !$secret || !$appId || !$cluster) {
            return;
        }

        $body = json_encode([
            'name' => $event,
            'channels' => [(string) $userId . '-messages'],
            'data' => json_encode($payload),
        ]);
        $path = '/apps/' . $appId . '/events';
        $query = [
            'auth_key' => $key,
            'auth_timestamp' => time(),
            'auth_version' => '1.0',
            'body_md5' => md5($body),
        ];
        ksort($query);
        $signature = hash_hmac('sha256', "POST\n{$path}\n" . http_build_query($query), $secret);
        $query['auth_signature'] = $signature;
        $url = 'https://api-' . $cluster . '.pusher.com' . $path . '?' . http_build_query($query);

        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $body,
                'timeout' => 2,
                'ignore_errors' => true,
            ],
        ]);

        @file_get_contents($url, false, $context);
    }

    private function validationError(string $message)
    {
        return response()->json(['success' => false, 'message' => $message], 422);
    }
}
