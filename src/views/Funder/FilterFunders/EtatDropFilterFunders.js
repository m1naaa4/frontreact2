import React from "react";
import { useTranslation } from 'react-i18next';



function EtatDropFilterFunders(props) {
    const etats = [
        ["", "filter.etat_projet"],
        ["idee", "filter.etat_projet.idee"],
        ["prototype", "filter.etat_projet.prototype"],
        ["mvp", "filter.etat_projet.mvp"],
        ["first_sale", "filter.etat_projet.first_sale"],
    ];
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

export default EtatDropFilterFunders;