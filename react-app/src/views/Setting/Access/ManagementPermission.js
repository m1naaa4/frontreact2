import React from 'react'




export default function ManagementPermission() { 
    
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
                                <input type="text" className="form-control" id="inputAddress2" placeholder="Role Name"/>
                            </div>
                        </div>
                   </div>
                </div>

                <div className="col-lg-6">
                   <div className="User-Settings">
                        <div className="form-inputs">
                            <div className="User-Settings-Header"><h3>Contents</h3></div>
                            {/* Default unchecked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
                                <label className="custom-control-label" for="defaultUnchecked">Consult project</label>
                            </div>

                            {/* Default checked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultChecked"/>
                                <label className="custom-control-label" for="defaultChecked">Edit project</label>
                            </div>

                            {/* Default indeterminate */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultIndeterminate"/>
                                <label className="custom-control-label" for="defaultIndeterminate">Delete project</label>
                            </div>
                        </div>
                   </div>
                </div>

                <div className="col-lg-6">
                   <div className="User-Settings">
                        <div className="form-inputs">
                        <div className="User-Settings-Header"><h3>Teams</h3></div>
                            {/* Default unchecked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
                                <label className="custom-control-label" for="defaultUnchecked">Add team</label>
                            </div>

                            {/* Default checked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultChecked"/>
                                <label className="custom-control-label" for="defaultChecked">Delete team</label>
                            </div>

                            {/* Default indeterminate */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultIndeterminate"/>
                                <label className="custom-control-label" for="defaultIndeterminate">Edit team</label>
                            </div>
                        </div>
                   </div>
                </div>

                <div className="col-lg-6">
                   <div className="User-Settings">
                        <div className="form-inputs">
                        <div className="User-Settings-Header"><h3>Team Menbers</h3></div>
                            {/* Default unchecked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
                                <label className="custom-control-label" for="defaultUnchecked">Add to member</label>
                            </div>

                            {/* Default checked */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultChecked" />
                                <label className="custom-control-label" for="defaultChecked">Delete from member</label>
                            </div>

                            {/* Default indeterminate */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultIndeterminate" />
                                <label className="custom-control-label" for="defaultIndeterminate">Edit access member team</label>
                            </div>

                            {/* Default unchecked disabled */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUncheckedDisabled" />
                                <label className="custom-control-label" for="defaultUncheckedDisabled">Add permission member</label>
                            </div>

                            {/* Default checked disabled */}
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultCheckedDisabled" />
                                <label className="custom-control-label" for="defaultCheckedDisabled">Remove permission member</label>
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