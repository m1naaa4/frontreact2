import React from 'react'
import MultiStepForm from '../../../views/User/Auth/MultiStepForm'

export default function UserRegister(props) {
    if (localStorage.getItem('user-token')) {
        props.history.push('/project/lists');
    }
    return (
        <div>
           <MultiStepForm props={props}/>
        </div>
    )
}
