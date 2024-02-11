import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelInvitationAction, reSendAction } from '../../../../store/actions/Setting/SettingActions';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import useOutsideClick from '../../../../helpers/useOutsideClick';
import { useTranslation } from 'react-i18next';


export default function Invitations() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const {t} = useTranslation();

    const [options_List, SetOptions_List] = useState(false);
    const showOptions = () => {
        SetOptions_List(!options_List)
    }

    useOutsideClick(ref, () => {
        SetOptions_List(false)
    });

    const sentInvs = useSelector(state => state.setting.sentinvitations);
    const resend = (id) => {
        let data = {
            'url': 'permission/resendinvite',
            'id': id,
        }
        dispatch(reSendAction(data));
    }

    const cancel = (token) => {
        let data = {
            'url': 'permission/cancel',
            'token': token,
        }
        dispatch(cancelInvitationAction(data));
    }

    const accept = (token, route) => {

        // dispatch(AcceptInvitationAction('permission/accept/'+token));
        // setTimeout(() => {
        //    history.push(route);
        //   }, 3000)
    }

    const reject = (token) => {
        // let data = {
        //     'url'   : 'permission/cancel',
        //     'token' : token,
        //   } 
        //   dispatch(cancelInvitationAction(data));
    }

    const menu = (id) => {
        setOpen(id)
    }


    return (
        <>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>To</TableCell>
                            <TableCell align="center">{t('categorie')}</TableCell>
                            <TableCell align="center">{t('link')}</TableCell>
                            <TableCell align="center">{t('role')}</TableCell>
                            <TableCell align="center">{t('date')}</TableCell>
                            <TableCell align="center">{t('action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sentInvs && sentInvs?.map((row) => (
                            <TableRow
                                key={row.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">{row.categorie}</TableCell>
                                <TableCell align="center"><Link to={row.route} >{row.pro_name}</Link></TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                                <TableCell align="center">{row.invite_date}</TableCell>
                                <TableCell align="center">
                                    <div className="custom-btn-table-action" onClick={() => menu(row.id)} >
                                        <button onClick={showOptions} className="Add-New" data-toggle="tooltip" data-placement="bottom"><i className="uil uil-ellipsis-h"></i></button>
                                        {options_List && <div ref={ref} className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                                            <ul className="Mini-Profile-Items">
                                                <li className="Mini-Profile-Item"><a href="#" onClick={() => accept(row.token, row.route)} > {t('request_ligne3_right')}</a></li>
                                                <li className="Mini-Profile-Item"><a href="#" onClick={() => reject(row.deny_token)} > {t('reject')}</a></li>
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
                        <th>To</th>
                        <th>categorie</th>
                        <th>Link</th>
                        <th>Role</th>
                        <th>date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {sentInvs && sentInvs?.map((sent, index) => (
                    <tr key={index} >
                        <td>{sent.email}</td>
                        <td>{sent.categorie}</td>
                        <td><Link to={sent.route} >{sent.pro_name}</Link></td>
                        <td>{sent.role}</td>
                        <td>{sent.invite_date}</td>
                        <td>
                            <div class="New-Post" onClick={menu} >
                                <button class="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i class="uil uil-ellipsis-v"></i></button>
                                {open && <div class="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                                <ul class="Mini-Profile-Items">
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>resend(sent.id)} ><i class="uil uil-message"></i>  Resend</a></li>
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>cancel(sent.deny_token)} ><i class="uil uil-cancel"></i> Cancel</a></li>
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