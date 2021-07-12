import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector } from 'react-redux';



const  SkillsModal = () => {

    

    return (        
      
        <div className="modal-body">
            <form className="" action="index.html" method="post">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-12 input-row">
                    <input type="text" name="project-areas" value="" placeholder="Nom du Skill" className="wizard-required" required/>
                  </div>
                  <div className="col-md-12 input-row input-select input-select-multi">
                    <select className="project-status" name="project-status" required >
                      <option selected disabled>Catégorie</option>
                      <option value="Porteur de projet">Porteur de projet</option>
                      <option value="Bailleurs de fonds">Bailleurs de fonds</option>
                      <option value="Mentor">Mentor</option>
                    </select>
                  </div>
                  <div className="col-md-12 input-row input-select input-select-multi">
                    <select className="project-status" name="project-status" required >
                      <option selected disabled>Niveau</option>
                      <option value="">Amateur</option>
                      <option value="">Avancé</option>
                      <option value="">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft"></div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit">ADD NEW SKILL</button>
                </div>
              </div>
            </form>
          </div>
    )
}
export default SkillsModal;
