import React, { useEffect, useState } from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { getVendors } from '../../../utils/services/database';
import { Actions, List } from '../../elements/index';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors().then((res) => setVendors(res));
  }, []);

  return (
    <>
      <h1>Proveedores</h1>

      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions module="proveedor" />
          </Col>
        </Row>

        <Row>
          <Col>
            <List
              id="vendor"
              data={vendors}
              structure={{
                Nombre: [
                  ['font-weight-bold text-capitalize', 'name_vendor'],
                  ['text-black-50 text-capitalize', 'social_vendor'],
                ],
                'Información de contacto': [
                  ['text-capitalize', 'address_vendor'],
                  ['text-black-50', 'phone_vendor'],
                ],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
