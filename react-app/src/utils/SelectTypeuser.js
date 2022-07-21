import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import typeusers from '../data/typeusers';



export default function SelectTypeuser({datas, setTypeuser, defaultValue,SelectWithoutScroll, ...others }) {

  const { t } = useTranslation();
  const [optionSelected, setOptionSelected] = useState(defaultValue);

  let alloptions = datas.map((name, index) => (
    {value : name.value, label: t(name.label)}
  ))

  useEffect(()=>{
    typeusers.map((key) => 
      {if (key.value === defaultValue) {
        setOptionSelected({value : key.value, label: t(key.label)})
      }}
    );
  },[typeusers])

  const handleChange = (selected) => {
    setOptionSelected(selected);
    setTypeuser(selected);
  };
 
  return (
    <Select
        options={alloptions} name="funding_search"
        value={optionSelected}
        onChange={handleChange}
        styles={SelectWithoutScroll}
        className="Select"
    />
  )
}