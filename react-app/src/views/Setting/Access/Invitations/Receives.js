import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';




export default function Receives() { 
    
    const sentInvs = useSelector(state => state.setting.sentinvitations);
    const gotInvs = useSelector(state => state.setting.receivedinvitations);
    const handleSubmitValue = (e) => {

         
    }


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
                        <td><button>Accept</button><button>Cancel</button></td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    )
}