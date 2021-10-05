import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import sectors from '../data/sectors';

export default function SelectSector({datas, setSector, defaultValue, ...others }) {

  const { t } = useTranslation();
  const [optionSelected, setOptionSelected] = useState(defaultValue);

  let alloptions = datas.map((name, index) => (
    {value : name.value, label: t(name.label)}
  ))

  useEffect(()=>{
    sectors.map((key) => 
      {if (key.value === defaultValue) {
        setOptionSelected({value : key.value, label: t(key.label)})
      }}
    );
  },[sectors])

  const handleChange = (selected) => {
    setOptionSelected(selected);
    setSector(selected);
  };
 
  return (
    <Select
        options={alloptions} name="funding_search"
        value={optionSelected}
        onChange={handleChange}
    />
  )
}