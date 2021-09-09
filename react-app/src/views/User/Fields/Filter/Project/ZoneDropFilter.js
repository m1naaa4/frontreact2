import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import countries from '../../../../../data/countries'
import Select from 'react-select'


function ZoneDropFilter ({field, label, ...others }) {
    const { t, i18n } = useTranslation();
    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false)

    const style = {
        blockquote: {
          fontStyle: 'italic',
          fontSize: '.75rem',
          margin: '1rem 0',
        },
        label: {
          fontSize: '.75rem',
          fontWeight: 'bold',
          lineHeight: 2,
        },
      };

      const onFocus = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${
          isDisabled ? ', disabled' : ''
        }`;
        setAriaFocusMessage(msg);
        return msg;
      };

      const onMenuOpen = () => setIsMenuOpen(true);
      const onMenuClose = () => setIsMenuOpen(false);

    return (
        // <select className="user-type" name={field} {...others} required={others.required && "required"}>
        //     {countries.map((item) => (
        //         <option key={item.value} value={item.value} >{item.label}</option>
        //     ))}
        // </select>
        // <Select className="user-type" options={countries} name={field} {...others} required={others.required && "required"}/>
        <Select 
        className="user-type"
        name={field}
        inputId="aria-example-input"
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        options={countries}
      />
    )
}

export default ZoneDropFilter;