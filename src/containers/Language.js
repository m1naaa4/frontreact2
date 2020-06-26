import React, { useState, createContext, useContext } from 'react';

import { languageOptions, dictionaryList } from '../languages';

// create the language context with default selected language
export const LanguageContext = createContext({
    language: languageOptions[0],
    dictionary: dictionaryList[localStorage.getItem("language")?
        localStorage.getItem("language"):languageOptions[0].id]
});

// it provides the language context to app
export function LanguageProvider(props) {
    const languageContext = useContext(LanguageContext);
    const [language, setLangue] = useState(languageContext.language);
    const [dictionary, setDictionary] = useState(languageContext.dictionary);

    const provider = {
        language,
        dictionary,
        setLangue: (selectedLanguage) => {
            setLangue(selectedLanguage);
            setDictionary(dictionaryList[selectedLanguage.id]);
        }
    };

    return (
        <LanguageContext.Provider value={provider}>
            {props.children}
        </LanguageContext.Provider>
    );
}

// get text according to id & current language


export function Input(props) {
    // console.log(props)
    const languageContext = useContext(LanguageContext);
    // console.log(languageContext.dictionary)

    return languageContext.dictionary;
}

export function Text(props) {
    // console.log(props)
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[props.tid];
}