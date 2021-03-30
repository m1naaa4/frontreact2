import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';




export default function PostHeader({ post }) {

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

        
        <div className="PostHeader">
          <div className="PostUser-Thumb"><img src={post.avatar} alt="avatar" /></div>
          <div className="PostUser-Details">
            <div className="PostUser-Name">{post.creator_name}</div>
            <div className="PostUser-Time">{post.created_at.date}</div>
          </div>
          <div className="PostOptions">
            <button type="button" className="PostOptions-BTN"><i className="uil uil-ellipsis-h"></i></button>
            <ul className="PostOptions-List">
              <li className="PostFavorite">
                <button><i className="uil uil-favorite"></i> Favorite</button>
              </li>
              <li className="PostKey">
                <button><i className="uil uil-key-skeleton"></i> Historique clé</button>
              </li>
              <li className="PostDelete">
                <button><i className="uil uil-trash-alt"></i> Supprimer</button>
              </li>
            </ul>
          </div>
        </div>
        

    )
}
