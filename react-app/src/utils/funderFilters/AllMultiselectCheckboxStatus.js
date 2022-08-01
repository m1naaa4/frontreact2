import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


const AllMultiSelectCheckboxStatus = ({datas, setSelectedusertype}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { t } = useTranslation();

  let options = datas.map((name, index) => (
    {value : name.value, label: t(name.label)}
  ))

  useEffect(() => {
    setSelectedOptions([{ value: "",label: "" }]);
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
      setSelectedusertype(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedusertype([])
      this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedusertype(value.filter((o) => o.value !== "*"))
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedusertype(this.options)
      this.setState(this.options);
    } else {
      setSelectedusertype(value)
      this.setState(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes name='project_area'
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Type"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiSelectCheckboxStatus;