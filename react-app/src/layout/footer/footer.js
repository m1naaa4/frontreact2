import React, { useState} from 'react'
import LanguageSelector from "../../views/Fields/Language/LanguageSelectorView";

import Propos from './pdfs/Propos.pdf';
import ConditionsGeneralesUtilisation from './pdfs/ConditionsGeneralesUtilisation.pdf';
import PolitiqueUtilisationDonnes from './pdfs/PolitiqueUtilisationDonnes.pdf';
import AideFAQ from './pdfs/AideFAQ.pdf';
import PresseMedias from './pdfs/PresseMedias.pdf';
import StagesCarrieres from './pdfs/StagesCarrieres.pdf';
import Services from './pdfs/Services.pdf';
import RseauxSociaux from './pdfs/RseauxSociaux.pdf';
import { useTranslation } from 'react-i18next';

function Footer() {

    let languageStoredInLocalStorage = localStorage.getItem("language");
    let [language] = useState(
        languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
    );

    const { t } = useTranslation();



    return (
        <div>
            <footer className="Dadupa-Footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-3">
                            <div className="Dadupa-Copyright">{t('footer.copyright')}</div>
                        </div>
                        <div className="col-md-12 col-lg-9">
                            <div className="Dadupa-Links">
                                <ul className="Dadupa-Links-Wrap">
                                    <li className="Dadupa-Link"><a href={Propos} target="_blanc">{t('footer.menu.about')}</a></li>
                                    <li className="Dadupa-Link"><a href={ConditionsGeneralesUtilisation} target="_blanc">{t('footer.menu.user_agreement')}</a></li>
                                    <li className="Dadupa-Link"><a href={PolitiqueUtilisationDonnes} target="_blanc">{t('footer.menu.privacy')}</a></li>
                                    <li className="Dadupa-Link"><a href={AideFAQ} target="_blanc">{t('footer.menu.cookie')}</a></li>
                                    {/* <li className="Dadupa-Link"><a href={PresseMedias} target="_blanc">{t('footer.menu.copyright')}</a></li> */}
                                    <li className="Dadupa-Link"><a href={StagesCarrieres} target="_blanc">{t('footer.menu.brand')}</a></li>
                                    <li className="Dadupa-Link"><a href={Services} target="_blanc">{t('footer.menu.guest')}</a></li>
                                    <li className="Dadupa-Link"><a href={RseauxSociaux} target="_blanc">{t('footer.menu.community')}</a></li>
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