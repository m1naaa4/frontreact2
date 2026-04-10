import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "../../components/ReactMultiSelectCheckboxes";
import customStyles from "../styleMultiselect";


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
      setSelectedstatus(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedstatus([])
      this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedstatus(value.filter((o) => o.value !== "*"))
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedstatus(this.options)
      this.setState(this.options);
    } else {
      setSelectedstatus(value)
      this.setState(value);
    }
  }

  return (
    <ReactMultiSelectCheckboxes name='project_area'
      options={[{ label: `${t('all')}`, value: "*" }, ...options]}
      placeholderButtonLabel="Status"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={false}
      styles={customStyles}
    />
  );
};

export default AllMultiSelectCheckboxStatus;