import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import customStyles from "../styleMultiselect";


const AllMultiSelectCheckboxZone = ({datas, setSelectedcountry}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { t } = useTranslation();

  let options = datas.map((name, index) => (
    {value : name.value, label: t(name.label)}
  ))

  useEffect(() => {
    setSelectedOptions([{ label: "", value: "" }]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: ${t('all')}`;
    } else if(value.some((o) => o.value === '')) {
      return `${placeholderButtonLabel}: ${value.length-1} ${t('selected')}`;
    }else{
      return `${placeholderButtonLabel}: ${value.length} ${t('selected')}`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      setSelectedcountry(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedcountry([])
      this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedcountry(value.filter((o) => o.value !== "*"))
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedcountry(this.options)
      this.setState(this.options);
    } else {
      setSelectedcountry(value)
       this.setState(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes className="user-type"
      options={[{ label: `${t('all')}`, value: "*" }, ...options]}
      placeholderButtonLabel={t('country')}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={false}
      styles={customStyles}
    />
  );
};

export default AllMultiSelectCheckboxZone;