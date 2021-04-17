import React from 'react';
import {NavLink} from 'react-router-dom';
import HeaderLogo from "../layout/Header/HeaderLogo";
import Footer from "../layout/footer/footer";

function Opps() {
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
                        <h1> SERVER ERROR </h1>
                        <div className="login-link">
                                <NavLink to="/">BACK TO HOME</NavLink>
                        </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>

    </div>
    );
}

export default Opps;
