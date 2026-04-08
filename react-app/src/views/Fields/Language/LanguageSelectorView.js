import React, {useContext, useEffect, useState} from "react";
import { languageOptions } from '../../../languages';
import { LanguageContext } from '../../../containers/Language';
import { useTranslation } from 'react-i18next';


function LanguageSelectorView() {
    const { t, i18n } = useTranslation();
    const [languageStoredInLocalStorage, setLanguageStoredInLocalStorage] = useState(localStorage.getItem("language") || "en");

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const languageContext = useContext(LanguageContext);    

    useEffect(() => {
        i18n.changeLanguage(languageStoredInLocalStorage);
    }, [languageStoredInLocalStorage]);

    const handleLanguageChange = (event) => {
        const selectedLanguage = languageOptions.find(item => item.id === event.target.value);
        // set selected language by calling context method
        localStorage.setItem('language',selectedLanguage.id);
        languageContext.setLangue(selectedLanguage);
        setLanguageStoredInLocalStorage(selectedLanguage.id);

        changeLanguage(selectedLanguage.id);
    };

    return (

        <select
            onChange={handleLanguageChange}
            value={languageStoredInLocalStorage || ''}
        >
            {languageOptions.map(item => (
                <option  key={item.id} value={item.id}>{t(item.text)}</option>
            ))}

        </select>

    );
}

export default LanguageSelectorView;
