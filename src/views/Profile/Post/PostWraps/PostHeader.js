import React from 'react'
import { Link } from 'react-router-dom'




export default function PostHeader({ post }) {


    return (

        
        <div className="PostHeader">
          <Link className="PostUser-Thumb" to={"/profile/"+ post.profile_id} ><img src={post.avatar} alt="avatar" /></Link>
          <Link className="PostUser-Details" to={"/profile/"+ post.profile_id}>
            <div className="PostUser-Name">{post.creator_name}</div>
            <div className="PostUser-Time">{post.created_at.date}</div>
          </Link>
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
