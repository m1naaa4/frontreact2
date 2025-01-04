import React, {useState, useEffect} from 'react'
import { useSelector} from 'react-redux';
import ItemForm from "./ItemForm";
import $ from "jquery";
import 'jquery-validation'
import { useTranslation } from 'react-i18next';

const RegisterStep1View = ({setForm, formData, navigation , props}) =>{
    const { email, password } = formData;
    const [t] = useTranslation();

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
                    minlength: 12,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    validatePassword: true
                }
            },
            messages: {
                password: {
                    required: "Password is required.",
                    minlength: "Password must be at least 12 characters long.",
                }
            }
        });

        // Define custom validation rule
        $.validator.addMethod("validatePassword", function (value, element) {
            const errors = [];
            if (!/[A-Z]/.test(value)) {
                errors.push("an uppercase letter");
            }
            if (!/[a-z]/.test(value)) {
                errors.push("a lowercase letter");
            }
            if (!/\d/.test(value)) {
                errors.push("a number");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                errors.push("a special character");
            }

            // If any condition is missing, show error
            if (errors.length > 0) {
                $.validator.messages.validatePassword = `The password must contain at least ${errors.join(", ")}.`;
                return false;
            }
            return true;
        }, "");
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
                        <ItemForm type="email" name="email" value={email} onChange={setForm}  placeholder={t('email')}
                                    className="wizard-required" required/>
                    </div>
                    <div className="input-row">
                        <input onKeyDown={(e) => validateForm(e.target.value, e.keyCode) }  
                                id="password-field" name="password"
                                placeholder={t('password.8caracteresminimum')} className="input-password"
                                type={passwordShown ? "text" : "password"}
                                value={password}
                                onChange={setForm}
                                />
                        <span onClick={TogglePasswordVisiblity}
                                className="uil uil-eye field-icon toggle-password"></span>
                    </div>

                </div>

                <button type="button" name="next" onClick={(e) => validateForm('next')} className="next action-button">{t('next')}</button>
                <div className="form-notice">
                    <center>{t('signup.message3')} <br/>{t('signup.message4')}</center>
                    
                </div>
            </form>
        </fieldset>
    )

}


export default RegisterStep1View;