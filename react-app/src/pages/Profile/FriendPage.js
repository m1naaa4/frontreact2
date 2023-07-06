import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { ProfileAction } from '../../store/actions/Profile/UserActions'
import FriendsList from '../../views/Profile/Friend/FriendsList'
import $ from "jquery";
import { useForm } from 'react-hooks-helper'

export default function FriendPage(props) {

    const dispatch = useDispatch();
    const params = useParams();
    const defaultData = {search  : '', type    : null, orderName : 'Desc'};
    const [filterInput, setFilterInput] = useForm(defaultData);

    const data = { filterInput, setFilterInput, props}
    
    return (   
        <FriendsList {...data}/>              
    )
}


