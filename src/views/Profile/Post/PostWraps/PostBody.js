import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Player from 'video-react/lib/components/Player';




export default function PostBody({ post }) {

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    
    
    useEffect(() => {          
        if (infoprofile.infoprofile.avatar) {             
            setAvatar(infoprofile.infoprofile.avatar)            
            setName(infoprofile.infoprofile.name)            
            setDate(infoprofile.infoprofile.created_at)            
        }     
    })


    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
          {post.body}
          {
            post.media_url? (post.is_video ? (
                <Player width="100%" height="100%"
                    playsInline
                    poster="/assets/poster.png"
                    src={post.media_url}
                />
                ) : (<img width="100%" height="300" src={post.media_url} alt="Project"/>)): ''
          } 
        </div>
    </div>        

    )
}
