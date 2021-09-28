import React from 'react';
import Footer from "../layout/footer/footer";
import HeaderProfile from '../layout/Header/HeaderProfile';
import ProjectSkeletonGridOne from '../skeleton/ProjectSkeletonOne';

function NoAuthorization() {
    return (
        <div>
        <HeaderProfile/>

        <div className="Dadupa-Page" >
        <div className="Single-Wrapper" >
            <div className="container">
                <ProjectSkeletonGridOne/>
            </div>
        </div>
        </div>
        <Footer/>

    </div>
    );
}

export default NoAuthorization;
