import React from 'react';
import { Badge, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import CheckBox from '../CheckBox/CheckBox';

export default function List({ id, data, structure }) {
  return (
    <div className="list-container mt-3">
      <Row className="list-headers text-black-50">
        {[...Array(Object.keys(structure).length)].map((key, index) => (
          <Col key={`${id}-header-${index}`}>
            {Object.keys(structure)[index]}
          </Col>
        ))}

        <Col xs={1} />
      </Row>

      <ListGroup>
        {data ? (
          data.map((item, index) => (
            <ListGroup.Item key={`${id}-${index}`} action>
              <Row>
                {[...Array(Object.keys(structure).length)].map((key, index) => (
                  <Col key={`${id}-col-${index}`}>
                    {structure[Object.keys(structure)[index]].map(
                      (data, index) =>
                        // TODO: Change data properties for objects instead of arrays
                        data[0] === 'badge' ? (
                          <Badge
                            key={`${id}-badge-${index}`}
                            variant={item[data[1]]}
                          >
                            {(item[data[1]] === 'success' &&
                              'No muy solicitado') ||
                              (item[data[1]] === 'warning' &&
                                'Menos solicitado') ||
                              (item[data[1]] === 'danger' && 'Solicitado')}
                          </Badge>
                        ) : (
                          <p key={`${id}-text-${index}`} className={data[0]}>
                            {item[data[1]]}
                          </p>
                        )
                    )}
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
