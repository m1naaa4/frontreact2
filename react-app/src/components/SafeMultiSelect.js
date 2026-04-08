import React from 'react';
// Import the real library entry to avoid alias recursion
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes/lib/index.js';

// Defensive wrapper to guarantee options is always an array.
export default function SafeMultiSelect(props) {
  const options = Array.isArray(props.options) ? props.options : [];
  return <ReactMultiSelectCheckboxes {...props} options={options} />;
}
