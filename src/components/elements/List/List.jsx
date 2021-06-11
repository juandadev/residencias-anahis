import React, { useState, useContext, useEffect } from "react";
import { Badge, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { store } from "../../../context/store";

export default function List({ id, data, structure }) {
  const [selected, setSelected] = useState([]);
  const { dispatch } = useContext(store);

  function handleSelected(item) {
    setSelected((state) => {
      if (state.find((x) => x === item[`id_${id}`])) {
        const index = state.indexOf(item[`id_${id}`]);
        const oldState = state;

        oldState.splice(index, 1);
        return [...oldState];
      }
      return [...state, item[`id_${id}`]];
    });
  }

  function handleActive(key) {
    const exists = selected.filter((item) => item === key);

    return exists.length;
  }

  useEffect(() => {
    dispatch({ type: "SET_SELECTED", selected });
  }, [selected, data]);

  return (
    <div className="list-container mt-3">
      <Row className="list-headers text-black-50">
        {[...Array(Object.keys(structure).length)].map((key, index) => (
          <Col key={`${id}-header-${index}`}>
            {Object.keys(structure)[index]}
          </Col>
        ))}
      </Row>
      <ListGroup>
        {data.length !== 0 ? (
          data.map((item, index) => (
            <ListGroup.Item
              key={`${id}-${index}`}
              action
              active={handleActive(item[`id_${id}`])}
              onClick={() => handleSelected(item)}
            >
              <Row>
                {[...Array(Object.keys(structure).length)].map((key, index) => (
                  <Col key={`${id}-col-${index}`}>
                    {structure[Object.keys(structure)[index]].map(
                      (data, index) =>
                        (data[0] === "badge" && (
                          <Badge
                            key={`${id}-badge-${index}`}
                            variant={item[data[1]]}
                          >
                            {(item[data[1]] === "success" &&
                              "No muy solicitado") ||
                              (item[data[1]] === "warning" &&
                                "Menos solicitado") ||
                              (item[data[1]] === "danger" && "Solicitado")}
                          </Badge>
                        )) ||
                        (data[1].includes("store") && (
                          <p key={`${id}-text-${index}`} className={data[0]}>
                            {(item[data[1]] === 1 && "delicias") ||
                              (item[data[1]] === 2 && "jiménez") ||
                              (item[data[1]] === 3 && "cuauhtémoc") ||
                              (item[data[1]] === 4 && "casas grandes") ||
                              (item[data[1]] === 5 && "torreón") ||
                              (item[data[1]] === 6 && "durango")}
                          </p>
                        )) ||
                        (data[0] && (
                          <p key={`${id}-text-${index}`} className={data[0]}>
                            {item[data[1]]}
                          </p>
                        ))
                    )}
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}
