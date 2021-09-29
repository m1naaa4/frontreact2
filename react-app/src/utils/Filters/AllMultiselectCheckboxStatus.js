import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


const AllMultiSelectCheckboxStatus = ({datas, setSelectedstatus}) => {
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
      console.log('1')
      this.setState(this.options);
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      console.log('2')
      this.setState([]);
    } else if (event.action === "deselect-option") {
      console.log('3')
      this.setState(value.filter((o) => o.value !== "*"));
      console.log('4')
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      console.log('5')
      this.setState(value);
    }
    setSelectedstatus(value)
  }

  return (
    <ReactMultiSelectCheckboxes name='project_area'
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Status"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default AllMultiSelectCheckboxStatus;