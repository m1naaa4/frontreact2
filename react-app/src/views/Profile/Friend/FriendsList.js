import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendsAction } from "../../../store/actions/Friend/FriendsAction";
import FriendGrid from "./FriendGrid";
import { useParams } from 'react-router'
import DropType from "../../../utils/DropType";
import typeusers from "../../../data/typeusers"
import { useForm } from "react-hooks-helper";


export default function(){

    const defaultData = {search  : '', type    : null};
    const [filterInput, setFilterInput] = useForm(defaultData);
    const { type, search } = filterInput;
    const [order, setOrder] =   useState(true);
    const [orderName, setOrderName] =  useState('Desc');

    const orderfun = () => {
        setOrder(!order)
        order  ? setOrderName('Desc') : setOrderName('Asc')
    }

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let data = {
            'url'   : 'friend/getFriends',
            'user_profile_id' : params.id,
            'search'  : filterInput.search,
            'type'  : filterInput.type,
            'sort' : orderName,
        }
        const timeoutId = setTimeout(() => dispatch(FriendsAction(data)), 1000);
        return () => clearTimeout(timeoutId);
    },[filterInput, order]);

    const friends = useSelector(state => state.userProfile.friends);
    const count = useSelector(state => state.userProfile.count);

    return(
        <>
                <div className="col-md-6">
                    <div className="Center-Side">
                        <div className="Network-Header">
                            <div className="Network-HeaderLeft">
                            <h2 className="Network-HeaderTitle"><span>{count}</span> Contacts</h2>
                            </div>
                            <div className="Network-HeaderRight">
                            <a className="Network-HeaderLink" href="#">Voir les invitations</a>
                            <a className="Network-HeaderLink" href="#">Voir les suggestions</a>
                            </div>
                        </div>
                        
                        <div className="Network-Filter Filter-Row">
                            <form className="Filter-Form" action="#" method="post">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="display-flex">
                                        <div className="input-row input-select input-small">
                                            <DropType datas={typeusers} value={type} field='type' onChange={setFilterInput}/>
                                        </div>
                                        <div className="input-row">
                                        <input type="text" name="search" defaultValue={search} placeholder="Rechercher un Contact" onChange={setFilterInput} required/>
                                        </div>
                                        <div className="input-row">
                                        <button type="button" onClick={orderfun} className="OrderAlph">Ordre Alphabétique {orderName}</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </form>
                        </div>
            
                        <div className="Networks">

                            { friends &&
                                friends?.map((friend, index) => (
                                <FriendGrid friend={friend} key={index}/>
                                ))
                            }
                        
                        </div>
                    </div>
                </div>
        </>
    )
}