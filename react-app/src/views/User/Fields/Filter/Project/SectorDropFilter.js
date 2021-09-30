import React from "react";
import { useTranslation } from 'react-i18next';
import sectors from "../../../../../data/sectorsCreate";

function SectorDropFilter ({ label, ...others }){
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name="sector_id"  {...others} required={others.required && "required"}>
            {sectors.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
/*         <div className="input-row input-select">
            
        </div> */
    )
}

export default SectorDropFilter;