const customStyles = {
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected
        ? '#00b601' // Background for selected option
        : isFocused
        ? '#ebf9eb' // Background on hover
        : '#fff', // Default background
      color: isSelected ? '#fff' : '#000', // Text color for selected option
      ':hover': {
        backgroundColor: '#ebf9eb', // Hover effect
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff', // Dropdown background
      borderColor: '#00b601', // Border color
      ':hover': {
        borderColor: '#00b601', // Border color on hover
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#00b601', // Background for selected items
      color: '#fff',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff', // Text color for selected items
    }),
    
    placeholder: (provided) => ({
      ...provided,
      color: '#888', // Placeholder text color
    }),
};

export default customStyles;
