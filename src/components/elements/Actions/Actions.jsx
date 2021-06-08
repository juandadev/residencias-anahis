import React, { useEffect, useState, useContext } from 'react';
import {
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
} from 'react-bootstrap';
import { store } from '../../../context/store';

/**
 * Component to manage the basic CRUD actions (create, read, update, delete)
 * @param {module} //Module name
 * @param {actions} //functions to perform on module manipulation
 * @returns
 */
export default function Actions({ module, actions }) {
  const { state } = useContext(store);
  const { selected } = state;
  const [insert, setInsert] = useState({});
  const [modal, setModal] = useState({
    insert: false,
    delete: false,
  });

  function handleClose(modal) {
    const data = {};
    data[modal] = false;

    setModal((state) => ({
      ...state,
      ...data,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const data = {};
    data[name] = value;

    setInsert((state) => ({
      ...state,
      ...data,
    }));
  }

  function initializeInsertData() {
    const insertData = actions?.new[1].reduce(
      (o, key) => ({ ...o, [key[1]]: '' }),
      {}
    );
    setInsert(insertData);
  }

  useEffect(() => {
    initializeInsertData();
  }, []);

  return (
    <>
      <ButtonGroup aria-label="Crud buttons" className="mr-2">
        <OverlayTrigger
          key="new"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Agregar {module}</Tooltip>}
        >
          <Button
            variant="secondary"
            onClick={() =>
              setModal((state) => ({
                ...state,
                insert: true,
                content: actions?.new[1],
              }))
            }
            disabled={!actions?.new}
          >
            <i className="fas fa-plus" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="edit"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Editar {module}</Tooltip>}
        >
          <Button
            variant="secondary"
            onClick={actions?.edit}
            disabled={!actions?.edit}
          >
            <i className="fas fa-edit" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="delete"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Eliminar {module}</Tooltip>}
        >
          <Button
            variant="secondary"
            onClick={() =>
              setModal((state) => ({
                ...state,
                delete: true,
              }))
            }
            disabled={!actions?.delete}
          >
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
          <Button variant="pdf" onClick={actions?.pdf} disabled={!actions?.pdf}>
            <i className="fas fa-file-pdf" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          key="excel"
          placement="top"
          overlay={<Tooltip id="tooltip-top">Exportar archivo Excel</Tooltip>}
        >
          <Button
            variant="excel"
            onClick={actions?.excel}
            disabled={!actions?.excel}
          >
            <i className="fas fa-file-excel" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>

      <Modal show={modal.delete} onHide={() => handleClose('delete')}>
        <Modal.Header closeButton>
          <Modal.Title>{`Eliminar ${module}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {`¿Estás seguro que deseas eliminar a ${selected.length} ${
            selected.length > 1 ? `${module}s` : module
          }?`}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose('delete')}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              actions?.delete[0](selected);
              handleClose('delete');
            }}
          >
            {`Eliminar ${module}(s)`}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modal.insert} onHide={() => handleClose('insert')}>
        <Modal.Header closeButton>
          <Modal.Title>{`Nuevo ${module}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {actions?.new[1].map((item, index) => (
              <Form.Group
                key={`${module}-input-${index}`}
                className="mb-3"
                controlId={item[1]}
              >
                <Form.Label>{item[2]}</Form.Label>

                <Form.Control
                  type={item[0]}
                  name={item[1]}
                  value={insert[item[1]]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose('insert')}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              actions?.new[0](insert);
              initializeInsertData();
            }}
          >
            {`Crear ${module}`}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
