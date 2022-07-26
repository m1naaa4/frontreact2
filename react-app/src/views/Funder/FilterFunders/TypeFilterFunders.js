import React, { useEffect,useState } from "react";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const etats = [
        {value:"business_angle",label: "Business Angle"},
        {value:"fonds", label: "Fonds"},
        {value:"corporate",label:  "corporate"},
    ];

function TypeFilterFunders({formData}) {
    
    const { t, i18n } = useTranslation();
    const [optionSelected, setOptionSelected] = useState();

    const HandleChange = (selected)=>{
        setOptionSelected(selected);
        formData.type=selected.value;
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
        // <select className="project-state" name="type" defaultValue={filter.type}  {...others} >
        //     {etats.map(([value, name]) => (
        //         <option key={name} value={value}>{t(name)}</option>
        //     ))}
        // </select>
        <Select
                options={etats}
                onChange={HandleChange}
                value={optionSelected}
                styles={SelectStyleWithScrollbar}
                placeholder= { (formData?.type === '') ? 'You Are:' : formData?.type}
                required={true}
                className="Select"
        />

    )
}

export default TypeFilterFunders;