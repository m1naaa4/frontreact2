import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { useDispatch } from 'react-redux';
import { getCategoryArticles } from "../../store/actions/Articles/ArticlesActions";


const AllMultiSelectCheckboxCategory = ({ datas, setSelectedCat }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { t } = useTranslation();

  let options = datas.map(item => (
    { value: item.id, label: t(item.name) }
  ))

  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedOptions([{ label: "", value: "" }]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else if (value.some((o) => o.value === '')) {
      return `${placeholderButtonLabel}: ${value.length - 1} selected`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
      setSelectedCat(this.options)
    } else if (event.action === "deselect-option" && event.option.value === "*") {
      setSelectedCat([])
      this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedCat(value.filter((o) => o.value !== "*"))
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedCat(this.options)
      this.setState(this.options);
    } else {
      setSelectedCat(value)
      this.setState(value);
      console.log(value)
      dispatch(getCategoryArticles(value[1].value))
    }
  }

  return (
    <ReactMultiSelectCheckboxes className="user-type"
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Sector"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
      hideSearch={true}
    />
  );
};

export default AllMultiSelectCheckboxCategory;