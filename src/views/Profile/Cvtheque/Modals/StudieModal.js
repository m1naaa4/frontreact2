import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';



const  StudieModal = () => {

    

    return (    

        <div className="modal-body">
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
                    <input type="text" name="project-areas" value="" placeholder="Établissement" className="wizard-required" required/>
                  </div>
                  <div className="col-md-12 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Lieu" className="wizard-required" required/>
                  </div>
                  <div className="col-md-6 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Diplôme obtenu" className="wizard-required" required/>
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
                    <textarea name="name" placeholder="Description"></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit">ADD NEW</button>
                </div>
              </div>
            </form>
          </div>
    )
}
export default StudieModal;
