import React, {useRef, useCallback, useState, useEffect} from 'react'

import {useDispatch, useSelector} from "react-redux";
import { GetPostsAction } from '../../../store/actions/Post/GetPostsAction';
import PostBody from './PostWraps/PostBody';
import PostFooter from './PostWraps/PostFooter';
import PostHeader from './PostWraps/PostHeader';


export default function ListPostsView(props) {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const observer = useRef()

    const data = {
        action: 'getPosts',
    };

    const posts =  useSelector(state => state.posts.posts);
    const hasMore = useSelector(state => state.posts.hasMore);
    const current = useSelector(state => state.posts.current);
    const loading = useSelector(state => state.posts.loading);
    const lastProjectElementRef = useCallback( node =>{
        if (posts.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            console.log('entriessssss',entries)
            if (entries[0].isIntersecting && hasMore  ){  
                //dispatch(GetPostsAction( data, props, current+1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
            dispatch(GetPostsAction(data, props, 1));
        }
    }, [dispatch]);  

    return (

        <div className="Posts-List">
            <div className="PostWrap">
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
                                                <div  key={index +1} ref={lastProjectElementRef}>
                                                    <PostHeader post={post}/>
                                                    <PostBody post={post}/>
                                                    <PostFooter post={post}/>
                                                </div>
                                            )

                                        }else{
                                            return(
                                                <div  key={index +1}>
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
        </div>

    )
}

