import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hooks-helper";
import { useDispatch } from 'react-redux';



const  UpdateUserInfo = ({ showInfo, handleCloseInfo}) => {
    const dispatch = useDispatch();

    const [datedebut, setDatedebut] = useState(new Date());

    const [formData, setForm] = useForm({name:'', categorie:'', level:''});

    const data = {
        skills : {name : formData.name,
        category : formData.category,
        level : formData.level}
    }

    const updateInfo =(id) =>{
        // dispatch(CvAction(data, '', ''));
      }
    
    return (  
      <>
      {
     showInfo &&
        <div className="ModalUpdate-Content modal-content">
          <div className="User-Settings">
            <div className="form-inputs">
                <div className="User-Settings-Header">
                <h3>Updating Mon compte</h3>
                </div>
                <div className="form-row">
                <div className="col-md-6 input-row">
                    <input type="text" name="first-name" value="" placeholder="Nom" className="wizard-required" required />
                </div>
                <div className="col-md-6 input-row">
                    <input type="text" name="last-name" value="" placeholder="Prénom" className="wizard-required" required />
                </div>
                <div className="col-md-12 input-row">
                    <input type="text" name="last-name" value="" placeholder="Identifiant unique" className="wizard-required" required />
                </div>
                <div className="col-md-12 input-row">
                    <div id="datepicker" className="date" data-date-format="dd-mm-yyyy">
                        <ReactDatePicker className="wizard-required" selected={datedebut} onChange={(date) => setDatedebut(date)} />
                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                    </div>
                </div>
                <div className="col-md-12 input-row">
                    <input type="text" name="last-name" value="" placeholder="Pays" className="wizard-required" required />
                </div>

                <div className="User-Settings-Footer">
                    <button type="submit" className="DadupaModal-BTNSubmit" name="submit" onClick={() => {updateInfo(); handleCloseInfo()}}>Update</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      }
      </>
    )
}
export default UpdateUserInfo;
