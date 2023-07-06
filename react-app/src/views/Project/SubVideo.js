import React, { useEffect } from 'react'
import './Videos/sub.css'

export default function SubVideo({videoUrl}) {

    const settings = `{"source": [{"src" : "${videoUrl}"}], 
        "attributes": {"preload": false, "playsinline": true, "controls": true}}
        `
    ;
    return (
        <a  data-video={settings}
            data-poster="https://dadupadisque.ams3.digitaloceanspaces.com/album/dadupadisque/1617fd897133f1.png"
            data-sub-html='.fb-comments'
        >
            <img width="250" height="200" src={`https://img.youtube.com/vi/${videoUrl}/maxresdefault.jpg`} alt="Video"/>
        </a>
        
    )
}

