import React, { useEffect, useState, useContext } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import { store } from "../../../context/store";
import {
  getClients,
  insertClient,
  modifyClient,
  removeClient,
} from "../../../utils/services/database";
import { Actions, List, SearchInput } from "../../elements/index";

export default function Clients() {
  const { dispatch } = useContext(store);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [response, setResponse] = useState(null);

  function handleInsert(data) {
    insertClient(data).then((res) => setResponse(res));
  }

  function handleUpdate(id, data) {
    modifyClient(id, data).then((res) => setResponse(res));
  }

  function handleDelete(data) {
    Promise.resolve(data.forEach((item) => removeClient(item))).then((res) =>
      dispatch({ type: "SET_SELECTED", selected: [] })
    );
    setResponse(data);
  }

  useEffect(() => {
    getClients().then((res) => {
      setClients(res);
      setFilteredClients(res);
    });
  }, [response]);

  return (
    <>
      <h1>Clientes</h1>
      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions
              module="cliente"
              id="client"
              actions={{
                new: [
                  handleInsert,
                  [
                    ["text", "name", "Nombre"],
                    ["text", "address", "Dirección"],
                    ["text", "phone", "Teléfono"],
                    ["email", "email", "Correo electrónico"],
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
                  ],
                  clients,
                ],
                pdf: ["#", "Nombre", "Dirección", "Teléfono", "Correo"],
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchInput
              data={clients}
              setData={setFilteredClients}
              module="client"
            />
            <List
              id="client"
              data={filteredClients}
              structure={{
                "Información personal": [
                  ["font-weight-bold text-capitalize", "name_client"],
                  ["text-black-50 text-capitalize", "address_client"],
                ],
                "Información de contacto": [
                  ["text-body", "email_client"],
                  ["text-black-50", "phone_client"],
                ],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
