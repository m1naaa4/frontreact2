import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


const AllMultiselectCheckboxCategories = ({datas, setSelectedCat}) => {
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
      setSelectedOptions(this.options);
      setSelectedCat(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedCat([])
      setSelectedOptions([]);
    } else if (event.action === "deselect-option") {
      setSelectedCat(value.filter((o) => o.value !== "*"))
      setSelectedOptions(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length) {
      setSelectedCat(this.options)
      setSelectedOptions(this.options);
    } else {
      setSelectedCat(value)
      setSelectedOptions(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes className="user-type"
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Category"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiselectCheckboxCategories;