import React, { useRef, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import { AcceptInvitationAction, cancelInvitationAction } from '../../../../store/actions/Setting/SettingActions';
import useOutsideClick from '../../../../helpers/useOutsideClick';



export default function Receives() { 
    
    const dispatch = useDispatch();
    const history = useHistory();
    const refmessage = useRef(null);
    const ref = useRef();
    const [open, setOpen] = useState(false);
    const menu = (id) => {
        setOpen(id)
     }
    const gotInvs = useSelector(state => state.setting.receivedinvitations);
    const accept = (token, route) => {
        
        dispatch(AcceptInvitationAction('permission/accept/'+token));
        setTimeout(() => {
           history.push(route);
          }, 3000)
    }

    const reject = (token) => {
        let data = {
            'url'   : 'permission/cancel',
            'token' : token,
          } 
          dispatch(cancelInvitationAction(data));
    }

    useOutsideClick(ref, () => {
        setOpen(false)
        console.log(refmessage)
    });


    return (
        <>     
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>categorie</th>
                        <th>Link</th>
                        <th>Role</th>
                        <th>date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {gotInvs && gotInvs?.map((got, index) => (
                    got.type == 'invite' && 
                    <tr key={index} >
                        <td>
                            <span>
                                {got.inviter &&
                                    <Link to={`/profile/${got.inviter.profile_id}`}>
                                        <img style={{width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden'}} 
                                        src={got.inviter.avatar} className="uil uil-apps" alt=''/> {got.inviter.name}
                                    </Link>
                                    
                                }
                            </span>
                        </td>
                        <td>{got.categorie}</td>
                        <td><Link to={got.route} >{got.pro_name}</Link></td>
                        <td>{got.role}</td>
                        <td>{got.invite_date}</td>
                        <td>
                            <div class="New-Post" onClick={()=>menu(got.id)} >
                                <button class="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i class="uil uil-ellipsis-v"></i></button>
                                {open == got.id && <div ref={ref} class="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                                <ul class="Mini-Profile-Items">
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>accept(got.token, got.route)} ><i class="uil uil-check"></i>  Accept</a></li>
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>reject(got.deny_token)} ><i class="uil uil-cancel"></i> Reject</a></li>
                                </ul>
                                </div>}
                            </div>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    )
}