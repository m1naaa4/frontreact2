import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import countries from '../data/countries';

export default function SelectCountry({datas, setCountry, defaultValue, ...others }) {

  const { t } = useTranslation();
  const [optionSelected, setOptionSelected] = useState(defaultValue);

  let alloptions = datas.map((name, index) => (
    {value : name.value, label: t(name.label)}
  ))

  useEffect(()=>{
    countries.map((key) => 
      {if (key.value === defaultValue) {
        setOptionSelected({value : key.value, label: t(key.label)})
      }}
    );
  },[countries])

  const handleChange = (selected) => {
    setOptionSelected(selected);
    setCountry(selected);
  };
 
  return (
    <Select
        options={alloptions} name="funding_search"
        value={optionSelected}
        onChange={handleChange}
    />
  )
}