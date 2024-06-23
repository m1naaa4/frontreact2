import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import assistanceMentorCreate from "../../../data/assistanceMentorCreate";

function AssistanceFilterMentors ({formData}) {
    const { t } = useTranslation();
    const [optionSelected, setOptionSelected] = useState();
    const [assistance, setAssistance] = useState();

    const HandleChange = (selected)=>{
      setOptionSelected(selected);
      formData.assistance = selected.value;
    }

    const SelectStyleWithScrollbar = {
        indicatorSeparator: () => ({
          display: 'none',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#e8fbf1" : "white",
          color: "black",
          textAlign: 'center',
          fontSize: '12px',
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
          boxShadow: state.isFocused ? "0px 1px 15px -3px #00b60 ":"0px 0px 20px 0px #e7e7e7",
          borderRadius: '15px',
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

    const alloptions = assistanceMentorCreate.map(([value, name]) => (
      {value: value,label: t(name)}
    ))

    useEffect(() => {
      assistanceMentorCreate.map((key) => {
        if (key[0] == formData.assistance) {
          setAssistance(key[1])
        }
      });
    }, [formData.assistance])


    return (
        <Select
            options={alloptions}
            onChange={HandleChange}
            value={optionSelected}
            styles={SelectStyleWithScrollbar}
            placeholder={ (formData.assistance === '') ? "Assistance type": t((assistance) )}
            required={true}
            className="Select"
        />
    )
}

export default AssistanceFilterMentors;