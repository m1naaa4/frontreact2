import React, {useEffect, useState} from 'react'
// import { Link, NavLink } from 'react-router-dom';
import LanguageSelector from "../../views/Fields/Language/LanguageSelectorView";
import {Text} from "../../containers/Language";

import Propos from './pdfs/Propos.pdf';
import ConditionsGeneralesUtilisation from './pdfs/ConditionsGeneralesUtilisation.pdf';
import PolitiqueUtilisationDonnes from './pdfs/PolitiqueUtilisationDonnes.pdf';
import AideFAQ from './pdfs/AideFAQ.pdf';
import PresseMedias from './pdfs/PresseMedias.pdf';
import StagesCarrieres from './pdfs/StagesCarrieres.pdf';
import Services from './pdfs/Services.pdf';
import RseauxSociaux from './pdfs/RseauxSociaux.pdf';

function Footer(props) {

    let languageStoredInLocalStorage = localStorage.getItem("language");
    let [language, setLangue] = useState(
        languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
    );



    return (
        <div>
            <footer className="Dadupa-Footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-3">
                            <div className="Dadupa-Copyright"><Text tid="footer.copyright" /></div>
                        </div>
                        <div className="col-md-12 col-lg-9">
                            <div className="Dadupa-Links">
                                <ul className="Dadupa-Links-Wrap">
                                    <li className="Dadupa-Link"><a href={Propos} target="_blanc"><Text tid="footer.menu.about" /></a></li>
                                    <li className="Dadupa-Link"><a href={ConditionsGeneralesUtilisation} target="_blanc"><Text tid="footer.menu.user_agreement" /></a></li>
                                    <li className="Dadupa-Link"><a href={PolitiqueUtilisationDonnes} target="_blanc"><Text tid="footer.menu.privacy" /></a></li>
                                    <li className="Dadupa-Link"><a href={AideFAQ} target="_blanc"><Text tid="footer.menu.cookie" /></a></li>
                                    <li className="Dadupa-Link"><a href={PresseMedias} target="_blanc"><Text tid="footer.menu.copyright" /></a></li>
                                    <li className="Dadupa-Link"><a href={StagesCarrieres} target="_blanc"><Text tid="footer.menu.brand" /></a></li>
                                    <li className="Dadupa-Link"><a href={Services} target="_blanc"><Text tid="footer.menu.guest" /></a></li>
                                    <li className="Dadupa-Link"><a href={RseauxSociaux} target="_blanc"><Text tid="footer.menu.community" /></a></li>
                                    <li className="Dadupa-Link Lang-Switcher input-select">

                                            <LanguageSelector language={language} />

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;