import React, { useState } from 'react'
import { Link } from 'react-router-dom';



const  Member = ({ team, roles}) => {
  const handledisplay = () => setOpen(!open);
  const [open, setOpen] = useState(false);

    return (  
      <>
        <ul className="Section-Items">

          {team.members && team.members?.map((member, index) => (
              <li className="Section-Item" key={index}>
                <div className="User-Comment">
                  <Link className="PostUser-Thumb" to={"/profile/"+ member.profile_id} >
                      <img src={member.avatar} style={{width:'40px',height:'40px',borderRadius: '4px'}} alt="avatar" /> 
                  </Link>
                  <Link className="PostUser-Details" to={"/profile/"+ member.profile_id}>
                      <div className="PostUser-Name">{member.name}</div>
                      <div className="PostUser-Time">{member.role.name}</div>
                  </Link>
                </div>
                  
                  <button type="button" onClick={handledisplay}  className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                  <div className="CollapsUpdate" style={{display:open?'block':'none'}}>
                  <form className="" action="index.html" method="post">
                      <div className="form-row">
                          <div className="col-md-6 input-row"></div>
                          
                          <div className="col-md-12 input-row">
                            {roles && Object.entries(roles).map(([key, value]) => (
                                <div class="form-check">
                                  <input class="form-check-input" 
                                 
                                  defaultChecked={key==member.role.name ? true : false} type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                  <label class="form-check-label" htmlFor="flexRadioDefault2">
                                      {key}
                                  </label>
                                </div>
                            ))}
                          </div>
                      </div>
                      <div className="DadupaModal-Footer">
                          <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft"></div>
                        <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                            <button type="button" className="DadupaModal-BTNSubmit">{t('update')}</button>
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
