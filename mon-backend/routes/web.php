<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () {
    return 'Lumen is running';
});

$router->get('searchUsers', 'MessengerController@searchUsers');
$router->post('searchUsers', 'MessengerController@searchUsers');

$router->group(['prefix' => 'messages'], function () use ($router) {
    $router->get('searchUsers', 'MessengerController@searchUsers');
    $router->post('searchUsers', 'MessengerController@searchUsers');
    $router->get('getConversations', 'MessengerController@getConversations');
    $router->post('show', 'MessengerController@getMessages');
    $router->post('store', 'MessengerController@sendMessage');
    $router->post('create', 'MessengerController@createConversation');
    $router->post('markSeen', 'MessengerController@markSeen');
    $router->delete('delete/{messageId}', 'MessengerController@deleteMessage');
    $router->get('download/{messageId}', 'MessengerController@downloadAttachment');
});

$router->group(['prefix' => 'messenger'], function () use ($router) {
    $router->get('conversations/{userId}', 'MessengerController@getConversations');
    $router->get('conversation/{conversationId}', 'MessengerController@getMessages');
    $router->post('send', 'MessengerController@sendMessage');
    $router->post('create', 'MessengerController@createConversation');
});

$router->group(['prefix' => 'friend'], function () use ($router) {
    $router->post('syncUser', 'FriendController@syncUser');
    $router->post('getmyfriends', 'FriendController@getMyFriends');
    $router->post('getFriends', 'FriendController@getFriends');
    $router->post('getInvitations', 'FriendController@getInvitations');
    $router->post('getSuggestions', 'FriendController@getSuggestions');
    $router->post('sendRequest', 'FriendController@sendRequest');
    $router->post('friendAccept', 'FriendController@friendAccept');
    $router->post('friendReject', 'FriendController@friendReject');
    $router->post('friendRemove', 'FriendController@friendRemove');
});
