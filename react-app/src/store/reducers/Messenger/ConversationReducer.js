const initState = {
    messages: [],
    user: null,
    loading: false,
    error: null
};

const ConversationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_GET_CONVERSATION':
            return {
                ...state,
                messages: [],
                loading: true,
                error: null
            };

        case 'LOADING_CONVERSATION_MESSAGES':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'GET_CONVERSATION_SUCCESS':
            return {
                ...state,
                messages: action.res?.['messages'] || [],
                user: action.res?.user || null,
                loading: false,
                error: null
            };

        case 'LOAD_MESSAGE_SUCCESS':
            return {
                ...state,
                messages: action?.res?.before
                    ? [...(action?.res?.data?.messages || []), ...(state.messages || [])]
                    : (action?.res?.data?.messages || []),
                user: action?.res?.data?.user || null,
                loading: false,
                error: null
            };

        case 'SEND_MESSAGE_SUCCESS':
            if (state.messages.some(message => Number(message.id) === Number(action.res.message.id))) {
                return {
                    ...state,
                    loading: false,
                    error: null
                };
            }
            return {
                ...state,
                messages: [...state.messages, action.res.message],
                loading: false,
                error: null
            };

        case 'SEND_MESSAGE_SUCCESS_PUSHER':
            if (state.messages.some(message => Number(message.id) === Number(action.res.message.id))) {
                return {
                    ...state,
                    loading: false,
                    error: null
                };
            }
            return {
                ...state,
                messages: [...state.messages, action.res.message],
                loading: false,
                error: null
            };

        case 'DELETE_MESSAGE_SUCCESS':
        case 'DELETE_MESSAGE_SUCCESS_PUSHER':
            return {
                ...state,
                messages: state.messages.filter(message => Number(message.id) !== Number(action.res.message_id)),
                loading: false,
                error: null
            };

        case 'GET_CONVERSATION_ERROR':
        case 'LOAD_MESSEGES_ERROR':
            return {
                ...state,
                messages: [],
                loading: false,
                error: action?.res?.message || 'Une erreur est survenue lors du chargement'
            };

        case 'CODE_ERROR':
            return {
                ...state,
                messages: [],
                loading: false,
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

export default ConversationReducer;