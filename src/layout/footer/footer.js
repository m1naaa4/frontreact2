import React, {useEffect, useState} from 'react'
// import { Link, NavLink } from 'react-router-dom';
import LanguageSelector from "../../views/Fields/Language/LanguageSelectorView";
import {Text} from "../../containers/Language";

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
                                    <li className="Dadupa-Link"><a href="www.dadupa.com" target="_blanc"><Text tid="footer.menu.about" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.user_agreement" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.privacy" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.cookie" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.copyright" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.brand" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.guest" /></a></li>
                                    <li className="Dadupa-Link"><a href="#!"><Text tid="footer.menu.community" /></a></li>
                                    <li className="Dadupa-Link Lang-Switcher input-select">

                                            <LanguageSelector
                                                language={language}
                                                handleSetLangue={language => {
                                                    setLangue(language);
                                                    storeLanguageInLocalStorage(language);
                                                }}
                                            />

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )

    function storeLanguageInLocalStorage(language) {
        localStorage.setItem("language", language);
    }
}

export default Footer;