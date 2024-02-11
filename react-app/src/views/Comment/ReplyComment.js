import React, { useState} from 'react'
import { useSelector} from "react-redux";

export default function ReplyComment(comment) {

    

    const [body, setBody] = useState();

    const userProfile = useSelector(state => state.userProfile.userProfile);

    //
    // const data = {
    //     idproject   : comment.project.project.id,
    //     action      : "add",
    //     model        : "project",
    //     body        : body,
    // }
    //
    // const dispatch = useDispatch();
    //
    // const handleSubmitValue = (e) => {
    //     e.preventDefault();
    //     dispatch(AddCommentAction(data));
    // }



    return (           
            <div className="Comment-Writing">
                <div className="Comment-Col-2">
                    <div className="Comment-User-Thumb">
                        <img src={userProfile.avatar} alt={userProfile.name}/>
                    </div>
                </div>
                <div className="Comment-Col-10">
                    <div className="Comment-Area">
                        <div className="Comment-Input">
                            <input type="text" name="body"
                                onChange={e => setBody(e.target.value)}
                                placeholder={t('write_comment')}/>
                        </div>
                    </div>
                </div>
            </div>                                                                              
    )
}