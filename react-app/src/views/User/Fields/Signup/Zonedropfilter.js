import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import countries from '../../../../data/countries';
import countryCityMapping from '../../../../data/cities';
import Select from 'react-select';

function Zonedropfilter ({formData}) {
  const { t, i18n } = useTranslation(['city', 'country', 'translation']);
  const [optionSelected, setOptionSelected] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      setCurrentLanguage(i18n.language);
      console.log(optionSelected.label);
      if (optionSelected) {
        setOptionSelected({
          ...optionSelected,
          label: t(`country:${optionSelected.label}`)
        });
      }
    }
  }, [i18n.language]);

  const HandleChange = (selected)=>{
    setOptionSelected(selected);
    formData.country=selected.value; 
    setCities(countryCityMapping[selected.value] || []);
    setSelectedCity(null);
  }

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    formData.city=selectedOption.value;
  };

  const translatedCountries = countries.map(country => ({
    ...country,
    label: t(`country:${country.label}`)
  }));

  const cityOptions = cities.map(city => ({ value: city, label: t(`city:${city}`)}));

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
        }),
  }

  return (
    <>
      <Select
      options={translatedCountries}
      onChange={HandleChange}
      value={optionSelected}
      styles={SelectStyleWithScrollbar}
      placeholder={ (formData?.country === '') ? t(`translation:select_a_country`) : formData.country  }
      required={true}
      className="Select"
    />
    <br/>
    <Select
          options={cityOptions}
          onChange={handleCityChange}
          styles={SelectStyleWithScrollbar}
          className="Select"
          value={selectedCity}
        />
    </>
    
    )
}

export default Zonedropfilter;