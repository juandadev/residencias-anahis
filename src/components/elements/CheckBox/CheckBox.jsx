import React from 'react';

export default function CheckBox({ id, label, onClick }) {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        onClick={onClick}
      />

      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
