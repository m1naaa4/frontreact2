import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import types from "../../../../data/types";

function TypeDrop ({formData}) {
    const { t } = useTranslation();
    const [optionSelected, setOptionSelected] = useState();
    const [type, setType] = useState();

    const HandleChange = (selected)=>{
      setOptionSelected(selected);
      formData.type = selected.value;
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
        '&:last-child ': {
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
        }}),
        
        menu: (provided) => ({
          ...provided,
          borderRadius: "15px",
          overflow: 'hidden',
          border: '0.5px solid #00b602',
          zIndex: '999'
        }),
  
        menuList: (provided, state) => ({
        ...provided,
        // border: '1px solid green',
        borderRadius: "15px",
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
          // boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 ":"0px 0px 20px 0px #e7e7e7",
          borderRadius: '15px',
          fontSize: '12px',
          border: '1px solid #F5F5F5',
          height: '50px',
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

    const alloptions = types.map(([value, name]) => (
      {value: value,label: t(name)}
    ))

    useEffect(() => {
      types.map((key) => {
        if (key[0] == formData.type) {
            setType(key[1])
        }
      });
    }, [formData.type])


    return (
        <Select
            options={alloptions}
            onChange={HandleChange}
            value={optionSelected}
            styles={SelectStyleWithScrollbar}
            placeholder={ (formData.type === '') ? t('signup.form.profilType'): t(type )}
            required={true}
            className="Select"
        />
    )
}

export default TypeDrop;