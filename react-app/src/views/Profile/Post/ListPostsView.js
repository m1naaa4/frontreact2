import React, { useRef, useCallback, useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import ListPostsSkeleton from '../../../skeleton/profile/ListPostsSkeleton';
import { GetPostsAction } from '../../../store/actions/Post/PostAction';
import PostBody from './PostWraps/PostBody';
import PostFooter from './PostWraps/PostFooter';
import PostHeader from './PostWraps/PostHeader';
import {Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function ListPostsView() {
    const dispatch = useDispatch();
    const params = useParams();
    const observer = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.userProfile.userProfile);
    const posts = useSelector(state => state.posts.posts);
    const hasMore = useSelector(state => state.posts.hasMore);
    const current = useSelector(state => state.posts.current);
    const loading = useSelector(state => state.posts.loading);
    const {t} = useTranslation();

    const data = {
        action: 'getPosts',
        profile: params.id,
        Sort: 'desc',
    };

    const lastProjectElementRef = useCallback(node => {
        if (posts.loading) return

        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                const p = current+1;
                dispatch(GetPostsAction(data, '/get?page=' + p));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    useEffect(() => {
        if (!isLoading) {
            dispatch(GetPostsAction(data, '/get?page=1'));
            dispatch({ type: 'CLEAR_POSTS_LIST' });
        }
    }, [params.id]);

    return (

        <div className="Posts-List">
            {
                loading === true ?
                    <ListPostsSkeleton />
                    : posts.success === false ? (
                        <Redirect to={{pathname: '/opps'}} />
                    ) : (
                        () => {
                            if (posts.length > 0) {
                                return (
                                    posts.map((post, index) => {
                                        if (posts.length === index + 1) {
                                            return (
                                                <div key={index +1}>
                                                    <div className="PostWrap" key={index +1} ref={lastProjectElementRef}>
                                                        <PostHeader post={post} />
                                                        <PostBody post={post} />
                                                        <PostFooter post={post} />
                                                    </div>
                                                    <div className="PostWrap" key={post.id + 1}>
                                                        <div className="PostBody subscribedAt">
                                                            <img src="/assets/images/dadupa-brand.svg" alt="Dadupa Connect" />
                                                            <div className="mt-2">
                                                                <h5> {t('subscriptionKickoff')} {user.created_at?.for_humans}  ({user.created_at?.date})</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        } else {
                                            return (
                                                <div className="PostWrap" key={index +1}>
                                                    <PostHeader post={post} />
                                                    <PostBody post={post} />
                                                    <PostFooter post={post} />
                                                </div>
                                            )
                                        }
                                    })
                                )
                            } else {
                                return (
                                    <div className="col-md-12">
                                        <div className="offer-box">
                                            <div className="offer-box">
                                                <div className="PostWrap">
                                                    {/* <PostHeader post={}/> */}
                                                    <div className="PostBody subscribedAt">
                                                        <img src="/assets/images/dadupa-brand.svg" alt="Dadupa Connect" />
                                                        <div className="mt-2">
                                                            <h5>{t('subscriptionKickoff')} {user.created_at?.for_humans}  ({user.created_at?.date})</h5>
                                                        </div>
                                                    </div>
                                                </div>
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

