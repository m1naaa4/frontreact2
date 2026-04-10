import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "../../components/ReactMultiSelectCheckboxes";
import customStyles from "../styleMultiselect";


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
      options={[{ label: `${t('all')}`, value: "*" }, ...options]}
      placeholderButtonLabel={t('form.menu.articles.category')}
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={false}
      styles={customStyles}
    />
  );
};

export default AllMultiselectCheckboxCategories;