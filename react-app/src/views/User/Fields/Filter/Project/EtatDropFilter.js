import React from "react";
import { useTranslation } from 'react-i18next';
import etats from "../../../../../data/Etats";



function EtatDropFilter(props) {
    
    const { t, i18n } = useTranslation();

    // fecth data on mounted
    // useEffect(() => {
    //     dispatch(loadProjectAction(filterInput,props));
    // }, [dispatch])

    return (
        <div>
        <select className="user-type" name="project_status" {...props} required={props.required && "required"} >
            {etats.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
        </div>
        // <div className="input-row input-select">
            
        // </div>
    )
}

export default EtatDropFilter;