import React, { useEffect, useState } from 'react'
import { useForm } from "react-hooks-helper";
import { useDispatch, useSelector} from 'react-redux';
import { GiveAccessAction, RolesAction } from '../../../store/actions/Setting/SettingActions';
import AsyncCreatableSelect from 'react-select/async-creatable';



const  Modale = ({ showmodal, datatype, handleClose}) => {

  const dispatch = useDispatch();
  const roles = useSelector(state => state.setting.roles);
 
    const [formData, setForm] = useForm({user_id:'', role:'viewer', description:''});

    useEffect(()=>{
      dispatch(RolesAction('permission/getroles'));
    },[])

    const [selectData, setselectData] = useState();
    const mapResponseToValuesAndLabels = (data) => ({
        value: data.email,
        label: data.profile.username+'',
    });

    async function callApi(value) {

      const _url = `${process.env.REACT_APP_API_URL}`+'/user/getusers';
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

     const Add =() =>{
        setselectData();
        let data = {
          'url'   : 'permission/giveaccess',
          'invite_user_id' : selectData,
          'role' : formData.role,
          'description' : formData.description,
          'type' : datatype.type,
          'content_id' : datatype.content_id,
          'provider' : datatype.provider,
        } 
        dispatch(GiveAccessAction(data));
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
                  <AsyncCreatableSelect
                        isMulti
                        cacheOptions
                        loadOptions={callApi}
                        placeholder="Search for a user"
                        onChange={(data) => {
                        setselectData(data);
                        }}
                        value={selectData}
                        defaultOptions
                    />
                  </div>
                  <div className="col-md-6 input-row input-select input-select-multi">
                  
                  </div>
                  <div className="col-md-12 input-row">
                    {roles && roles.map((role, index) => (
                        <div className="form-check" key={index}>
                          <input className="form-check-input" type="radio" onChange={setForm} name="role" id={index}
                           value={role.name} defaultChecked={role.name == 'viewer' ? true : false}
                           />
                          <label className="form-check-label" htmlFor={index}>
                            {role.name}
                          </label>
                        </div>                        
                    ))}
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
