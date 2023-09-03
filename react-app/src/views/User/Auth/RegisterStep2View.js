import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {displayErrorMessages} from '../../../helpers/displayErr'
import ItemForm from "./ItemForm";
import {Text} from "../../../containers/Language";
import TypeDrop from "../Fields/Signup/TypeDrop";
import $ from "jquery";
import 'jquery-validation'
import Zonedropfilter from '../Fields/Signup/Zonedropfilter';


const RegisterStep2View = ({setForm, formData, navigation}) => {
    const {firstName, lastName, type, phone, country, city, username} = formData;
    const {previous, next} = navigation;

    const validateForm = (value, key) => {
        if($("#form").valid()){
            if (key === 13 && value !== '') {
                return navigation.next()
            }else if (value == 'next') {
                return navigation.next()
            }
        }
    }


    const authResponse = useSelector(state => state.userAuth.authResponse);

    const successMessage = (successMessage) => {
        return <div dangerouslySetInnerHTML=
                        {{__html: '<div class="alert alert-success add-padding">' + ' ' + successMessage + '</div>'}}
        />
    }

    return (
        <fieldset>
            <form id="form">
                <div className="form-inputs">
                    <div className="input-row">
                        <ItemForm type="text" name="firstName" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={firstName} onChange={setForm}
                                placeholder="Nom" required/>
                    </div>
                    <div className="input-row">
                        <ItemForm type="text" name="lastName" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={lastName} onChange={setForm}
                                placeholder="Prenom" required/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="text" name="username" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) }  value={username} onChange={setForm}
                                placeholder="username"/>
                    </div>

                    <TypeDrop  name="type" value={type} onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } onChange={setForm}/>

                    <div className="input-row">
                        <ItemForm type="tel" name="phone" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={phone} onChange={setForm}
                                placeholder="Numéro de téléphone"/>
                    </div>

                    <div className="input-row">
                        {/* <ZoneDropFilter field='country' name="country" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } placeholder="Pays" value={country} onChange={setForm}
                            required/> */}
                           <Zonedropfilter formData={formData}/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="text" name="city" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={city} onChange={setForm}
                                placeholder="Ville" required/>
                    </div>

                    <button type="button" name="previous" onClick={previous}
                            className="flex-prev-btn previous action-button"
                    ><Text tid="previous" /></button>
                    <button type="button" name="next" onClick={(e) => validateForm('next')}
                            className="flex-next-btn next action-button"><Text tid="next" /></button>
                </div>
            </form>
        </fieldset>
    )

}


export default RegisterStep2View;