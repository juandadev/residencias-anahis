import React, { useEffect, useState, useContext } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import { store } from "../../../context/store";
import {
  getUsers,
  insertUser,
  modifyUser,
  removeUser,
} from "../../../utils/services/database";
import { Actions, List } from "../../elements/index";

export default function users() {
  const { dispatch } = useContext(store);
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState({});

  function handleInsert(data) {
    insertUser(data).then((res) => setResponse(res));
  }

  function handleUpdate(id, data) {
    modifyUser(id, data).then((res) => setResponse(res));
  }

  function handleDelete(data) {
    Promise.resolve(data.forEach((item) => removeUser(item))).then((res) =>
      dispatch({ type: "SET_SELECTED", selected: [] })
    );
    setResponse(data);
  }

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, [response]);

  return (
    <>
      <h1>Administración de Usuarios</h1>

      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions
              module="usuario"
              id="user"
              actions={{
                new: [
                  handleInsert,
                  [
                    ["text", "name", "Nombre"],
                    ["text", "address", "Dirección"],
                    ["text", "phone", "Teléfono"],
                    ["email", "email", "Correo electrónico"],
                    ["password", "password", "Contraseña"],
                    [
                      "select",
                      "level",
                      "Nivel",
                      [
                        ["user", "usuario"],
                        ["admin", "administrador"],
                      ],
                    ],
                  ],
                ],
                delete: [handleDelete],
                edit: [
                  handleUpdate,
                  [
                    ["text", "name", "Nombre"],
                    ["text", "address", "Dirección"],
                    ["text", "phone", "Teléfono"],
                    ["email", "email", "Correo electrónico"],
                    ["password", "password", "Contraseña"],
                    [
                      "select",
                      "level",
                      "Nivel",
                      [
                        ["user", "usuario"],
                        ["admin", "administrador"],
                      ],
                    ],
                  ],
                  users,
                ],
                pdf: [
                  "#",
                  "Nombre",
                  "Dirección",
                  "Teléfono",
                  "Correo",
                  "Nivel",
                ],
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <List
              id="user"
              data={users}
              structure={{
                "Información personal": [
                  ["font-weight-bold text-capitalize", "name_user"],
                  ["text-black-50 text-capitalize", "address_user"],
                ],
                "Información de contacto": [
                  ["", "email_user"],
                  ["text-black-50", "phone_user"],
                ],
                Nivel: [["text-capitalize", "level_user"]],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
