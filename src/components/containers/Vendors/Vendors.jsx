import React, { useEffect, useState, useContext } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import { store } from "../../../context/store";
import {
  getVendors,
  insertVendor,
  modifyVendor,
  removeVendor,
} from "../../../utils/services/database";
import { Actions, List, SearchInput } from "../../elements/index";

export default function Vendors() {
  const { dispatch } = useContext(store);
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [response, setResponse] = useState({});

  function handleInsert(data) {
    insertVendor(data).then((res) => setResponse(res));
  }

  function handleUpdate(id, data) {
    modifyVendor(id, data).then((res) => setResponse(res));
  }

  function handleDelete(data) {
    Promise.resolve(data.forEach((item) => removeVendor(item))).then((res) =>
      dispatch({ type: "SET_SELECTED", selected: [] })
    );

    setResponse(data);
  }

  useEffect(() => {
    getVendors().then((res) => {
      setVendors(res);
      setFilteredVendors(res);
    });
  }, [response]);

  return (
    <>
      <h1>Proveedores</h1>
      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions
              module="proveedor"
              id="vendor"
              actions={{
                new: [
                  handleInsert,
                  [
                    ["text", "name", "Nombre"],
                    ["text", "social", "Razón social"],
                    ["text", "address", "Dirección"],
                    ["text", "phone", "Teléfono"],
                    ["text", "bank", "Cuenta bancaria"],
                  ],
                ],
                delete: [handleDelete],
                edit: [
                  handleUpdate,
                  [
                    ["text", "name", "Nombre"],
                    ["text", "social", "Razón social"],
                    ["text", "address", "Dirección"],
                    ["text", "phone", "Teléfono"],
                    ["text", "bank", "Cuenta bancaria"],
                  ],
                  vendors,
                ],
                pdf: [
                  "#",
                  "Nombre",
                  "Razón social",
                  "Teléfono",
                  "Dirección",
                  "Cuenta bancaria",
                ],
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchInput
              data={vendors}
              setData={setFilteredVendors}
              module="vendor"
            />
            <List
              id="vendor"
              data={filteredVendors}
              structure={{
                Nombre: [
                  ["font-weight-bold text-capitalize", "name_vendor"],
                  ["text-black-50 text-capitalize", "social_vendor"],
                ],
                "Información de contacto": [
                  ["text-capitalize", "address_vendor"],
                  ["text-black-50", "phone_vendor"],
                ],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
