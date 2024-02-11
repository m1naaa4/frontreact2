import React from 'react'
import FriendsList from '../../views/Profile/Friend/FriendsList'

export default function FriendPage(props) {

    const data = {props}
    
    return (   
        <FriendsList {...data}/>
    )
}


