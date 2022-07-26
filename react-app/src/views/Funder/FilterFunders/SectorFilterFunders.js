import React, { useEffect,useState } from "react";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

// const sectors = [
//     ['all','filter.secteur'],
//     ['agroalimentaire','filter.secteur.agroalimentaire'],
//     ['architecture','filter.secteur.architecture'],
//     ['art','filter.secteur.art'],
//     ['big_data','filter.secteur.big_data'],
//     ['bio','filter.secteur.bio'],
//     ['btp','filter.secteur.btp'],
//     ['commerce','filter.secteur.commerce'],
//     ['communication','filter.secteur.communication'],
//     ['design','filter.secteur.design'],
//     ['divertissement','filter.secteur.divertissement'],
//     ['droit','filter.secteur.droit'],
//     ['ecommerce','filter.secteur.ecommerce'],
//     ['education','filter.secteur.education'],
//     ['energie','filter.secteur.energie'],
//     ['environement','filter.secteur.environement'],
//     ['finance','filter.secteur.finance'],
//     ['information','filter.secteur.information'],
//     ['ia','filter.secteur.ia'],
//     ['internet_objets','filter.secteur.internet_objets'],
//     ['mode','filter.secteur.mode'],
//     ['robotique','filter.secteur.robotique'],
//     ['sante','filter.secteur.sante'],
//     ['villes_intelligences','filter.secteur.villes_intelligences'],
//     ['technologie','filter.secteur.technologie'],
//     ['transport','filter.secteur.transport'],
//     ['other','filter.secteur.other'],
// ];
const sectors = [
    {value:'agroalimentaire', label: 'Agroalimentaire'},
    {value:'architecture', label: 'Architecture'},
    {value:'art', label: 'Art'},
    {value:'big_data', label: 'Big data'},
    {value:'bio', label: 'Bio'},
    {value:'btp', label: 'Btp'},
    {value:'commerce', label: 'Commerce'},
    {value:'communication', label: 'Communication'},
    {value:'design', label: 'Design'},
    {value:'divertissement', label: 'Divertissement'},
    {value:'droit', label: 'Droit'},
    {value:'ecommerce', label: 'Ecommerce'},
    {value:'education', label: 'Education'},
    {value:'energie', label: 'Energie'},
    {value:'environement', label: 'Environement'},
    {value:'finance', label: 'Finance'},
    {value:'information', label: 'Information'},
    {value:'ia', label: 'IA'},
    {value:'internet_objets', label: 'internet des objets'},
    {value:'mode', label: 'Mode'},
    {value:'robotique', label: 'Robotique'},
    {value:'sante', label: 'Sante'},
    {value:'villes_intelligences', label: 'Villes Intelligences'},
    {value:'technologie', label: 'Technologie'},
    {value:'transport', label: 'Transport'},
    {value:'other', label: 'Other'},
];

function SectorFilterFunders ({formData}){
    const { t, i18n } = useTranslation();
    const [optionSelected, setOptionSelected] = useState();

    const HandleChange = (selected)=>{
        setOptionSelected(selected);
        formData.sector_id=selected.value;
        console.log(formData);
    }

    const SelectStyleWithScrollbar = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#e8fbf1" : "white",
          color: "black",
          textAlign: 'center',
          "&:hover":{
            backgroundColor: "#e8fbf1",
          },
          '&:nth-child(1) ': {
            disable:true,
            marginTop: '0px',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '20px',
        },
        '&:last-child ': {
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '20px',
        }}),
        
        menu: (provided) => ({
          ...provided,
          borderRadius: "35px",
          overflow: 'hidden',
          border: '0.5px solid #00b602',
          zIndex: '999'
        }),
  
        menuList: (provided, state) => ({
        ...provided,
        // border: '1px solid green',
        borderRadius: "32px",
        padding: '0',
        "&::-webkit-scrollbar": {
          width: "5px",
          
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
          background: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555"
        }
        }),
        control: (base, state) => ({
          ...base,
          boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 ":"0px 0px 20px 0px #e7e7e7",
          borderRadius: '30px',
          border: '1px solid #e7e7e7',
          height: '50px',
          "&:hover":{
            boxShadow: "none",
          },
        }),
      }

    return (
        // <select className="user-type" name="sector_id" defaultValue={sector_id} {...others}>
        //     {sectors.map(([value, name]) => (
        //         <option key={name} value={value}>{t(name)}</option>
        //     ))}
        // </select>
        <Select
                options={sectors}
                onChange={HandleChange}
                value={optionSelected}
                styles={SelectStyleWithScrollbar}
                placeholder={(formData.sector_id==='')?"Secteur d'activité":formData.sector_id}
                required={true}
                className="Select"
        />
/*         <div className="input-row input-select">
            
        </div> */
    )
}

export default SectorFilterFunders;