import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';



const  ExperienceGrid = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
    return (    
      <>
        <li className="Section-Item">
          <label>2015 - 2016</label>
          <span>Chargé développement Tech Agency - Cameroun</span>
          <button type="button" onClick={handleShow} className="UpdateInfos-BTN CollapseUpdate-BTN"><i className="uil uil-pen"></i></button>
          <div className="CollapsUpdate" style={{display:show?'block':'none'}}>
            <form className="" action="index.html" method="post">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-6 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Date début" className="wizard-required" required/>
                  </div>
                  <div className="col-md-6 input-row input-flex">
                    <input type="text" name="project-areas" value="" placeholder="Date fin" className="wizard-required" required/>
                    <label className="container-checkbox">
                      <input type="checkbox"/>
                      <span className="checkmark"></span>
                      <span>Présent</span>
                    </label>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Entreprise" className="wizard-required" required/>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Poste" className="wizard-required" required/>
                  </div>
                  <div className="col-md-6 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                    <select className="project-status" name="project-status" required >
                      <option selected disabled>Catégorie</option>
                      <option value="Porteur de projet">Porteur de projet</option>
                      <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                      <option value="Mentor">Mentor</option>
                    </select>
                  </div>
                  <div className="col-md-12 input-row">
                    <textarea name="name" placeholder="Description "></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit">Update</button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </>
    )
}
export default ExperienceGrid;
