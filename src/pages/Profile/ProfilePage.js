import React from 'react'
import MainProfileView from '../../views/Profile/MainProfileView'
import ProfileHeaderForm from '../../views/Profile/ProfileFormData'

export default function ProfilePage(props) {
    console.log('ProfilePage') 
    return (
        <div>
            <MainProfileView {...props}/>
        </div>
    )
}


