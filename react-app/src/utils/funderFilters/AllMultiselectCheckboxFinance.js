import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "../../components/ReactMultiSelectCheckboxes";


const AllMultiSelectCheckboxFinance = ({datas, setSelectedfinance}) => {
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
      return `${placeholderButtonLabel}: ${value.length-1} selected`;
    }else{
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      setSelectedfinance(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedfinance([])
      this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedfinance(value.filter((o) => o.value !== "*"))
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedfinance(this.options)
      this.setState(this.options);
    } else {
      setSelectedfinance(value)
      this.setState(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: `${t('all')}`, value: "*" }, ...options]}
      placeholderButtonLabel="Finance"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiSelectCheckboxFinance;