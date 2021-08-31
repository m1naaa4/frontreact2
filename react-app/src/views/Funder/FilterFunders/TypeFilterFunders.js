import React from "react";
import { useTranslation } from 'react-i18next';



function TypeFilterFunders({filter, ...others }) {
    const etats = [
        ["all", "filter.funder.type"],
        ["business_angle", "funder.form.you_are.business_angle"],
        ["fonds", "funder.form.you_are.fonds"],
        ["corporate", "funder.form.you_are.corporate"],
    ];
    const { t, i18n } = useTranslation();


    return (
        <select className="project-state" name="type" defaultValue={filter.type}  {...others} >
            {etats.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
    )
}

export default TypeFilterFunders;