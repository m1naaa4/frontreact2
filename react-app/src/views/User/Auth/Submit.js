import React, { useEffect, useState } from "react";
import {signUpAction} from "../../../store/actions/User/Auth/AuthActions";
import {useDispatch} from "react-redux";
import typeusers from "../../../data/typeusers"
import { useTranslation } from 'react-i18next';
import countries from "../../../data/countries";
import Spinner from 'react-bootstrap/Spinner'

const Submit = ({setForm, formData, navigation, props}) => {
    const { email, password, firstName, lastName, type, phone, country, city, username } = formData;
    const {go} = navigation;

    const [typeuser, setTypeuser] = useState();
    const [selectedcountry, setSelectedcountry] = useState();
    const [t] = useTranslation();
    const [is_loading, setIsLoading] = useState(false);

    const UserRegister = (e) => {
        e.preventDefault();

        // clearAuthErrDiv();

            dispatch(signUpAction(formData, props));
            setIsLoading(true)
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const TogglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const dispatch = useDispatch();

    const clearAuthErrDiv = () => {
        let authErr = document.querySelector("#authErr");
        authErr.innerHTML = "";
    }

    useEffect(() => {
        typeusers.map((key) => {
            if (key.value === type) {
                setTypeuser(key.label)
            }}
        );

        countries.map((key) => 
        {if (key.value === country) {
          setSelectedcountry(key.label)
        }}
      );
    })

    return (
        <fieldset>
            <div className="form-inputs">
                <div className="signup-review">
                    <div className="step-field">
                        <div className="step-title">
                        {t('step')} 1
                        </div>
                        <div className="step-edit">
                            <button type="button" name="button" onClick={() => go("registerstep1")}>{t('edit')}</button>
                        </div>
                        <div className="step-details">
                            <div className="step-row">
                                <div className="step-label">{t('email')}</div>
                                <div className="step-value">{`${email}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('password')}</div>
                                <div className="step-value step-value-password">
                                    {passwordShown ? password : "********"}
                                    <span onClick={TogglePasswordVisiblity}
                                className="uil uil-eye field-icon toggle-password"></span>
                                </div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('username')}</div>
                                <div className="step-value">{`${username}`}</div>
                            </div>
                        </div>
                    </div>
                    <div className="step-field">
                        <div className="step-title">
                            {t('step')} 2
                        </div>
                        <div className="step-edit">
                            <button type="button" name="button" onClick={() => go("registerstep2")}>{t('edit')}</button>
                        </div>
                        <div className="step-details">
                            <div className="step-row">
                                <div className="step-label">{t('firstName')}</div>
                                <div className="step-value">{`${firstName}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('lastName')}</div>
                                <div className="step-value">{`${lastName}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('type')}</div>
                                <div className="step-value">{t(`${typeuser}`)}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('phone')}</div>
                                <div className="step-value">{` ${phone}`}</div>
                            </div>
                            <div className="step-row">
                                <div className="step-label">{t('city')}</div>
                                <div className="step-value">{`${city}`}</div>
                            </div>

                            <div className="step-row">
                                <div className="step-label">{t('country')}</div>
                                <div className="step-value">{`${selectedcountry}`}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" name="submit" className="submit action-button" onClick={UserRegister}
                    value="Sign Up">{t('register')}
                    {is_loading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> }
                    </button>
        </fieldset>

    );
};

export default Submit;
