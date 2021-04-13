import React from "react";
import {signUpAction} from "../../../store/actions/User/Auth/AuthActions";
import {useDispatch} from "react-redux";
import {Text} from "../../../containers/Language";


const Submit = ({setForm, formData, navigation, props}) => {
    const { email, password, firstName, lastName, type, phone, city } = formData;
    const {go} = navigation;

    const UserRegister = (e) => {
        e.preventDefault();

        clearAuthErrDiv();

        dispatch(signUpAction(formData, props));
    }

    const dispatch = useDispatch();

    const clearAuthErrDiv = () => {
        let authErr = document.querySelector("#authErr");
        authErr.innerHTML = "";
    }
    return (
        <fieldset>
            <div className="form-inputs">
                <div className="signup-review">
                    <div className="step-field">
                        <div className="step-title">
                            <Text tid="step" /> 1
                        </div>
                        <div className="step-edit">
                            <button type="button" name="button" onClick={() => go("registerstep1")}><Text tid="edit" /></button>
                        </div>
                        <div className="step-details">
                            <div className="step-row">
                                <div className="step-label"><Text tid="email" /></div>
                                <div className="step-value">{`${email}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label"><Text tid="password" /></div>
                                <div className="step-value">{`${password}`}</div>
                            </div>
                        </div>
                    </div>
                    <div className="step-field">
                        <div className="step-title">
                            <Text tid="step" /> 2
                        </div>
                        <div className="step-edit">
                            <button type="button" name="button" onClick={() => go("registerstep2")}><Text tid="edit" /></button>
                        </div>
                        <div className="step-details">
                            <div className="step-row">
                                <div className="step-label"><Text tid="firstName" /></div>
                                <div className="step-value">{`${firstName}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label"><Text tid="lastName" /></div>
                                <div className="step-value">{`${lastName}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label"><Text tid="type" /></div>
                                <div className="step-value">{`${type}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label"><Text tid="phone" /></div>
                                <div className="step-value">{` ${phone}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label"><Text tid="city" /></div>
                                <div className="step-value">{`${city}`}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" name="submit" className="submit action-button" onClick={UserRegister}
                    value="Sign Up"><Text tid="register" /></button>
        </fieldset>

    );
};

export default Submit;
