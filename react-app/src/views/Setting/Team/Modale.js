import React from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch} from 'react-redux';
import { CreateTeamsAction } from '../../../store/actions/Setting/SettingActions';
import { useTranslation } from 'react-i18next';



const  Modale = ({ showmodal, handleClose}) => {

  const dispatch = useDispatch();
  const {t} = useTranslation();
 


  const [formData, setForm] = useForm({teamname:'', description:''});

    const Add =() =>{
      let data = {
        'url'   : 'team/create',
        'name' : formData.teamname,
        'description' : formData.description,
      } 
        dispatch(CreateTeamsAction(data));
      }

    return (  
      <>
      {
        showmodal &&  

        <div className="modal-body">
            <div className=""  method="post">
              <div className="form-inputs">
                <div className="form-row">
                  <div className="col-md-6 input-row">
                    <input type="text" name="teamname" defaultValue="" placeholder={t('team_name')} className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                  </div>
                  <div className="col-md-12 input-row">
                    <textarea name="description" placeholder={t('description')} onChange={setForm}></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {Add(); handleClose()}}>{t('save')}</button>
                </div>
              </div>
            </div>
          </div>
          }
        </>
    )
}
export default Modale;
