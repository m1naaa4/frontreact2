import React, { useEffect, useState } from "react";
import countries from '../../../../../data/countries'
import Select from 'react-select'
import { useTranslation } from 'react-i18next';


function ZoneDropFilter ({formData}) {
    const [optionSelected, setOptionSelected] = useState();
    const [country, setCountry] = useState();
    const { t } = useTranslation();

    const HandleChange = (selected)=>{
      setOptionSelected(selected);
      formData.project_area = selected.value;
    }

    const translatedCountries = countries.map(country => ({
      ...country,
      label: t(country.label)
    }));

    useEffect(() => {
      translatedCountries.map((key) => {
        if (key.value === formData.project_area) {
            setCountry(key.label)
        }
      });
    });

    const SelectStyleWithScrollbar = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#e8fbf1" : "white",
          color: "black",
          textAlign: 'center',
          "&:hover":{
            backgroundColor: "#e8fbf1",
          },
        //   '&:nth-child(1) ': {
        //     disable:true,
        //     marginTop: '0px',
        //     borderTopLeftRadius: '30px',
        //     borderTopRightRadius: '20px',
        // },
        '&:last-child ': {
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}),
        
        menu: (provided) => ({
          ...provided,
          borderRadius: "10px",
          overflow: 'hidden',
          border: '0.5px solid #00b602',
          zIndex: '999'
        }),
  
        menuList: (provided, state) => ({
        ...provided,
        // border: '1px solid green',
        borderRadius: "10px",
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
          borderRadius: '10px',
          border: '1px solid #F5F5F5',
          height: '50px',
          fontSize: '12px',
          "&:hover":{
            boxShadow: "none",
          },
        }),
        valueContainer:(base) => ({
          ...base,
          height: '50px',
          padding: '2px 15px',
        })
    }

    return (
      <Select
        options={translatedCountries}
        onChange={HandleChange}
        value={optionSelected}
        styles={SelectStyleWithScrollbar}
        placeholder={ (formData?.project_area === '')? "Zone Ciblée": country}
        required={true}
        className="Select"
      />
    )
}

export default ZoneDropFilter;