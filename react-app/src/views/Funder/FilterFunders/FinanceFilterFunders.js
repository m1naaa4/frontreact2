import React, { useEffect,useState } from "react";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const finances = [
    ['', 'filter.secteur.finance'],
    [ '2500',  'filter.secteur.2500'],
    [ '10000',  'filter.secteur.10000'],
    [ '25000',  'filter.secteur.25000'],
    [ '40000',  'filter.secteur.40000'],
    [ '55000',  'filter.secteur.55000'],
    [ '70000',  'filter.secteur.70000'],
    [ '85000',  'filter.secteur.85000'],
    [ '100000',  'filter.secteur.100000']
];

function FinanceFilterFunders ({formData}) {
    const { t, i18n } = useTranslation();
    const [optionSelected, setOptionSelected] = useState();

    const HandleChange = (selected)=>{
        setOptionSelected(selected);
        formData.finances=selected.value;
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

      const alloptions = finances.map(([value, name]) => (
        {value: value,label: t(name)}
    ))


    return (
        <Select
            options={alloptions}
            onChange={HandleChange}
            value={optionSelected}
            styles={SelectStyleWithScrollbar}
            placeholder={ (formData?.finances==='') ? "Funding Capacity": formData?.finances}
            required={true}
            className="Select"
        />
    )
}

export default FinanceFilterFunders;