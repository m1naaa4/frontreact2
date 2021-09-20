import React, {useState, useEffect} from 'react'
import { useSelector} from 'react-redux';
import {displayErrorMessages} from '../../../helpers/displayErr'
import ItemForm from "./ItemForm";
import {Text} from "../../../containers/Language";
import $ from "jquery";
import 'jquery-validation'

const RegisterStep1View = ({setForm, formData, navigation , props}) =>{
    const { email, password } = formData;

    useEffect(() => {
        $("#form").validate({
            rules: {
                email: {
                    required: true,
                    email:true,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                },
                password: {
                    required: true,
                    minlength: 6,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                }
            }
        });
    });

    const validateForm = (value, key) => {
        if($("#form").valid()){
            if (key === 13 && value !== '') {
                return navigation.next()
            }else if (value == 'next') {
                return navigation.next()
            }
            
        }
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

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
                        <ItemForm type="email" name="email" value={email} onChange={setForm}  placeholder="E-mail"
                                    className="wizard-required" required/>
                    </div>
                    <div className="input-row">
                        <input onKeyDown={(e) => validateForm(e.target.value, e.keyCode) }  
                                id="password-field" name="password"
                                placeholder="Mot de passe (6 caractères minimum)" className="input-password"
                                type={passwordShown ? "text" : "password"}
                                value={password}
                                onChange={setForm}
                                />
                        <span onClick={TogglePasswordVisiblity}
                                className="uil uil-eye field-icon toggle-password"></span>
                    </div>

                </div>

                <button type="button" name="next" onClick={(e) => validateForm('next')} className="next action-button"><Text tid="next" /></button>
                <div className="form-notice">
                    <Text tid="signup.message3" /> <br/><Text tid="signup.message4" />
                </div>
            </form>
        </fieldset>
    )

}


export default RegisterStep1View;