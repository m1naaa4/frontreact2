const initState = {
    posts: [],
}
const id = window.location.href.split("/").pop()


const GetPostsReducer = (state = initState || undefined, action) => {
    switch (action.type) {

        case 'LOADING_GET_POSTS':
            return {
                ...state,
                posts: state.posts,
                loading: true
            }

        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                posts: [...state.posts, ...action.res.posts],
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false
            }

        case 'LOAD_POSTS_FILTERS_SUCCESS':
            return {
                ...state,
                posts: action.res.posts,
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false
            }

        case 'CLEAR_POSTS_LIST':
            return {
                posts: [],
                loading: true
            }

        case 'ADD_POST_SUCCESS':
            if (action.res.profile_id === id) {
                state.posts = [action.res, ...state.posts];
            }
            return {
                posts: state.posts,
                loading: false
            }
        
        case 'DELETE_COMMENT_POST':
            state.posts.forEach(function (post) {
                if (action.item_ids.post_id === post.id) {
                    post.comments.filter(item => item.id !== action.item_ids.comment_id);
                }
            });
            return {
                ...state,
                posts: state.posts,
                // likeCount    :  likeCount,
                // comments :  [action.res.comments.data, ...state.comments],
                // hasMore  :  action.res.comment.meta,
                // current  :  action.res.comment.meta,
                // loading  :  false
            }

        case 'ADD_Like_TO_POST_SUCCESS':
            const allpostslike = state.posts;
            allpostslike.forEach(function (post) {
                if (action.res?.notification?.provider_id === post.id) {
                    console.log('hereeeeeeeeeeeeeee', post.likeCount = action.res?.count)
                }
            })
            return {
                ...state,
                posts: state.posts,
                loading: false
            }

        case 'DELETE_POST_SUCCESS':
            return {
                posts: [...state.posts].filter(item => item.id !== action.res.id),
            }

        case 'GET_POSTS_ERROR':
            return {
                ...state,
                posts: state.posts,
            }
        case 'CODE_ERROR':
            return {
                ...state,
                posts: 'there seems to be a problem please refresh your browser',
            }
        default:
            return state

    }
}

export default GetPostsReducer;
