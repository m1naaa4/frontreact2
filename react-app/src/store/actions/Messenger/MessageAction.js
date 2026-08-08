import HttpService from "../../../services/HttpService";

const http = new HttpService();

const currentUserId = () => Number(localStorage.getItem('user_id')) || 0;

const normalizeSearchUser = (user, defaults = {}) => {
    const profile = user?.profile || {};
    const id = Number(
        user?.id
        ?? user?.user_id
        ?? profile?.user_id
        ?? profile?.id
    );
    const firstName = user?.firstname || user?.first_name || profile?.firstname || '';
    const lastName = user?.lastname || user?.last_name || profile?.lastname || '';
    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const name = (
        user?.name
        || fullName
        || profile?.username
        || user?.username
        || user?.email
        || ''
    ).trim();
    const relationship = user?.relationship_status || defaults.relationship_status || 'none';
    const canMessage = user?.can_message !== undefined && user?.can_message !== null
        ? Boolean(user.can_message)
        : Boolean(defaults.can_message ?? relationship === 'friends');

    if (!id || !name) {
        return null;
    }

    return {
        id,
        user_id: id,
        name,
        avatar: user?.avatar || profile?.avatar_link || profile?.avatar || '/assets/images/avatar.png',
        relationship_status: relationship,
        can_message: canMessage,
        profile_id: Number(user?.profile_id || profile?.id || id) || id,
        request_id: user?.request_id ? Number(user.request_id) : null,
    };
};

const dedupeUsers = (users) => {
    const seen = new Set();
    const me = currentUserId();

    return users.filter((user) => {
        if (!user || !user.id || Number(user.id) === me) {
            return false;
        }
        if (seen.has(Number(user.id))) {
            return false;
        }
        seen.add(Number(user.id));
        return true;
    });
};

const extractUserList = (res) => {
    if (Array.isArray(res?.users)) return res.users;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.friends)) return res.friends;
    if (Array.isArray(res)) return res;
    return [];
};

const isHttpError = (error, status) => Number(error?.response?.status) === status;

export const GetMessagesListAction = (data, props, current) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_CONVERSATIONS' });

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            dispatch({ type: 'GET_MESSEGES_ERROR', res: { success: false, conversations: 'User not authenticated' } });
            return;
        }

        http.getRequest({ user_id: userId }, data).then((res) => {
            if (res?.success === true) {
                dispatch({ type: 'LOAD_CONVERSATIONS_SUCCESS', res });
            } else if (res?.success === false) {
                dispatch({ type: 'GET_MESSEGES_ERROR', res });
            }
        }, error => {
            console.error('Error fetching conversations:', error);
            dispatch({ type: 'CODE_ERROR', error });
        });
    };
};

export const GetConversationAction = (data, props, current) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_CONVERSATION_MESSAGES', res: { id: data.receiver_id, before: data.before } });

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            dispatch({ type: 'LOAD_MESSEGES_ERROR', res: { success: false, message: 'User not authenticated' } });
            return Promise.reject(new Error('User not authenticated'));
        }

        return http.postData({
            ...data,
            user_id: userId,
        }, props, current).then((res) => {
            if (res?.success === true) {
                dispatch({ type: 'LOAD_MESSAGE_SUCCESS', res: { data: res, id: data.receiver_id, before: data.before } });
            } else if (res?.success === false) {
                dispatch({ type: 'LOAD_MESSEGES_ERROR', res });
            }
            return res;
        }, error => {
            console.error('Error fetching conversation:', error);
            dispatch({ type: 'CODE_ERROR', error });
            throw error;
        });
    };
};

export const SendMessageAction = (data, props, current) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_CONVERSATIONS' });

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            dispatch({ type: 'SEND_MESSAGE_ERROR', res: { success: false, message: 'User not authenticated' } });
            return Promise.reject(new Error('User not authenticated'));
        }

        const payload = data instanceof FormData ? data : {
            ...data,
            user_id: userId,
        };

        if (data instanceof FormData) {
            payload.append('user_id', userId);
        }

        return http.postData(payload, props, current, false).then((res) => {
            if (res?.success === true) {
                dispatch({ type: 'SEND_MESSAGE_SUCCESS', res });
            } else if (res?.success === false) {
                dispatch({ type: 'SEND_MESSAGE_ERROR', res });
            }
            return res;
        }, error => {
            console.error('Error sending message:', error);
            dispatch({ type: 'CODE_ERROR', error });
            throw error;
        });
    };
};

export const DeleteMessageAction = (messageId) => {
    return (dispatch) => {
        if (!messageId) {
            return Promise.reject(new Error('Message ID is required'));
        }

        return http.deleteRequest({}, `messages/delete/${messageId}`).then((res) => {
            if (res?.success === true) {
                dispatch({ type: 'DELETE_MESSAGE_SUCCESS', res });
                dispatch(GetMessagesListAction('messages/getConversations', '', 1));
            } else {
                console.error('Failed to delete message:', res);
            }
            return res;
        }, error => {
            console.error('Error deleting message:', error);
            dispatch({ type: 'CODE_ERROR', error });
            throw error;
        });
    };
};

export const CreateConversationAction = (data, props, current) => {
    return (dispatch) => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return Promise.reject(new Error('User not authenticated'));
        }

        return http.postData({
            ...data,
            user_id: userId,
        }, props, current).then((res) => {
            if (res?.success === true) {
                dispatch(GetMessagesListAction('messages/getConversations', '', 1));
            }
            return res;
        }, error => {
            // Production API does not expose messages/create (404). Conversation is
            // created lazily on first messages/store — still allow opening the thread.
            if (isHttpError(error, 404)) {
                console.warn('messages/create unavailable; conversation will be created on first message.');
                return { success: true, exists: false, deferred: true };
            }

            console.error('Error creating conversation:', error?.response?.data || error);
            dispatch({ type: 'CODE_ERROR', error });
            throw error;
        });
    };
};

/**
 * Messenger user search.
 * Primary: messages/searchUsers (local mon-backend / future API).
 * Fallback: friend/getmyfriends (exists on api.dadupa.com) — friends are messageable.
 * Extra: user/getusers for non-friend discovery (add-friend flow).
 */
export const SearchUsersAction = (data) => {
    return async () => {
        const searchTerm = (data?.name || '').trim();

        if (searchTerm.length < 2) {
            return Promise.resolve({ success: true, users: [] });
        }

        const payload = {
            name: searchTerm,
            search: searchTerm,
            user_id: localStorage.getItem('user_id'),
        };

        const merged = [];
        const errors = [];
        let localSucceeded = false;

        const tryEndpoint = async (endpoint, mapDefaults) => {
            try {
                const res = await http.postData({ ...payload }, endpoint);
                if (res?.success === false) {
                    errors.push(res?.message || `${endpoint} failed`);
                    return;
                }

                localSucceeded = true;

                extractUserList(res).forEach((raw) => {
                    const normalized = normalizeSearchUser(raw, mapDefaults);
                    if (normalized) {
                        merged.push(normalized);
                    }
                });
            } catch (error) {
                const status = error?.response?.status;
                // 404 = route missing on this environment — try next source.
                if (status && status !== 404) {
                    console.error(`Error searching via ${endpoint}:`, error?.response?.data || error);
                    errors.push(error?.response?.data?.message || `Erreur ${status} sur ${endpoint}`);
                }
            }
        };

        await tryEndpoint('messages/searchUsers', {});
        await tryEndpoint('searchUsers', {});

        // Friends are the reliable production source for "message an ami".
        await tryEndpoint('friend/getmyfriends', {
            relationship_status: 'friends',
            can_message: true,
        });

        // Broader directory search for people not yet friends.
        try {
            const res = await http.postData({
                ...payload,
                search: searchTerm,
            }, 'user/getusers');

            extractUserList(res).forEach((raw) => {
                const normalized = normalizeSearchUser(raw, {
                    relationship_status: 'none',
                    can_message: false,
                });
                if (!normalized) {
                    return;
                }
                // Prefer friend/messenger records if already present.
                if (!merged.some((u) => Number(u.id) === Number(normalized.id))) {
                    merged.push(normalized);
                }
            });
        } catch (error) {
            console.warn('Directory search user/getusers failed or was unauthorized:', error?.response?.data || error);
        }

        const users = dedupeUsers(merged).filter((user) => {
            const haystack = String(user.name || '').toLowerCase();
            return haystack.includes(searchTerm.toLowerCase());
        });

        if (users.length > 0 || localSucceeded) {
            return { success: true, users };
        }

        if (errors.length > 0 && merged.length === 0) {
            return {
                success: false,
                users: [],
                message: errors[0] || 'Impossible de rechercher les utilisateurs.',
            };
        }

        return { success: true, users: [], message: 'Aucun utilisateur trouvé.' };
    };
};

export const MarkSeenAction = (data) => {
    return (dispatch) => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            return Promise.resolve({ success: false, message: 'User not authenticated' });
        }

        return http.postData({
            ...data,
            user_id: userId,
        }, 'messages/markSeen').then((res) => {
            if (res?.success === true) {
                dispatch(GetMessagesListAction('messages/getConversations', '', 1));
            }
            return res;
        }).catch((error) => {
            // markSeen may be missing on some environments — non-blocking.
            if (!isHttpError(error, 404)) {
                console.error('Error marking messages as seen:', error);
            }
            return { success: false, error };
        });
    };
};
