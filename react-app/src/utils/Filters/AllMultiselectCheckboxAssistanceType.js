import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


const AllMultiselectCheckboxAssistanceType = ({datas, setSelectedTypeAssistance}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { t } = useTranslation();

  let options = datas.map((name, index) => (
    {value : name[0], label: t(name[1])}
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
      setSelectedOptions(this.options);
      setSelectedTypeAssistance(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedTypeAssistance([])
      setSelectedOptions([]);
    } else if (event.action === "deselect-option") {
      setSelectedTypeAssistance(value.filter((o) => o.value !== "*"))
      setSelectedOptions(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length) {
      setSelectedTypeAssistance(this.options)
      setSelectedOptions(this.options);
    } else {
      setSelectedTypeAssistance(value)
      setSelectedOptions(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: `${t('all')}`, value: "*" }, ...options]}
      placeholderButtonLabel={t('form.new.mentoringType')}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiselectCheckboxAssistanceType;