import React from 'react'
import './sub.css'
import Sub from './Sub';

export default function SubYoutube({post}) {

    return (
        <a  className="PostBody-Media PostBody-SingleImage" href={post.media_link} 
            data-pinterest-text="Pin it3" data-tweet-text="lightGallery slide  4" 
            data-src={`//www.youtube.com/watch?v=${post.media_link}`}
            data-poster={`https://img.youtube.com/vi/${post.media_link}/maxresdefault.jpg`} 
            data-sub-html='.fb-comments'>
            <img width="100%" height="300" src={`https://img.youtube.com/vi/${post.media_link}/maxresdefault.jpg`} alt="Youtube"/>
            <Sub post={post}  />
        </a>
    )
}

