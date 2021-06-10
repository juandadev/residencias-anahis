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
import Alert from '../Alert/Alert';

/**
 * Component to manage the basic CRUD actions (create, read, update, delete)
 * @param {module} //Module name
 * @param {actions} //functions to perform on module manipulation
 * @returns
 */
export default function Actions({ module, actions, id }) {
  const { state } = useContext(store);
  const { selected } = state;
  const [alert, setAlert] = useState(false);
  const [insert, setInsert] = useState({});
  const [edit, setEdit] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(0);
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

  function handleChange(e, modal) {
    const { name, value } = e.target;
    const data = {};
    data[name] = value;

    const options = {
      insert: () =>
        setInsert((state) => ({
          ...state,
          ...data,
        })),
      edit: () =>
        setEdit((state) => ({
          ...state,
          ...data,
        })),
    };

    options[modal]();
  }

  function initializeInsertData() {
    const insertData = actions?.new[1].reduce(
      (o, key) => ({ ...o, [key[1]]: '' }),
      {}
    );

    const isSelect = actions?.new[1].find((item) => item[0] === 'select');

    if (isSelect) {
      setInsert((state) => ({
        ...insertData,
        [isSelect[1]]: isSelect[3][0][0],
      }));
    } else {
      setInsert(insertData);
    }
  }

  function initializeEditData(identifier) {
    let editData = {};
    const findRecord = actions?.edit[2].find(
      (item) => item[[`id_${id}`]] === parseInt(identifier, 10)
    );

    if (!findRecord) {
      editData = actions?.edit[1].reduce(
        (acc, item) => ({ ...acc, [item[1]]: '' }),
        {}
      );
    } else {
      editData = actions?.edit[1].reduce(
        (acc, item) => ({ ...acc, [item[1]]: findRecord[`${item[1]}_${id}`] }),
        {}
      );
    }

    const isSelect = actions?.new[1].filter((item) => item[0] === 'select');
    const selectValues = isSelect.map((select) => [
      select[1],
      findRecord?.[`${select[1]}_${id}`] || findRecord?.[`fk_${select[1]}_id`],
    ]);
    const selectObject = selectValues.reduce(
      (acc, item) => ({
        ...acc,
        [item[0]]: item[1],
      }),
      {}
    );

    if (isSelect && findRecord) {
      setEdit((state) => ({
        ...editData,
        ...selectObject,
      }));
    } else {
      setEdit(editData);
    }
  }

  function verifySelected() {
    if (selected.length === 0) {
      setAlert(true);
    } else {
      setModal((state) => ({
        ...state,
        delete: true,
      }));
    }
  }

  useEffect(() => {
    initializeInsertData();
    initializeEditData();
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
            onClick={() =>
              setModal((state) => ({
                ...state,
                edit: true,
                content: actions?.edit[1],
              }))
            }
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
            onClick={verifySelected}
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

      <Modal
        show={modal.edit}
        onHide={() => {
          handleClose('edit');
          initializeEditData();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Editar ${module}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="user">
              <Form.Label>{`Selecciona al ${module} a editar:`}</Form.Label>

              <select
                name="id"
                id="id"
                className="form-select"
                onChange={(e) => {
                  initializeEditData(e.target.value);
                  setSelectedRecord(e.target.value);
                }}
              >
                <option value="default">seleccionar</option>
                {actions?.edit[2].map((item, index) => (
                  <option key={`user-option-${index}`} value={item[`id_${id}`]}>
                    {item[`name_${id}`]}
                  </option>
                ))}
              </select>
            </Form.Group>

            {actions?.edit[1].map((item, index) =>
              item[0] === 'select' ? (
                <Form.Group
                  key={`${module}-input-${index}`}
                  className="mb-3"
                  controlId={item[1]}
                >
                  <Form.Label>{item[2]}</Form.Label>

                  <select
                    name={`${item[1]}`}
                    id={`${module}-select-${item[1]}`}
                    className="form-select"
                    value={edit[item[1]]}
                    onChange={(e) =>
                      setEdit((state) => ({
                        ...state,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                    {item[3].map((option, index) => (
                      <option
                        key={`${id}-select-opt-${index}`}
                        value={option[0]}
                      >
                        {option[1]}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              ) : (
                <Form.Group
                  key={`${module}-input-${index}`}
                  className="mb-3"
                  controlId={item[1]}
                >
                  <Form.Label>{item[2]}</Form.Label>

                  <Form.Control
                    type={item[0]}
                    name={item[1]}
                    value={edit[item[1]]}
                    onChange={(e) => handleChange(e, 'edit')}
                    required
                  />
                </Form.Group>
              )
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose('edit');
              initializeEditData();
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              actions?.edit[0](selectedRecord, edit);
              initializeEditData();
              handleClose('edit');
            }}
          >
            {`Actualizar ${module}`}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modal.insert}
        onHide={() => {
          handleClose('insert');
          initializeInsertData();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Nuevo ${module}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {actions?.new[1].map((item, index) =>
              item[0] === 'select' ? (
                <Form.Group
                  key={`${module}-input-${index}`}
                  className="mb-3"
                  controlId={item[1]}
                >
                  <Form.Label>{item[2]}</Form.Label>

                  <select
                    name={`${item[1]}`}
                    id={`${module}-select-${item[1]}`}
                    className="form-select"
                    value={insert[item[1]]}
                    onChange={(e) =>
                      setInsert((state) => ({
                        ...state,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  >
                    {item[3].map((option, index) => (
                      <option
                        key={`${id}-select-opt-${index}`}
                        value={option[0]}
                      >
                        {option[1]}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              ) : (
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
                    onChange={(e) => handleChange(e, 'insert')}
                    required
                  />
                </Form.Group>
              )
            )}
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
              handleClose('insert');
            }}
          >
            {`Crear ${module}`}
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        show={alert}
        setShow={setAlert}
        type="danger"
        message={`Necesitas seleccionar uno o más ${
          module === 'proveedor' ? `${module}es` : `${module}s`
        }`}
      />
    </>
  );
}
