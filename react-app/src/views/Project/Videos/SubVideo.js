import React, { useEffect } from 'react'
import './sub.css'
import Sub from './Sub';

export default function SubVideo({post}) {

    const settings = `{"source": [{"src" : "${post.media_link}", "type":"video/mp4"}], 
        "attributes": {"preload": false, "playsinline": true, "controls": true}}
        `
    ;
    return (
        <a  data-video={settings}
            data-poster="https://dadupadisque.ams3.digitaloceanspaces.com/album/dadupadisque/1617fd897133f1.png"
            data-sub-html='.fb-comments'
        >
            <img width="100%" height="300" src={`https://img.youtube.com/vi/${post.media_link}/maxresdefault.jpg`} alt="Video"/>
            <Sub post={post}  />
        </a>
        
    )
}

