import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {UserLoginAction, clearUserAuthState} from '../../../store/actions/User/Auth/AuthActions'
import ItemForm from "./ItemForm";
import {useFormFields} from '../../../helpers/hooksFormInput'
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import {Text} from "../../../containers/Language";
import SocialLogin from "./Social/SocialLogin";
import $ from "jquery";
import 'jquery-validation';
import { useTranslation } from 'react-i18next';


export default function LoginView(props) {

    const [place, sePlace] = useState();
    const [t, i18n] = useTranslation();



    if (localStorage.getItem('user-token')) {
        props.props.history.push('/project/lists');
    }
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    
    const dispatch = useDispatch();

    const authResponse = useSelector(state => state.userAuth.authResponse);


    useEffect(() => {
            dispatch(clearUserAuthState())
            sePlace(<Text tid="welcomeDescription"/>)

            console.log(place)
        },
    [])

    const handleLogin = (e) => {
        if($("#form-login").valid()){
            dispatch(UserLoginAction(fields, props.props))
        }          
    }

    return (
        <div>
            <HeaderLogo/>

            <div className="Dadupa-Login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8 d-none d-sm-block d-md-none d-lg-block">
                            <div className="page-image">
                                <img src="/assets/images/login-illustration.svg" alt="Dadupa Connect"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="form-wrapper">
                                
                               
                                { authResponse.success === false &&
                                     <div id="authErr" className="alert alert-danger"><Text tid={authResponse.error} /></div>
                                }

                                <form id="form-login" onSubmit={e => {e.preventDefault();handleLogin(e)}} className="form-login">
                                    <h3 className="form-title"><Text tid="welcomeDescription" />!</h3>
                                    <div className="form-inputs">
                                        <div className="input-row">
                                            <ItemForm type="email" name="email" value={fields.email}
                                              onChange={handleFieldChange}
                                              placeholder="Type your email addresse"
                                              margin="normal"
                                              variant="outlined"
                                              id="email"
                                              className="wizard-required" 
                                              required/>
                                        </div>
                                        <div className="input-row">
                                            <ItemForm  id="password" name="password"
                                               placeholder={t('password')}
                                               className="input-password"
                                               type={passwordShown ? "text" : "password"}
                                               onChange={handleFieldChange}
                                               required/>
                                                <span toggle="#password-field" onClick={TogglePasswordVisiblity}
                                                      className="uil uil-eye field-icon toggle-password"></span>
                                        </div>
                                    </div>
                                    <div className="login-options">
                                        <div className="remember-me">
                                            <label className="container-checkbox">
                                                <input type="checkbox"/>
                                                    <span className="checkmark"></span>
                                                    <span> value={t('remember_me')}</span>
                                            </label>
                                        </div>
                                        <div className="forgot-password"><a href="#!"><Text tid="forget_password" /></a></div>
                                    </div>
                                    <div className="form-submit">
                                        <button type="submit"  name="submit"> {t('login')} </button>
                                    </div>
                                </form>

                                <SocialLogin props={props.props} />
                                <div className="login-link">
                                    <span><Text tid="q_register" /></span>
                                    <NavLink to="/register"><Text tid="register" /></NavLink>
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
