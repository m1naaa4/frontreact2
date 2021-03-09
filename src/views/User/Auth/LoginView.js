import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {UserLoginAction, clearUserAuthState} from '../../../store/actions/User/Auth/AuthActions'
import ItemForm from "./ItemForm";
import {useFormFields} from '../../../helpers/hooksFormInput'
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import {Text} from "../../../containers/Language";
import {displayErrorMessages} from '../../../helpers/displayErr';
import SocialLogin from "./Social/SocialLogin";



export default function LoginView(props) {

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
        },
        [])

    const UserLogin = (e) => {
        e.preventDefault();

        clearAuthErrDiv();

        dispatch(UserLoginAction(fields, props.props))

    }

    const clearAuthErrDiv = () => {
        let authErr = document.querySelector("#authErr");
        authErr.innerHTML = "";
    }

    const successMessage = (successMessage) => {
        return <div dangerouslySetInnerHTML=
                 {{__html: '<div class="alert alert-success add-padding">' + ' ' + successMessage + '</div>'}}
        />
    }

    const [clickText, setClickText] = useState();

    const handleClick = () => {
        setClickText(<Text tid="buttonClicked" />);
    }


    return (
        <div>
            <div id="authErr"></div>

            <div id="authResponse" >

                {
                    /**
                     * if authResponse.success is true show success message
                     */
                    authResponse !== "" && authResponse.success === true ?
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

                                <form onSubmit={UserLogin} id="form-login" className="form-login">
                                    <h3 className="form-title"><Text tid="welcomeDescription" />!</h3>
                                    <div className="form-inputs">
                                        <div className="input-row">
                                            <ItemForm type="email" name="email" value={fields.email}
                                              onChange={handleFieldChange}
                                              placeholder="Type your email addresse"
                                              margin="normal"
                                              variant="outlined"
                                              id="email"
                                              required/>
                                        </div>
                                        <div className="input-row">
                                            <ItemForm  id="password" name="password"
                                               placeholder="Type your Password"
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
                                                    <span>Remember me</span>
                                            </label>
                                        </div>
                                        <div className="forgot-password"><a href="#!">Forgot password?</a></div>
                                    </div>
                                    <div className="form-submit">
                                        <button type="submit" name="submit"><Text tid="login" /></button>
                                    </div>
                                </form>

                                <SocialLogin props={props.props} />

                                <NavLink className="login-link" to="/register"><span>Don't have an account ? </span><Text tid="register" /></NavLink>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </div>
    )
}
