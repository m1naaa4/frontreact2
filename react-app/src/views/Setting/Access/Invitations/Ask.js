import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AcceptInvitationAction, cancelInvitationAction } from '../../../../store/actions/Setting/SettingActions';
import useOutsideClick from '../../../../helpers/useOutsideClick';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';



export default function Ask() { 
    
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef();
    const [open, setOpen] = useState(false);
    const gotInvs = useSelector(state => state.setting.receivedinvitations);
    const menu = (id) => {
        setOpen(id)
     }
    
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
    });


    return (
        <>
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="table">
                <TableHead>
                <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell align="center">Categorie</TableCell>
                    <TableCell align="center">Link</TableCell>
                    <TableCell align="center">date</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                 {gotInvs && gotInvs?.map((row) => (
                    <TableRow
                    key={row.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.email}
                    </TableCell>
                    <TableCell align="center">{row.categorie}</TableCell>
                    <TableCell align="left"><Link to={row.route} >{row.pro_name}</Link></TableCell>
                    <TableCell align="center">{row.invite_date}</TableCell>
                    <TableCell align="center">
                        <div className="custom-btn-table-action" onClick={()=>menu(row.id)} >
                            <button className="Add-New" data-toggle="tooltip" data-placement="bottom"><i className="uil uil-ellipsis-h"></i></button>
                            {open == row.id && <div ref={ref} className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                            <ul className="Mini-Profile-Items">
                               <li className="Mini-Profile-Item"><a href="#" onClick={()=>accept(row.token, row.route)} > Accept</a></li>
                                <li className="Mini-Profile-Item"><a href="#" onClick={()=>reject(row.deny_token)} > Reject</a></li>
                            </ul>
                            </div>}
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>     
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>categorie</th>
                        <th>Link</th>
                        <th>date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {gotInvs && gotInvs?.map((got, index) => (
                    got.type == 'request' && 
                    <tr key={index} >
                        <td>
                            <span>
                                {got.inviter &&
                                    <Link to={`/profile/${got.inviter.profile_id}`}>
                                        <img style={{width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden'}} 
                                        src={got.inviter.avatar} className="uil uil-apps" alt=''/> {got.inviter.name}
                                    </Link>
                                    
                                }
                            </span></td>
                        <td>{got.categorie}</td>
                        <td><Link to={got.route} >{got.pro_name}</Link></td>
                        <td>{got.invite_date}</td>
                        <td>
                            <div className="New-Post" onClick={()=>menu(got.id)} >
                                <button className="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i className="uil uil-ellipsis-v"></i></button>
                                {open == got.id && <div ref={ref} className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                                <ul className="Mini-Profile-Items">
                                    <li className="Mini-Profile-Item"><a href="#" onClick={()=>accept(got.token, got.route)} ><i className="uil uil-check"></i>  Accept</a></li>
                                    <li className="Mini-Profile-Item"><a href="#" onClick={()=>reject(got.deny_token)} ><i className="uil uil-cancel"></i> Reject</a></li>
                                </ul>
                                </div>}
                            </div>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table> */}
        </>
    )
}