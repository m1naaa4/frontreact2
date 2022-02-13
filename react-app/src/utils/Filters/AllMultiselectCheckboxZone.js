import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


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
      return `${placeholderButtonLabel}: All`;
    } else if(value.some((o) => o.value === '')) {
      return `${placeholderButtonLabel}: ${value.length-1} selected`;
    }else{
      return `${placeholderButtonLabel}: ${value.length} selected`;
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
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Country"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiSelectCheckboxZone;