import React, { useState } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useForm } from 'react-hooks-helper';
import { useDispatch, useSelector } from 'react-redux';
import { EditTeamAction } from '../../../store/actions/Setting/SettingActions';


export default function TeamMain() { 

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [showmodal, setShowmodal] = useState(false);
    const [formData, setForm] = useForm({teamname:'', description:''});

    const teams = useSelector(state => state.setting.teams);
    const roles = useSelector(state => state.setting.permissions);


    const [value, onChange] = useState(null);

    const Update =(id) =>{
        let data = {
            'url'   : 'team/editTeam',
            'id'    : id,
            'name'  : formData.teamname,
            'description' : formData.description,
          } 
        dispatch(EditTeamAction(data, '', ''));
      }

      const INITIAL_DATA = {
        value: 0,
        label: '',
      };
    
      const [selectData, setselectData] = useState(INITIAL_DATA);
      const mapResponseToValuesAndLabels = (data) => ({
        value: data.id,
        label: data.name,
      });

      async function callApi(value) {

        const _url = 'https://api.dockergateway.test/src/public/api/getusers';
        let _body = JSON.stringify({
            search: value,
        });
        const _headers = {
            'Authorization': localStorage.getItem('user-token'),
            'Content-type': 'application/json; charset=UTF-8',
        };
        const _options = { method: 'POST', headers: _headers, body: _body };

        const data = fetch(_url, _options)
            .then((res) => res.json())
            .then((json) => json.users.data)
            .then((response) => response.map(mapResponseToValuesAndLabels))
            .then((final) =>
                final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
            );
        return data;
      }

      function handleSubmit() {
        setselectData(INITIAL_DATA);
      }
      
      
    return (
        <>  
            <div className="col-md-8 col-lg-12 d-md-none d-lg-block">
              <div className="User-Settings">
                    <div className="Profile-Section">
                    {teams && teams?.map((team, index) => (
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first" key={index}>
                            <Row>
                                <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey={team.id}>{team.name}</Nav.Link>
                                    </Nav.Item>
                                    
                                </Nav>
                                </Col>
                                <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey={team.id}>
                                        <Member team={team} roles={roles}/>
                                    </Tab.Pane>
                                    
                                </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    ))}
{/*                        
                         <button type="button" onClick={handleShow} className="UpdateInfos-BTN" data-toggle="modal" data-target="#ExperienceModal"><i className="uil uil-plus"></i></button>
                        <h3 className="Profile-Section-Title"><i className="uil uil-bag"></i> Teams</h3>
                        <ul className="Section-Items">

                            {teams && teams?.map((team, index) => (
                                <li className="Section-Item" key={index}>
                                    <label>{team.name}</label>
                                    <span>{team.description}</span>
                                    <button type="button" onClick={handledisplay} className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
                                    <div className="CollapsUpdate" style={{display:open?'block':'none'}}>
                                    <form className="" action="index.html" method="post">
                                        <div className="form-inputs">
                                        <div className="form-row">
                                        <div className="row">
 
                                        
                                            <div className="col-md-6 input-row">
                                            <AsyncSelect
                                                isMulti
                                                cacheOptions
                                                loadOptions={callApi}
                                                onChange={(data) => {
                                                setselectData(data);
                                                }}
                                                value={selectData}
                                                defaultOptions
                                            />

                                            <div className="col-md-6 input-row">
                                                <button type="button" onClick={handleSubmit}>
                                                    Send
                                                </button>
                                            </div>

                                            </div>
                                        
                                            <div className="col-md-6 input-row">
                                                <input type="text" onChange={setForm} name="teamname" defaultValue={team.name} placeholder="Team name" className="wizard-required" required/>
                                            </div>
                                            
                                            <div className="col-md-12 input-row">
                                                <textarea name="description" onChange={setForm} placeholder="Description ">{team.description}</textarea>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="DadupaModal-Footer">
                                            <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft"></div>
                                        <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                                            <button type="button" onClick={() => Update(team.id)} className="DadupaModal-BTNSubmit">Update</button>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                </li>
                            ))}

                            <Modal show={showmodal} onHide={handleClose} className="DadupaModal modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <Modale showmodal={showmodal} handleClose={handleClose}/>
                            </Modal>
                       
                        </ul> 
                     */}
                    </div>
                </div>
            </div>
            
        </>
    
           
        
    )
}