import React from "react";
import { NavLink } from "react-router-dom";

// import { BrowserRouter as  Link } from 'react-router-dom';
import { useForm, useStep } from "react-hooks-helper";
import RegisterStep1View from "./RegisterStep1View";
import RegisterStep2View from "./RegisterStep2View";
import Submit from "./Submit";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import { useTranslation } from "react-i18next";
import SocialAuth from "./Social/SocialAuth";


const steps = [
    { id: "registerstep1" },
    { id: "registerstep2" },
    { id: "submit" }
];

const defaultData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    type: '',
    phone: '',
    city: '',
    username:'',
    country:''
};

const MultiStepForm = ({ props }) => {
    const [formData, setForm] = useForm(defaultData);
    const [t] = useTranslation();

    const { step, navigation } = useStep({ initialStep: 0, steps });

    const data = { formData, setForm, navigation, props };

    // switch (id) {
    //     case "registerstep1":
    //         return <RegisterStep1View {...data} />;
    //     case "registerstep2":
    //         return <RegisterStep2View {...data} />;
    //     case "submit":
    //         return <Submit {...data} />;
    //     default:
    //         return null;
    // }

    return (
        <div>
            <HeaderLogo/>
            <div className="Dadupa-Signup">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8 d-none d-sm-block d-md-none d-lg-block">
                            <div className="page-image">
                                <img src="/assets/images/signup-illustration.svg" alt="Dadupa Connect" />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="form-wrapper">
                                <div id="form-signup" className="form-signup">
                                    <div className="form-signup-header">
                                        <h2 className="signup-title">{t('signup.message1')}</h2>
                                        <p>{t('signup.message2')}</p>
                                    </div>
                                    <ul id="progressbar">
                                        <li className={step.id == "registerstep1" ? 'active' : ''}>
                                            <span>1</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                        <li className={step.id == "registerstep2" ? 'active' : ''}>
                                            <span>2</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                        <li className={step.id == "submit" ? 'active' : ''}>
                                            <span>3</span>
                                            <i className="uil uil-check"></i>
                                        </li>
                                    </ul>

                                    {step.id == "registerstep1" ? <RegisterStep1View {...data} /> : '' }
                                    {step.id == "registerstep2" ? <RegisterStep2View {...data} /> : '' }
                                    {step.id == "submit" ? <Submit {...data} /> : '' }
                                </div>
                                {step.id == "registerstep1" ? (
                                    <div>
                                        <SocialAuth props={props} />
                                        <div className="login-link">
                                            <span>{t('signup.form.alreadyMember')} </span>
                                            <NavLink to="/login">{t('signin')}</NavLink>
                                        </div>
                                    </div>
                                ) : ''}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MultiStepForm;