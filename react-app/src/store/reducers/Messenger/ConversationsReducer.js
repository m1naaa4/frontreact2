const initState = {
    conversations: {},
    activeConversationId: null,
    loadingMessages: false,
    loading: false,
    error: null
};

const ConversationsReducer = (state = initState, action) => {
    switch (action.type) {

        case 'LOADING_CONVERSATIONS':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'LOADING_CONVERSATION_MESSAGES':
            return {
                ...state,
                activeConversationId: action?.res?.id || state.activeConversationId,
                loadingMessages: true,
                error: null
            };

        case 'LOAD_CONVERSATIONS_SUCCESS':
            const allconversations = action?.res?.['conversations'] || [];
            const mappedConversations = {};
            allconversations.forEach(function (conversation) {
                mappedConversations[conversation.user_id] = conversation;
            });
            return {
                ...state,
                conversations: mappedConversations,
                loading: false,
                error: null
            };

        case 'LOAD_MESSAGE_SUCCESS':
            const activeConversation = state?.conversations?.[action?.res?.id] || {};
            const previousMessages = action?.res?.before ? (activeConversation.messages || []) : [];
            const nextMessages = action?.res?.data?.messages || [];
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [action?.res?.id]: {
                        ...activeConversation,
                        messages: action?.res?.before ? [...nextMessages, ...previousMessages] : nextMessages,
                        count: action?.res?.data?.count ?? activeConversation.count ?? 0,
                        user: action?.res?.data?.user || activeConversation.user,
                    }
                },
                activeConversationId: action?.res?.id,
                loading: false,
                loadingMessages: false,
                error: null
            };

        case 'SEND_MESSAGE_SUCCESS':
            const sentConversationId = action?.res?.message?.receiver_id || action?.res?.message?.conversation_id;
            const currentConversation = state?.conversations?.[sentConversationId] || {};
            const currentMessages = currentConversation.messages || [];
            const alreadySent = currentMessages.some(message => Number(message.id) === Number(action?.res?.message?.id));
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [sentConversationId]: {
                        ...currentConversation,
                        messages: alreadySent ? currentMessages : [...currentMessages, action?.res?.message],
                        content: action?.res?.message?.content || action?.res?.message?.attachment_name || currentConversation.content,
                        unread: Number(currentConversation.unread || 0)
                    }
                },
                loading: false,
                loadingMessages: false,
                error: null
            };

        case 'SEND_MESSAGE_SUCCESS_PUSHER':
            const pusherConversationId = action?.res?.message?.sender_id || action?.res?.message?.conversation_id;
            const pusherConversation = state?.conversations?.[pusherConversationId] || {};
            const pusherMessages = pusherConversation.messages || [];
            const alreadyPushed = pusherMessages.some(message => Number(message.id) === Number(action?.res?.message?.id));
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [pusherConversationId]: {
                        ...pusherConversation,
                        messages: alreadyPushed ? pusherMessages : [...pusherMessages, action?.res?.message],
                        content: action?.res?.message?.content || action?.res?.message?.attachment_name || pusherConversation.content,
                        unread: Number(pusherConversation.unread || 0) + 1
                    }
                },
                loading: false,
                loadingMessages: false,
                error: null
            };

        case 'DELETE_MESSAGE_SUCCESS':
        case 'DELETE_MESSAGE_SUCCESS_PUSHER':
            const deletedMessageId = action?.res?.message_id;
            const nextConversations = {};
            Object.keys(state.conversations || {}).forEach((key) => {
                const conversation = state.conversations[key];
                nextConversations[key] = {
                    ...conversation,
                    messages: (conversation.messages || []).filter(message => Number(message.id) !== Number(deletedMessageId))
                };
            });
            return {
                ...state,
                conversations: nextConversations,
                loading: false,
                loadingMessages: false,
                error: null
            };

        case 'LOAD_CONVERSATIONS_ERROR':
        case 'LOAD_MESSEGES_ERROR':
        case 'SEND_MESSAGE_ERROR':
        case 'GET_MESSEGES_ERROR':
            return {
                ...state,
                loading: false,
                loadingMessages: false,
                error: action?.res?.message || 'Une erreur est survenue'
            };

        case 'CODE_ERROR':
            return {
                ...state,
                loading: false,
                loadingMessages: false,
                error: 'Une erreur de connexion est survenue. Veuillez rafraîchir la page.'
            };

        case 'CLEAR_MESSENGER_ERROR':
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

export default ConversationsReducer;