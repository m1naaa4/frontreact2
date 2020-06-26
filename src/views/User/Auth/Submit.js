import React from "react";
import {signUpAction} from "../../../store/actions/User/Auth/AuthActions";
import {useDispatch} from "react-redux";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import {Text} from "../../../containers/Language";
import SocialAuth from "./Social/SocialAuth";


const Submit = ({setForm, formData, navigation, props}) => {
    const { name, email, address, company, password, type, phone } = formData;
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
        <div>
            <HeaderLogo/>
            <div className="Dadupa-Signup">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8 d-none d-sm-block d-md-none d-lg-block">
                            <div className="page-image">
                                <img src="/assets/images/signup-illustration.svg" alt="Dadupa Connect"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="form-wrapper">
                                <div id="form-signup" className="form-signup">
                                    <fieldset>
                                        <h2 className="signup-title">Bienvenue chez Dadupa, <br/>le réseau social des
                                            entrepreneurs</h2>
                                        <ul id="progressbar">
                                            <li className="active done">
                                                <span>1</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                            <li className="active done">
                                                <span>2</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                            <li className="active">
                                                <span>3</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                        </ul>

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
                                                            <div className="step-label"><Text tid="type" /></div>
                                                            <div className="step-value">{`${type}`}</div>
                                                        </div>
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
                                                            <div className="step-label"><Text tid="name" /></div>
                                                            <div className="step-value">{`${name}`}</div>
                                                        </div>
                                                        <div className="step-row">
                                                            <div className="step-label"><Text tid="phone" /></div>
                                                            <div className="step-value">{` ${phone}`}</div>
                                                        </div>
                                                        <div className="step-row">
                                                            <div className="step-label"><Text tid="company" /></div>
                                                            <div className="step-value">{` ${company}`}</div>
                                                        </div>
                                                        <div className="step-row">
                                                            <div className="step-label"><Text tid="address" /></div>
                                                            <div className="step-value">{`${address}`}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" name="submit" className="submit action-button" onClick={UserRegister}
                                                value="Sign Up"><Text tid="register" /></button>

                                        <div id="authErr"></div>
                                        <div className="form-inputs">
                                            <div className="form-notice">
                                                Publier maintenant un projet d’entreprise ?
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <SocialAuth/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default Submit;