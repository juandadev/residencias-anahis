import React from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

/**
 * Component to manage the basic CRUD actions (create, read, update, delete)
 * @param {module} //Module name
 * @param {actions} //functions to perform on module manipulation
 * @returns
 */
export default function Actions({ module, actions }) {
  return (
    <>
      <ButtonGroup aria-label="Crud buttons" className="mr-2">
        <OverlayTrigger
          key="new"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Agregar {module}</Tooltip>}
        >
          <Button variant="secondary" onClick={actions.new}>
            <i className="fas fa-plus" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="edit"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Editar {module}</Tooltip>}
        >
          <Button variant="secondary" onClick={actions.edit}>
            <i className="fas fa-edit" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="delete"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Eliminar {module}</Tooltip>}
        >
          <Button variant="secondary" onClick={actions.delete}>
            <i className="fas fa-trash" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>

      <ButtonGroup aria-label="Export buttons">
        <OverlayTrigger
          key="pdf"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Exportar archivo PDF</Tooltip>}
        >
          <Button variant="pdf" onClick={actions.pdf}>
            <i className="fas fa-file-pdf" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="excel"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Exportar archivo Excel</Tooltip>}
        >
          <Button variant="excel" onClick={actions.excel}>
            <i className="fas fa-file-excel" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </>
  );
}
