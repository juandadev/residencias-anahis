import React, { useEffect, useState, useContext } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import {
  getVendors,
  getProducts,
  getDetailedProducts,
  insertProduct,
  modifyProduct,
  removeProduct,
} from "../../../utils/services/database";
import { store } from "../../../context/store";
import { Actions, List, SearchInput } from "../../elements/index";

export default function products() {
  const { dispatch } = useContext(store);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [detailedProducts, setDetailedProducts] = useState([]);
  const [response, setResponse] = useState(null);

  function handleVendors() {
    getVendors().then((res) => setVendors(res));
  }

  function handleInsert(data) {
    insertProduct(data).then((res) => setResponse(res));
  }

  function handleUpdate(id, data) {
    modifyProduct(id, data).then((res) => setResponse(res));
  }

  function handleDelete(data) {
    Promise.resolve(data.forEach((item) => removeProduct(item))).then((res) =>
      dispatch({ type: "SET_SELECTED", selected: [] })
    );
    setResponse(data);
  }

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
    getDetailedProducts().then((res) => {
      setFilteredProducts(res);
      setDetailedProducts(res);
    });
    handleVendors();
  }, [response]);

  return (
    <>
      <h1>Productos</h1>
      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions
              module="producto"
              id="product"
              actions={{
                new: [
                  handleInsert,
                  [
                    ["text", "key", "Clave"],
                    ["text", "name", "Nombre"],
                    [
                      "select",
                      "category",
                      "Categoría",
                      [
                        ["1", "recepción de compra"],
                        ["2", "transferencia de orden abierta"],
                        ["3", "estatus de inventario"],
                        ["4", "transferencia de salida"],
                        ["5", "transferencia de entrada"],
                        ["6", "transferencia de producto entrante"],
                        ["7", "mantenimiento de óptimos"],
                      ],
                    ],
                    [
                      "select",
                      "store",
                      "Almacén",
                      [
                        ["1", "delicias"],
                        ["2", "jiménez"],
                        ["3", "cuauhtémoc"],
                        ["4", "casas grandes"],
                        ["5", "torreón"],
                        ["6", "durango"],
                      ],
                    ],
                    ["text", "stock", "Existencias"],
                    [
                      "select",
                      "vendor",
                      "Proveedor",
                      [
                        ...vendors.map((vendor) => [
                          vendor.id_vendor,
                          vendor.name_vendor,
                        ]),
                      ],
                    ],
                    [
                      "select",
                      "state",
                      "Estado",
                      [
                        ["success", "no muy solicitado"],
                        ["warning", "menos solicitado"],
                        ["danger", "solicitado"],
                      ],
                    ],
                  ],
                ],
                delete: [handleDelete],
                edit: [
                  handleUpdate,
                  [
                    ["text", "key", "Clave"],
                    ["text", "name", "Nombre"],
                    [
                      "select",
                      "category",
                      "Categoría",
                      [
                        ["1", "recepción de compra"],
                        ["2", "transferencia de orden abierta"],
                        ["3", "estatus de inventario"],
                        ["4", "transferencia de salida"],
                        ["5", "transferencia de entrada"],
                        ["6", "transferencia de producto entrante"],
                        ["7", "mantenimiento de óptimos"],
                      ],
                    ],
                    [
                      "select",
                      "store",
                      "Almacén",
                      [
                        ["1", "delicias"],
                        ["2", "jiménez"],
                        ["3", "cuauhtémoc"],
                        ["4", "casas grandes"],
                        ["5", "torreón"],
                        ["6", "durango"],
                      ],
                    ],
                    ["text", "stock", "Existencias"],
                    [
                      "select",
                      "vendor",
                      "Proveedor",
                      [
                        ...vendors.map((vendor) => [
                          vendor.id_vendor,
                          vendor.name_vendor,
                        ]),
                      ],
                    ],
                    [
                      "select",
                      "state",
                      "Estado",
                      [
                        ["success", "no muy solicitado"],
                        ["warning", "menos solicitado"],
                        ["danger", "solicitado"],
                      ],
                    ],
                  ],
                  products,
                ],
                pdf: [
                  [
                    "#",
                    "Nombre",
                    "Categoría",
                    "Almacén",
                    "Existencias",
                    "Proveedor",
                    "Estatus",
                  ],
                  vendors,
                ],
                excel: detailedProducts,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchInput
              data={detailedProducts}
              setData={setFilteredProducts}
              module="product"
            />
            <List
              id="product"
              data={filteredProducts}
              structure={{
                Producto: [
                  ["font-weight-bold text-capitalize", "name_product"],
                  ["text-black-50", "key_product"],
                ],
                "Categoría y proveedor": [
                  ["font-weight-bold text-capitalize", "category_product"],
                  ["text-black-50 text-capitalize", "vendor_product"],
                ],
                Existencias: [
                  ["text-body", "stock_product"],
                  ["text-capitalize text-black-50", "store_product"],
                ],
                Estatus: [["badge", "state_product"]],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
