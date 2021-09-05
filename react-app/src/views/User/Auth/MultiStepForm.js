import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useForm, useStep } from "react-hooks-helper";
import RegisterStep1View from "./RegisterStep1View";
import RegisterStep2View from "./RegisterStep2View";
import Submit from "./Submit";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import {Text} from "../../../containers/Language";
import Footer from "../../../layout/footer/footer";
import SocialLogin from "./Social/SocialLogin";


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
                                    <h2 className="signup-title"><Text tid="signup.message1" /> <br/><Text tid="signup.message2" /></h2>
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
                                        <SocialLogin props={props} />
                                        <div className="login-link"><span><Text tid="signup.form.alreadyMember" /></span><Link to="/login"><Text tid="signin" /></Link></div>
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