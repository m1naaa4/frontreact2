import React from 'react';
import ReactMultiSelectCheckboxes from './ReactMultiSelectCheckboxes';

// Defensive wrapper to guarantee options is always an array.
export default function SafeMultiSelect(props) {
  const options = Array.isArray(props.options) ? props.options : [];
  return <ReactMultiSelectCheckboxes {...props} options={options} />;
}
