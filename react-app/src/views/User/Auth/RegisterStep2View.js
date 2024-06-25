import React from 'react'
import {useSelector} from 'react-redux';
import ItemForm from "./ItemForm";
import TypeDrop from "../Fields/Signup/TypeDrop";
import $ from "jquery";
import 'jquery-validation'
import Zonedropfilter from '../Fields/Signup/Zonedropfilter';
import { useTranslation } from 'react-i18next';


const RegisterStep2View = ({setForm, formData, navigation}) => {
    const {firstName, lastName, type, phone, country, city, username} = formData;
    const {previous, next} = navigation;
    const {t} = useTranslation();

    const validateForm = (value, key) => {
        if($("#form").valid()){
            if (key === 13 && value !== '') {
                return navigation.next()
            }else if (value == 'next') {
                return navigation.next()
            }
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
                        <ItemForm type="text" name="firstName" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={firstName} onChange={setForm}
                                placeholder={t('lastName')} required/>
                    </div>
                    <div className="input-row">
                        <ItemForm type="text" name="lastName" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={lastName} onChange={setForm}
                                placeholder={t('firstName')} required/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="text" name="username" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) }  value={username} onChange={setForm}
                                placeholder={t('username')}/>
                    </div>

                    {/* <TypeDrop  name="type" value={type} onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } onChange={setForm}/> */}
                    <div className="input-row">
                        <TypeDrop   formData={formData}/>
                    </div>

                    <div className="input-row">
                        <ItemForm type="tel" name="phone" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={phone} onChange={setForm}
                                placeholder={t('phone')}/>
                    </div>

                    <div className="input-row">
                           <Zonedropfilter formData={formData}/>
                    </div>

                    {/* <div className="input-row">
                        <ItemForm type="text" name="city" onKeyDown={(e) => validateForm(e.target.value, e.keyCode) } value={city} onChange={setForm}
                                placeholder={t('city')} required/>
                    </div> */}

                    <button type="button" name="previous" onClick={previous}
                            className="flex-prev-btn previous action-button"
                    >{t('previous')}</button>
                    <button type="button" name="next" onClick={(e) => validateForm('next')}
                            className="flex-next-btn next action-button">{t('next')}</button>
                </div>
            </form>
        </fieldset>
    )

}


export default RegisterStep2View;