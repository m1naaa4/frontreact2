import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LikeAction } from '../../../../store/actions/Like/LikeAction';
import AddComment from '../Comment/AddComment';
import ShowComment from '../Comment/ShowComment';
import HeaderSub from './HeaderSub';
import './sub.css'

export default function Sub({post}) {

    const [comments, SetComments] = useState(false);
    const [commentBox, SetCommentBox] = useState(false);
    const [initial, setInitial] = useState(true);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [classe, setClasse] = useState();

    const commentss = useSelector(state => state.getComments);
    const counter = useSelector(state => state.addednotification); // c'est ca qui declanche l'ajout de comment socket a ne pas supprimer
    

  useEffect(() => {
    like ? setClasse('Dislike') : setClasse('Like');
    if (initial) {
        setLike(post.is_liked);
    }
    setLikeCount(post.likeCount)
})

const dispatch = useDispatch();
    const likeAAction = () => {
      setLike(!like);
      setInitial(false)
        const dataa = {
            action: "like",
            provider_id: post.id,
            provider: "post",
            type    : like?'dislike':'like',
        }
      setClasse('Dislike');
      dispatch(LikeAction(dataa, 'like/like', ''));        
    }

    const observer = useRef()
    const refcomment = useCallback( node =>{
        SetCommentBox(!commentBox)
        SetComments(!comments)
    }, [observer])

    return (
        
        <div className="fb-comments"  data-width="400" data-numposts="5" data-href="http://sachinchoolur.github.io/lightGallery/demos/comment-box.html#lg=1&slide=0">

            <HeaderSub post = {post} />

            <div className="PostBody-Text">
                <p>{post.body}</p>
            </div>

            <AddComment post = {post} />
        
            <ShowComment  post = {post} />
            
        </div>
    )
}

