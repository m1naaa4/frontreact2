import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector} from 'react-redux';
import { CreateTeamsAction } from '../../../store/actions/Setting/SettingActions';



const  Member = ({ team}) => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
console.log('memberrrrrrrrrrrrrrrrrrrs', team)

    return (  
      <>
        <ul className="Section-Items">

          {team.members && team.members?.map((member, index) => (
              <li className="Section-Item" key={index}>
                  <label>{member.name}</label>
                  <span>{member.avatar}</span>
                  <button type="button"  className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                  <div className="CollapsUpdate" style={{display:open?'block':'none'}}>
                  <form className="" action="index.html" method="post">
                      <div className="form-row">
                          <div className="col-md-6 input-row"></div>
                      
                          <div className="col-md-6 input-row">
                              <input type="text"  name="teamname" defaultValue={member.name} placeholder="Team name" className="wizard-required" required/>
                          </div>
                          
                          <div className="col-md-12 input-row">
                              <textarea name="description"  placeholder="Description ">{member.description}</textarea>
                          </div>
                      </div>
                      <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft"></div>
                        <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                        </div>
                      </div>
                  </form>
                  </div>
              </li>
          ))}

        </ul>  
      </>
    )
}
export default Member;
