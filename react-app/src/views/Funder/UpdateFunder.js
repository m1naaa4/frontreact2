import React, { useEffect, useState} from 'react'
import MultiStepProjectFormFunder from './MultiStepProjectForm';
import {useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {GetFunder} from "../../store/actions/Funder/FunderActions";

export default function UpdateFunder(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const data_to_update =  useSelector(state => state.funders.data);

    const update = {"is_update_action": true};
    const newProps = {...props, ...update}

    useEffect(()=>{
        if(props.is_update_action !== undefined && props.is_update_action === true){
            dispatch(GetFunder(params.id, props));
        }    
    },[])


    return (
        <div>
            <MultiStepProjectFormFunder {...newProps}/>
        </div>
    )
}


