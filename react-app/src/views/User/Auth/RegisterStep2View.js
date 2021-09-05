import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {displayErrorMessages} from '../../../helpers/displayErr'
import ItemForm from "./ItemForm";
import {Text} from "../../../containers/Language";
import TypeDrop from "../Fields/Signup/TypeDrop";
import $ from "jquery";
import 'jquery-validation'
import ZoneDropFilter from '../Fields/Filter/Project/ZoneDropFilter';


const RegisterStep2View = ({setForm, formData, navigation}) => {
    const {firstName, lastName, type, phone, country, city, username} = formData;
    const {previous, next} = navigation;

    const validateForm = () => {
        if($("#form").valid()){
            return navigation.next()
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
                        <ItemForm type="text" name="firstName" value={firstName} onChange={setForm}
                                placeholder="Nom" required/>
                    </div>
                    <div className="input-row">
                        <ItemForm type="text" name="lastName" value={lastName} onChange={setForm}
                                placeholder="Prenom" required/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="text" name="username" value={username} onChange={setForm}
                                placeholder="username" required/>
                    </div>

                    <TypeDrop  name="type" value={type} onChange={setForm}/>

                    <div className="input-row">
                        <ItemForm type="tel" name="phone" value={phone} onChange={setForm}
                                placeholder="Numéro de téléphone" required/>
                    </div>

                    <div className="input-row">
                        <ZoneDropFilter field='country' placeholder="Pays" value={country} onChange={setForm}
                            required/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="text" name="city" value={city} onChange={setForm}
                                placeholder="Ville" required/>
                    </div>

                    <button type="button" name="previous" onClick={previous}
                            className="flex-prev-btn previous action-button"
                    ><Text tid="previous" /></button>
                    <button type="button" name="next" onClick={validateForm}
                            className="flex-next-btn next action-button"><Text tid="next" /></button>
                </div>
            </form>
        </fieldset>
    )

}


export default RegisterStep2View;