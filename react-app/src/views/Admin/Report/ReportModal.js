import React, { useEffect, useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector} from 'react-redux';
import { SendReportAction } from '../../../store/actions/Admin/ReportActions';
import { toast } from 'react-toastify';


const  ReportModal = ({providerObject, provider, showReport, handleCloseReport}) => {

  const report = useSelector(state => state.reportsData);
    const dispatch = useDispatch();
    const [open, SetOpen] = useState(false);
    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast("Report sent successfully, thank you for your collaboration ");

    const problems = [
        ['stole_idea','Stole idea'],
        ['nudity','Nudity'],
        ['violence','Violence'],
        ['spam','Spam'],
        ['hate_speech','Hate speech'],
        ['false_information','False information'],
        ['something_else','Something else']
    ];


    const [formData, setForm] = useForm({priority:'', problem:'', description:''});

    const sendReport = () => {
      const data = {
        url         : 'report/add',
        provider_id : providerObject.id,
        provider    : provider,
        priority    : formData.priority,
        problem     : formData.problem,
        description : formData.description
      }
      dispatch(SendReportAction(data));
      notify()
    }
    useEffect(() => {
      toast.dismiss(toastId.current);
    },[report])
    
    const display = (key) => {
      if (key === 'something_else') {
        SetOpen(true)
      }else{
        SetOpen(false)
      }
      formData.problem = key;
    }

    return (  
      <>
      {
        showReport &&  

        <div className="modal-body">
            <div className=""  method="post">
              <div className="form-inputs">
                <div className="form-row">
                <h3>Please select a problem</h3>
                  <p>If someone is in immediate danger, get help before reporting to Dadupa connect. Don't wait</p>
                  <br/>
{/* <div className="col-md-12 input-row">
                    <input type="text" name="etablissement" defaultValue="" placeholder="Établissement" className="wizard-required" onChange={setForm} required/>
                  </div> */}
                  <div className="Send-Message col-md-12 input-row input-select">
                      <select className="CreatePost-AddTag" name="priority" onChange={setForm}>
                          <option disabled selected>Choose report level</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                      </select>
                  </div>

                  <div className="col-md-12 input-row">
                    {problems.map(([key, value]) => (
                        <div className="form-check">
                          <input className="form-check-input"
                            type="radio" name="problem" onClick={()=>display(key)} id="flexRadioDefault2"/>
                          <label className="form-check-label" htmlFor={key}>
                            {value}
                          </label>
                        </div>
                    ))}
                  </div>
                  {open &&
                  <div className="col-md-12 input-row">
                    <textarea name="description" placeholder="Description" onChange={setForm}></textarea>
                  </div>
                  }
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {sendReport(); handleCloseReport()}}>SEND</button>
                </div>
              </div>
            </div>
          </div>
          }
        </>
    )
}
export default ReportModal;
