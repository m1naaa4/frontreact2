import React, {useEffect, useState} from 'react'
// import { Link, NavLink } from 'react-router-dom';
import LanguageSelector from "../../views/Fields/Language/LanguageSelectorView";

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
                            <div className="Dadupa-Copyright">@2020 All Rights Reserved. Dadupa Connect</div>
                        </div>
                        <div className="col-md-12 col-lg-9">
                            <div className="Dadupa-Links">
                                <ul className="Dadupa-Links-Wrap">
                                    <li className="Dadupa-Link"><a href="www.dadupa.com" target="_blanc">About</a></li>
                                    <li className="Dadupa-Link"><a href="#!">User Agreement</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Privacy Policy</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Cookie Policy</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Copyright Policy</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Brand Policy</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Guest Controls</a></li>
                                    <li className="Dadupa-Link"><a href="#!">Community Guidelines</a></li>
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