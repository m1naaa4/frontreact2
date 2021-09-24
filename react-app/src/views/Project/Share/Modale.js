import React, { useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch} from 'react-redux';
import AsyncSelect from 'react-select/async';



const  Modale = ({ showmodal, handleClose}) => {

  const dispatch = useDispatch();
 


  const [formData, setForm] = useForm({teamname:'', description:''});

    const Add =() =>{
      let data = {
        'url'   : 'team/create',
        'name' : formData.teamname,
        'description' : formData.description,
      } 
        // dispatch(CreateTeamsAction(data));
      }


      const INITIAL_DATA = {
        value: 0,
        label: '',
      };
    
      const [selectData, setselectData] = useState(INITIAL_DATA);
      const mapResponseToValuesAndLabels = (data) => ({
        value: data.id,
        label: data.name + 'e',
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
        console.log(selectData);
        setselectData(INITIAL_DATA);
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
                    <input type="text" name="teamname" defaultValue="" placeholder="Team name" className="wizard-required" onChange={setForm} required/>
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                  </div>
                  <div className="col-md-12 input-row">
                    <textarea name="description" placeholder="Description" onChange={setForm}></textarea>
                  </div>
                </div>
              </div>
              <div className="DadupaModal-Footer">
                <div className="DadupaModal-FooterCol DadupaModal-FooterColLeft">
                </div>
                <div className="DadupaModal-FooterCol DadupaModal-FooterColRight">
                  <button type="button" className="DadupaModal-BTNSubmit" onClick={() => {Add(); handleClose()}}>Save</button>
                </div>
              </div>
            </div>
          </div>
          }
        </>
    )
}
export default Modale;
