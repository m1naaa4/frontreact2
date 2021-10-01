import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';




export default function ManagementInvitationToAccess() { 
    
    const sentInvs = useSelector(state => state.setting.sentinvitations);
    const gotInvs = useSelector(state => state.setting.receivedinvitations);
    const handleSubmitValue = (e) => {

         
    }


    return (
        <>  
        
        <div className="col-md-12 ">
            <div className="row">

                <div className="col-lg-12">
                   <div className="User-Settings">
                        <div className="form-inputs">
                            <div className="form-group">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>categorie</th>
                                        <th>Project</th>
                                        <th>date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {sentInvs && sentInvs?.map((sent, index) => (
                                    <tr key={index} >
                                        <td>{sent.f_name}</td>
                                        <td>{sent.pro_type}</td>
                                        <td>{sent.pro_name}</td>
                                        <td>{sent.invite_date}</td>
                                        <td><button>accept</button><button>cancel</button></td>
                                    </tr>
                                    ))}
                                   
                                </tbody>
                            </Table>
                            </div>
                        </div>
                   </div>
                </div>

                <div className="col-md-12 col-lg-12">
                <div style={{position: 'relative'}}>
                <fieldset className="wizard-fieldset">
                    <button type="button" onClick={(event) => { handleSubmitValue(event);}} name="next" className="next action-button">
                        Save
                    </button>
                </fieldset>
                </div>
                </div>
            </div>
        </div>


              
            
        </>
    
           
        
    )
}