import HttpService from "../../../services/HttpService";

const http = new HttpService();

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
            console.error('Error creating conversation:', error);
            dispatch({ type: 'CODE_ERROR', error });
            throw error;
        });
    };
};

export const SearchUsersAction = (data) => {
    return (dispatch) => {
        const searchTerm = data?.name || '';
        
        if (searchTerm.length < 2) {
            return Promise.resolve({ success: true, users: [] });
        }

        return http.postData({
            url: 'messages/searchUsers',
            name: searchTerm,
            user_id: localStorage.getItem('user_id'),
        }, 'messages/searchUsers').then((res) => {
            const users = (res?.users || []).map((user) => ({
                id: user.id,
                name: user.name,
                avatar: user.avatar || '/assets/images/avatar.png',
            })).filter((user) => user.id && user.name);

            return {
                success: true,
                users,
            };
        }).catch((error) => {
            console.error('Error searching users:', error);
            return { success: false, users: [], error };
        });
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
            console.error('Error marking messages as seen:', error);
            return { success: false, error };
        });
    };
};