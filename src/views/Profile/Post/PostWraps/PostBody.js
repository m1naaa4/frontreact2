import React from 'react'
import Player from 'video-react/lib/components/Player';




export default function PostBody({ post }) {    

    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
          {post.body}
          {
            post.media_link? (post.is_video ? (
                <Player width="100%" height="100%"
                    playsInline
                    poster="/assets/poster.png"
                    src={post.media_link}
                />
                ) : (<img width="100%" height="300" src={post.media_link} alt="Project"/>)): ''
          } 
        </div>
    </div>        

    )
}
