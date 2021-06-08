import React from 'react';
import { Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import CheckBox from '../CheckBox/CheckBox';

export default function List({ id, data, structure }) {
  return (
    <div className="list-container mt-3">
      <ListGroup>
        {data ? (
          data.map((item, index) => (
            <ListGroup.Item key={`${id}-${index}`} action>
              <Row>
                {[...Array(Object.keys(structure).length)].map((key, index) => (
                  <Col key={`${id}-col-${index}`}>
                    {structure[Object.keys(structure)[index]].map((data) => (
                      <p className={data[0]}>{item[data[1]]}</p>
                    ))}
                  </Col>
                ))}

                <Col
                  xs={1}
                  className="d-flex align-items-center justify-content-center"
                >
                  <CheckBox id={`${id}-select-${index}`} />
                </Col>
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
