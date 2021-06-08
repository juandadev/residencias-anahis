import React from 'react';

export default function CheckBox({ id, label }) {
  return (
    <div className="custom-control custom-checkbox">
      <input type="checkbox" className="custom-control-input" id={id} />

      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
