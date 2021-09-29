import React, { useState } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";



const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

function MultiselectCheckbox ({datas, setSelectedzone, label, ...others }){

    const [optionSelected, setOptionSelected] = useState(null);

    const handleChange =  (selected) => {
        setOptionSelected(selected);
        setSelectedzone(selected);
      };

    return (
        <span
          className="user-type"
          data-toggle="popover"
          data-trigger="focus"
          data-content="Please selecet account(s)"
        >
            <ReactSelect
            options={datas} name="funding_search"
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
            />
        </span>
    )
}

export default MultiselectCheckbox;