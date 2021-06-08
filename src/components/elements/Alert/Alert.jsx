import React from 'react';
import ReactDOM from 'react-dom';
import { Alert as BtAlert, Button } from 'react-bootstrap';

export default function Alert({ show, setShow, type, message }) {
  return ReactDOM.createPortal(
    <BtAlert show={show} variant={type}>
      <BtAlert.Heading>
        {(type === 'success' && '¡Éxito!') ||
          (type === 'warning' && '¡Advertencia!') ||
          (type === 'danger' && '¡Error!')}
      </BtAlert.Heading>

      <p>{message}</p>

      <hr />

      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant={`outline-${type}`}>
          Cerrar
        </Button>
      </div>
    </BtAlert>,
    document.getElementById('modal')
  );
}
