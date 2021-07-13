import React from "react";
import { useTranslation } from 'react-i18next';



function DropType ({datas, field, label, ...others }){
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name={field}  {...others} required={others.required && "required"}>
            {datas.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
    )
}

export default DropType;