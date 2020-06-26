import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {displayErrorMessages} from '../../../helpers/displayErr'
import ItemForm from "./ItemForm";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import {NavLink} from "react-router-dom";
import {Text} from "../../../containers/Language";
import SocialAuth from "./Social/SocialAuth";


const RegisterStep2View = ({setForm, formData, navigation}) => {
    const {name, phone, company, address} = formData;
    const {previous, next} = navigation;

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
                                <fieldset>
                                    <div id="form-signup" className="form-signup">

                                        <h2 className="signup-title">Bienvenue chez Dadupa, <br/>le réseau social des
                                            entrepreneurs</h2>
                                        <ul id="progressbar">
                                            <li className="active done">
                                                <span>1</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                            <li className="active">
                                                <span>2</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                            <li>
                                                <span>3</span>
                                                <i className="uil uil-check"></i>
                                            </li>
                                        </ul>

                                        <div className="form-inputs">

                                            <div className="input-row">
                                                <ItemForm type="text" name="name" value={name} onChange={setForm}
                                                          placeholder="Full name" required/>
                                            </div>

                                            <div className="input-row">
                                                <ItemForm type="tel" name="phone" value={phone} onChange={setForm}
                                                          placeholder="Phone" required/>
                                            </div>

                                            <div className="input-row">
                                                <ItemForm type="text" name="company" value={company} onChange={setForm}
                                                          placeholder="Company name" required/>
                                            </div>

                                            <div className="input-row">
                                                <ItemForm type="text" name="address" value={address} onChange={setForm}
                                                          placeholder="Type your  address" required/>
                                            </div>

                                            <button type="button" name="previous" onClick={previous}
                                                    className="flex-prev-btn previous action-button"
                                            ><Text tid="previous" /></button>
                                            <button type="button" name="next" onClick={next}
                                                    className="flex-next-btn next action-button"><Text tid="next" /></button>

                                        </div>
                                    </div>
                                </fieldset>

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


export default RegisterStep2View;