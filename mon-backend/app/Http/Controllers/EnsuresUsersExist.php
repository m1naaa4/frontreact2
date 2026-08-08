<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

trait EnsuresUsersExist
{
    protected function ensureUser(int $userId, array $attributes = []): void
    {
        if ($userId <= 0 || !Schema::hasTable('users')) {
            return;
        }

        $existing = DB::table('users')->where('id', $userId)->first();
        $payload = [];

        foreach (['name', 'email', 'username', 'firstname', 'lastname', 'avatar', 'profile_id', 'type', 'sector', 'job'] as $field) {
            if (array_key_exists($field, $attributes) && $attributes[$field] !== null && $attributes[$field] !== '') {
                $payload[$field] = $attributes[$field];
            }
        }

        if (!$existing) {
            $fullName = trim(($payload['firstname'] ?? '') . ' ' . ($payload['lastname'] ?? ''));
            $name = $payload['name']
                ?? ($fullName !== '' ? $fullName : null)
                ?? ($payload['username'] ?? null)
                ?? ('Utilisateur ' . $userId);

            DB::table('users')->insert(array_merge([
                'id' => $userId,
                'name' => $name,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ], $payload));

            return;
        }

        if ($payload === []) {
            return;
        }

        // Upgrade stub names when we learn the real display name.
        if (isset($payload['name']) && preg_match('/^Utilisateur\s+\d+$/', (string) $existing->name)) {
            // keep payload name
        } elseif (isset($payload['name']) && !empty($existing->name) && $existing->name !== 'Utilisateur') {
            // keep existing non-stub name unless explicitly syncing
            if (empty($attributes['_force_name'])) {
                unset($payload['name']);
            }
        }

        if ($payload === []) {
            return;
        }

        $payload['updated_at'] = date('Y-m-d H:i:s');
        DB::table('users')->where('id', $userId)->update($payload);
    }

    protected function userAttributesFromRequest($request, string $prefix = ''): array
    {
        $get = function (string $key) use ($request, $prefix) {
            return $request->input($prefix . $key);
        };

        return array_filter([
            'name' => $get('name') ?: $get('username') ?: trim(($get('firstname') ?: '') . ' ' . ($get('lastname') ?: '')),
            'email' => $get('email'),
            'username' => $get('username'),
            'firstname' => $get('firstname') ?: $get('first_name'),
            'lastname' => $get('lastname') ?: $get('last_name'),
            'avatar' => $get('avatar'),
            'profile_id' => $get('profile_id'),
            'type' => $get('type'),
            'sector' => $get('sector'),
            'job' => $get('job'),
            '_force_name' => $get('_force_name'),
        ], fn ($value) => $value !== null && $value !== '');
    }
}
