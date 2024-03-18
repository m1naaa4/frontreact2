import React from "react";
import { useTranslation } from 'react-i18next';



function DropType ({datas, field, value, ...others }){
    const { t } = useTranslation();

    return (
        <select className="user-type" name={field} value={value || ''}  {...others} required={others.required && "required"}>
            {datas.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
    )
}

export default DropType;