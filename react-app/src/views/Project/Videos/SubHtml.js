import React from 'react'
import './sub.css'
import Sub from './Sub';
import Player from 'video-react/lib/components/Player';
import YouTube from 'react-youtube';

export default function SubHtml({post}) {

    const opts = {
        height: '300',
        width: '100%',
        // playerVars: {
        //   // https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        // },
      };

    return (
        <a  className="PostBody-Media PostBody-SingleImage" href={post.media_link} data-sub-html='.fb-comments'>
            {
            post.media_link? (post.type === "image" ? 
                <img width="100%" height="300" src={post.media_link} alt="Project"/> : ''): ''
            }
            <div className="fb-comments" style={{display : 'none'}}  data-width="400" data-numposts="5" data-href="http://sachinchoolur.github.io/lightGallery/demos/comment-box.html#lg=1&slide=0">
                <Sub post={post}  />
            </div>
        </a>
    )
}

