<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FriendController extends Controller
{
    use EnsuresUsersExist;

    public function syncUser(Request $request)
    {
        $userId = $this->currentUserId($request);
        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        $attrs = $this->userAttributesFromRequest($request);
        $attrs['_force_name'] = true;
        $this->ensureUser($userId, $attrs);

        return response()->json([
            'success' => true,
            'user' => DB::table('users')->where('id', $userId)->first(),
        ]);
    }

    public function getMyFriends(Request $request)
    {
        $userId = $this->currentUserId($request);

        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        $this->ensureUser($userId, $this->userAttributesFromRequest($request));

        if (!Schema::hasTable('friends') || !Schema::hasTable('users')) {
            return response()->json([
                'success' => true,
                'data' => [],
                'count' => 0,
            ]);
        }

        $search = trim((string) $request->input('search', ''));
        $type = $request->input('type');
        $friends = $this->friendUsersQuery($userId, $search, $type)->get()
            ->map(fn ($user) => $this->shapeFriendUser($user, 'friends'));

        return response()->json([
            'success' => true,
            'data' => $friends,
            'count' => $friends->count(),
        ]);
    }

    public function getFriends(Request $request)
    {
        return $this->getMyFriends($request);
    }

    public function getInvitations(Request $request)
    {
        $userId = $this->currentUserId($request);

        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        $this->ensureUser($userId, $this->userAttributesFromRequest($request));

        if (!Schema::hasTable('friend_requests') || !Schema::hasTable('users')) {
            return response()->json([
                'success' => true,
                'data' => [],
                'count' => 0,
            ]);
        }

        $invitations = DB::table('friend_requests as fr')
            ->join('users as u', 'u.id', '=', 'fr.requester_id')
            ->where('fr.receiver_id', $userId)
            ->where('fr.status', 'pending')
            ->select($this->userSelectColumns(['fr.id as request_id'], 'u'))
            ->orderByDesc('fr.created_at')
            ->get()
            ->map(fn ($user) => $this->shapeFriendUser($user, 'received'));

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'count' => $invitations->count(),
        ]);
    }

    public function getSuggestions(Request $request)
    {
        $userId = $this->currentUserId($request);

        if (!$userId) {
            return $this->validationError('user_id is required');
        }

        if (!Schema::hasTable('friends') || !Schema::hasTable('friend_requests') || !Schema::hasTable('users')) {
            return response()->json([
                'success' => true,
                'data' => [],
                'count' => 0,
            ]);
        }

        $relatedIds = $this->relatedUserIds($userId);
        $suggestions = DB::table('users')
            ->where('id', '!=', $userId)
            ->whereNotIn('id', $relatedIds)
            ->select($this->userSelectColumns())
            ->orderBy('name')
            ->limit(30)
            ->get()
            ->map(fn ($user) => $this->shapeFriendUser($user, 'none'));

        return response()->json([
            'success' => true,
            'data' => $suggestions,
            'count' => $suggestions->count(),
        ]);
    }

    public function sendRequest(Request $request)
    {
        $userId = $this->currentUserId($request);
        $friendId = (int) $request->input('friend_id');

        if (!$userId || !$friendId) {
            return $this->validationError('user_id and friend_id are required');
        }

        if (!Schema::hasTable('friends') || !Schema::hasTable('friend_requests')) {
            return response()->json(['success' => false, 'message' => 'Friend system is not installed'], 500);
        }

        $this->ensureUser($userId, $this->userAttributesFromRequest($request));
        $this->ensureUser($friendId, array_filter([
            'name' => $request->input('friend_name') ?: $request->input('name'),
            'username' => $request->input('friend_username'),
            'avatar' => $request->input('friend_avatar'),
            'profile_id' => $request->input('friend_profile_id'),
            'firstname' => $request->input('friend_firstname'),
            'lastname' => $request->input('friend_lastname'),
            '_force_name' => true,
        ], fn ($v) => $v !== null && $v !== ''));

        if ($userId === $friendId) {
            return response()->json(['success' => false, 'message' => 'You cannot send a request to yourself'], 422);
        }

        if ($this->areFriends($userId, $friendId)) {
            return response()->json(['success' => true, 'status' => 'friends', 'message' => 'Users are already friends']);
        }

        $incoming = $this->pendingRequest($friendId, $userId);
        if ($incoming) {
            return $this->acceptByRequest($incoming->id, $userId);
        }

        $pending = $this->pendingRequest($userId, $friendId);
        if ($pending) {
            return response()->json(['success' => true, 'status' => 'pending_sent', 'request_id' => $pending->id]);
        }

        $requestId = DB::table('friend_requests')->insertGetId([
            'requester_id' => $userId,
            'receiver_id' => $friendId,
            'status' => 'pending',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        return response()->json(['success' => true, 'status' => 'pending_sent', 'request_id' => $requestId]);
    }

    public function friendAccept(Request $request)
    {
        $userId = $this->currentUserId($request);
        $requestId = (int) $request->input('request_id', $request->input('id'));
        $friendId = (int) $request->input('friend_id');

        if (!$userId || (!$requestId && !$friendId)) {
            return $this->validationError('user_id and request_id (or friend_id) are required');
        }

        return $this->acceptByRequest($requestId, $userId, $friendId ?: null);
    }

    public function friendReject(Request $request)
    {
        $userId = $this->currentUserId($request);
        $requestId = (int) $request->input('request_id', $request->input('id'));
        $friendId = (int) $request->input('friend_id');

        if (!$userId || (!$requestId && !$friendId)) {
            return $this->validationError('user_id and request_id (or friend_id) are required');
        }

        $query = DB::table('friend_requests')
            ->where('receiver_id', $userId)
            ->where('status', 'pending');

        if ($requestId) {
            $query->where(function ($builder) use ($requestId) {
                $builder->where('id', $requestId)
                    ->orWhere('requester_id', $requestId);
            });
        } elseif ($friendId) {
            $query->where('requester_id', $friendId);
        }

        $updated = $query->update([
            'status' => 'rejected',
            'responded_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        return response()->json(['success' => (bool) $updated, 'status' => $updated ? 'rejected' : 'not_found']);
    }

    public function friendRemove(Request $request)
    {
        $userId = $this->currentUserId($request);
        $friendId = (int) $request->input('request_id');

        if (!$userId || !$friendId) {
            return $this->validationError('user_id and request_id are required');
        }

        DB::table('friends')
            ->where(function ($query) use ($userId, $friendId) {
                $query->where('user_id', $userId)->where('friend_id', $friendId);
            })
            ->orWhere(function ($query) use ($userId, $friendId) {
                $query->where('user_id', $friendId)->where('friend_id', $userId);
            })
            ->delete();

        return response()->json(['success' => true, 'status' => 'removed']);
    }

    private function acceptByRequest(int $requestId, int $userId, ?int $friendId = null)
    {
        $friendRequest = null;

        if ($requestId) {
            $friendRequest = DB::table('friend_requests')
                ->where('id', $requestId)
                ->where('receiver_id', $userId)
                ->where('status', 'pending')
                ->first();

            // Legacy clients sometimes send the requester user id as request_id.
            if (!$friendRequest) {
                $friendRequest = DB::table('friend_requests')
                    ->where('requester_id', $requestId)
                    ->where('receiver_id', $userId)
                    ->where('status', 'pending')
                    ->first();
            }
        }

        if (!$friendRequest && $friendId) {
            $friendRequest = DB::table('friend_requests')
                ->where('requester_id', $friendId)
                ->where('receiver_id', $userId)
                ->where('status', 'pending')
                ->first();
        }

        if (!$friendRequest) {
            return response()->json(['success' => false, 'message' => 'Friend request not found'], 404);
        }

        DB::transaction(function () use ($friendRequest) {
            DB::table('friend_requests')
                ->where('id', $friendRequest->id)
                ->update([
                    'status' => 'accepted',
                    'responded_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);

            $this->insertFriendPair((int) $friendRequest->requester_id, (int) $friendRequest->receiver_id);
        });

        return response()->json(['success' => true, 'status' => 'friends']);
    }

    private function insertFriendPair(int $userId, int $friendId): void
    {
        foreach ([[$userId, $friendId], [$friendId, $userId]] as [$left, $right]) {
            DB::table('friends')->updateOrInsert(
                ['user_id' => $left, 'friend_id' => $right],
                ['updated_at' => Carbon::now(), 'created_at' => Carbon::now()]
            );
        }
    }

    private function friendUsersQuery(int $userId, string $search = '', $type = null)
    {
        $query = DB::table('friends as f')
            ->join('users as u', 'u.id', '=', 'f.friend_id')
            ->where('f.user_id', $userId)
            ->select($this->userSelectColumns([], 'u'));

        if ($search !== '') {
            $query->where(function ($where) use ($search) {
                $where->where('u.name', 'like', '%' . $search . '%')
                    ->when(Schema::hasColumn('users', 'email'), function ($builder) use ($search) {
                        $builder->orWhere('u.email', 'like', '%' . $search . '%');
                    });
            });
        }

        if ($type && Schema::hasColumn('users', 'type')) {
            $query->where('u.type', $type);
        }

        return $query->orderBy('u.name')->limit(100);
    }

    private function userSelectColumns(array $prefixColumns = [], string $alias = null): array
    {
        $table = $alias ?: 'users';
        $prefix = $alias ? $alias . '.' : '';
        $columns = $prefixColumns;

        foreach (['id', 'name', 'email', 'avatar', 'profile_id', 'type', 'sector', 'job'] as $column) {
            if (Schema::hasColumn('users', $column)) {
                $columns[] = $prefix . $column;
            }
        }

        if ($alias) {
            $columns[] = $prefix . 'id as user_id';
        }

        return array_values(array_unique($columns));
    }

    private function relatedUserIds(int $userId): array
    {
        if (!Schema::hasTable('friends') || !Schema::hasTable('friend_requests')) {
            return [$userId];
        }

        $friendIds = DB::table('friends')->where('user_id', $userId)->pluck('friend_id')->all();
        $sentIds = DB::table('friend_requests')->where('requester_id', $userId)->where('status', 'pending')->pluck('receiver_id')->all();
        $receivedIds = DB::table('friend_requests')->where('receiver_id', $userId)->where('status', 'pending')->pluck('requester_id')->all();

        return array_values(array_unique(array_merge([$userId], $friendIds, $sentIds, $receivedIds)));
    }

    private function pendingRequest(int $requesterId, int $receiverId)
    {
        if (!Schema::hasTable('friend_requests')) {
            return null;
        }

        return DB::table('friend_requests')
            ->where('requester_id', $requesterId)
            ->where('receiver_id', $receiverId)
            ->where('status', 'pending')
            ->first();
    }

    private function areFriends(int $userId, int $friendId): bool
    {
        if (!Schema::hasTable('friends')) {
            return false;
        }

        return DB::table('friends')
            ->where('user_id', $userId)
            ->where('friend_id', $friendId)
            ->exists();
    }

    private function currentUserId(Request $request): int
    {
        return (int) (
            $request->input('user_id')
            ?: $request->input('profile_user_id')
            ?: $request->input('user_profile_id')
        );
    }

    private function shapeFriendUser($user, string $relationship)
    {
        $userId = (int) ($user->user_id ?? $user->id);
        $name = $user->name ?? $user->username ?? 'Utilisateur';
        $avatar = $user->avatar ?? '/assets/images/avatar.png';
        $requestId = isset($user->request_id) ? (int) $user->request_id : null;

        // Invitations: legacy UI accepts with `invitation.id` (= friend_requests.id).
        // Friends/suggestions: `id` is the other user's id.
        $publicId = ($relationship === 'received' && $requestId) ? $requestId : $userId;

        $friend = [
            'id' => $publicId,
            'user_id' => $userId,
            'name' => $name,
            'type' => $user->type ?? '',
            'sector' => $user->sector ?? '',
            'relationship_status' => $relationship,
            'profile' => (object) [
                'id' => $user->profile_id ?? $userId,
                'username' => $name,
                'job' => $user->job ?? '',
                'avatar_link' => $avatar,
            ],
        ];

        if ($requestId) {
            $friend['request_id'] = $requestId;
        }

        return (object) $friend;
    }

    private function validationError(string $message)
    {
        return response()->json(['success' => false, 'message' => $message], 422);
    }
}
