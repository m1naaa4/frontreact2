import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';




export default function AddPostView() {

    const [avatar, setAvatar] = useState();
    const infoprofile = useSelector(state => state.infoProfile);
    const avataro = useSelector(state => state.fileuploaded);
    console.log('avattttttttttttttttttttttttttttt',avataro.url)
    
    useEffect(() => {        
        if (infoprofile.infoprofile.avatar) {
            setAvatar(infoprofile.infoprofile.avatar)
        }
    })


    return (
        <>
        {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
                <div className="WritePost">
                    <div className="WritePost-Area">
                        <div className="WritePost-UserThumb"><img src={avatar} alt="avatar" /></div>
                        {/* <!-- <button type="button" className="UpdateInfos-BTN" ><i className="uil uil-pen"></i></button> --> */}
                        <textarea className="WritePost-TextArea js-elasticArea" data-toggle="modal" data-target="#CreatePost-Modal" name="name" placeholder="Write something"></textarea>
                    </div>
                    <div className="WritePost-Options">
                        <button type="button" name="button"><i className="uil uil-camera"></i> Photo/Video</button>
                        <button type="button" name="button"><i className="uil uil-tag-alt"></i> Tag Friends</button>
                    </div>
                
                </div> 
            :
            infoprofile.success === false ?
            infoprofile.message: <span/>
        }
        </>
    )
}
