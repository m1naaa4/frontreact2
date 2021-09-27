import React from 'react';
import {NavLink} from 'react-router-dom';
import HeaderLogo from "../layout/Header/HeaderLogo";
import Footer from "../layout/footer/footer";
import ProjectSkeletonGrid from '../skeleton/ProjectSkeletonGrid';
import HeaderProfile from '../layout/Header/HeaderProfile';

function NoAuthorization() {
    return (
        <div>
        <HeaderProfile/>

        <div className="Dadupa-Page" >
        <div className="Single-Wrapper" >
            <div className="container">
                    <ProjectSkeletonGrid/>
            </div>
        </div>
        </div>
        <Footer/>

    </div>
    );
}

export default NoAuthorization;
