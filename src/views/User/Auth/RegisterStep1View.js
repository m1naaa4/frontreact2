import React, {useState} from 'react'
import { useSelector} from 'react-redux';
import {displayErrorMessages} from '../../../helpers/displayErr'
import TypeDrop from "../Fields/Signup/TypeDrop";
import ItemForm from "./ItemForm";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import {Text} from "../../../containers/Language";
import SocialAuth from "./Social/SocialAuth";


const RegisterStep1View = ({setForm, formData, navigation ,}) =>{
    const { type, email  } = formData;

    const {  next } = navigation;

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
                                    <h2 className="signup-title">Bienvenue chez Dadupa, <br/>le réseau social des entrepreneurs</h2>
                                    <ul id="progressbar">
                                        <li className="active">
                                            <span>1</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                        <li>
                                            <span>2</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                        <li>
                                            <span>3</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                    </ul>
                                    <fieldset>
                                        <div className="form-inputs">
                                            <TypeDrop  name="type" value={type} onChange={setForm}/>
                                            <div className="input-row">
                                                <ItemForm type="email" name="email" value={email} onChange={setForm}  placeholder="Type your email addresse"
                                                          className="wizard-required" required/>
                                            </div>
                                            <div className="input-row">
                                                <input  id="password-field" name="password"
                                                       placeholder="Type your Password" className="input-password"
                                                       type={passwordShown ? "text" : "password"}
                                                        onChange={setForm}
                                                       required/>
                                                <span onClick={TogglePasswordVisiblity}
                                                      className="uil uil-eye field-icon toggle-password"></span>
                                            </div>

                                        </div>

                                        <button type="button" name="next" onClick={next} className="next action-button"><Text tid="next" /></button>
                                        <div className="form-notice">By signing up, I agree to Dadupa Connect <br/>Privacy Policy and
                                            Terms of Services.
                                        </div>
                                    </fieldset>

                                </div>
                                <SocialAuth/>

                                <div id="authErr"></div>

                                <div id="authResponse">

                                    {
                                        /**
                                         * if authResponse.success is true show success message
                                         */
                                        authResponse != "" && authResponse.success === true ?
                                            successMessage(authResponse.message)
                                            /**
                                             * else if authResponse.success == false show error messages
                                             */
                                            :
                                            authResponse.success === false ?
                                                displayErrorMessages(authResponse.error, document.getElementById('authErr'))
                                                : authResponse

                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )

}


export default RegisterStep1View;