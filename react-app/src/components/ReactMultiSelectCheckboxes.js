import React, { useState, useRef, useEffect } from 'react';
import Select, { components } from 'react-select';

const CheckboxOption = ({ children, isSelected, ...props }) => (
  <components.Option {...props} isSelected={isSelected}>
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => null}
      style={{ marginRight: 8, cursor: 'pointer', accentColor: '#00b601' }}
    />
    {children}
  </components.Option>
);

const buttonStyle = {
  padding: '6px 10px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 1px 1px 1px rgba(0,0,0,0.08)',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
};

const defaultSelectStyles = {
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    backgroundColor: isSelected ? '#00b601' : isFocused ? '#ebf9eb' : '#fff',
    color: isSelected ? '#fff' : '#000',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    minWidth: 240,
    margin: 8,
    borderColor: '#00b601',
    ':hover': { borderColor: '#00b601' },
  }),
  menu: () => ({
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    backgroundColor: '#fff',
    borderRadius: 4,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

const ReactMultiSelectCheckboxes = ({
  options = [],
  placeholderButtonLabel = 'Select',
  getDropdownButtonLabel,
  value = [],
  onChange,
  setState,
  hideSearch = false,
  styles,
  className,
  name,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!menuIsOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMenuIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuIsOpen]);

  const buttonLabel = getDropdownButtonLabel
    ? getDropdownButtonLabel({ placeholderButtonLabel, value })
    : `${placeholderButtonLabel}: ${value.length}`;

  const handleChange = (selected, event) => {
    if (onChange) {
      onChange.call({ setState, options }, selected || [], event);
    }
  };

  // Merge caller styles on top of defaults
  const mergedStyles = { ...defaultSelectStyles };
  if (styles) {
    Object.keys(styles).forEach((key) => {
      const defaultFn = defaultSelectStyles[key];
      const callerFn = styles[key];
      mergedStyles[key] = defaultFn
        ? (base, state) => callerFn(defaultFn(base, state), state)
        : callerFn;
    });
  }

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        name={name}
        style={buttonStyle}
        onClick={() => setMenuIsOpen((open) => !open)}
      >
        {buttonLabel}
        <span style={{ fontSize: 10 }}>▾</span>
      </button>
      {menuIsOpen && (
        <div style={{ position: 'absolute', zIndex: 1000, top: '100%', left: 0 }}>
          <Select
            autoFocus
            isMulti
            backspaceRemovesValue={false}
            components={{ Option: CheckboxOption, IndicatorSeparator: () => null }}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isSearchable={!hideSearch}
            menuIsOpen
            onChange={handleChange}
            options={options}
            placeholder="Search..."
            tabSelectsValue={false}
            value={value}
            closeMenuOnSelect={false}
            styles={mergedStyles}
          />
        </div>
      )}
    </div>
  );
};

export default ReactMultiSelectCheckboxes;
