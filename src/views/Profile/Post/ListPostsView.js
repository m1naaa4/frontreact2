import React, {useRef, useCallback, useState, useEffect} from 'react'

import {useDispatch, useSelector} from "react-redux";
import {  useParams } from 'react-router';
import { GetPostsAction } from '../../../store/actions/Post/GetPostsAction';
import PostBody from './PostWraps/PostBody';
import PostFooter from './PostWraps/PostFooter';
import PostHeader from './PostWraps/PostHeader';


export default function ListPostsView() {

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();

    const dispatch = useDispatch();
    const observer = useRef()

    const data = {
        action: 'getPosts',
        profile_id: params.id,
    };

    const posts =  useSelector(state => state.posts.posts);
    const hasMore = useSelector(state => state.posts.hasMore);
    const current = useSelector(state => state.posts.current);
    const loading = useSelector(state => state.posts.loading);
    const lastProjectElementRef = useCallback( node =>{
        if (posts.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore  ){  
                dispatch(GetPostsAction( data, '', current+1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
            dispatch(GetPostsAction(data, '', 1));
            dispatch({ type: 'CLEAR_POSTS_LIST' });
        }
    }, [params.id]);  

    return (

        <div className="Posts-List">
            {
                loading === true ? (
                    'loading'
                    ) : posts.success === false ? (
                        <div data-testid="error-message">ERROR</div>
                    ) : (
                        () => {
                            
                            if  (posts.success !== false && posts!==undefined && posts!=="loading" && posts.length>0) {

                                return (
                                    posts.map((post, index) => {
                                        if (posts.length === index +1){
                                            return (
                                                <div className="PostWrap"  key={index +1} ref={lastProjectElementRef}>
                                                    <PostHeader post={post}/>
                                                    <PostBody post={post}/>
                                                    <PostFooter post={post}/>
                                                </div>
                                            )

                                        }else{
                                            return(
                                                <div className="PostWrap"  key={index +1}>
                                                    <PostHeader  post={post}/>
                                                    <PostBody post={post}/>
                                                    <PostFooter post={post}/>
                                                </div>

                                            )
                                        }
                                    })
                                )
                                }else {
                                    return (
                                        <div className="col-md-12">
                                            <div className="offer-box">
                                                <div className="offer-box">
                                                    no result found
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )
                            ()
                        }
        </div>

    )
}

