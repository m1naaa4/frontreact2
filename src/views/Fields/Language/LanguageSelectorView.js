import React, {useContext, useState} from "react";
import { languageOptions } from '../../../languages';
import { LanguageContext } from '../../../containers/Language';


function LanguageSelectorView() {

    const languageContext = useContext(LanguageContext);
    const languageStoredInLocalStorage = localStorage.getItem("language");

    const handleLanguageChange = (event) => {
        const selectedLanguage = languageOptions.find(item => item.id === event.target.value);
        // set selected language by calling context method
        localStorage.setItem('language',selectedLanguage.id);
        languageContext.setLangue(selectedLanguage);
    };

    return (

        <select
            onChange={handleLanguageChange}
            value={languageStoredInLocalStorage}
        >
            {languageOptions.map(item => (
                <option  key={item.id} value={item.id}>{item.text}</option>
            ))}

        </select>

    );
}

export default LanguageSelectorView;