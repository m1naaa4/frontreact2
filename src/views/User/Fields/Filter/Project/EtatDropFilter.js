import React from "react";
import { useTranslation } from 'react-i18next';



function EtatDropFilter({ label, ...others }) {
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
        <div className="input-row input-select">
            <select className="user-type" name="project_status"  {...others}>
                {etats.map(([value, name]) => (
                    <option key={name} value={value}>{t(name)}</option>
                ))}
            </select>
        </div>
    )
}

export default EtatDropFilter;