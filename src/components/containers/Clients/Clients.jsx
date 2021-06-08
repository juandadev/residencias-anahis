import React, { useEffect, useState } from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { getClients } from '../../../utils/services/database';
import { Actions, List } from '../../elements/index';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then((res) => setClients(res));
  }, []);

  return (
    <>
      <h1>Clientes</h1>

      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions module="clientes" />
          </Col>
        </Row>

        <Row>
          <Col>
            <List
              id="client"
              data={clients}
              structure={{
                'Información personal': [
                  ['font-weight-bold text-capitalize', 'name_client'],
                  ['text-black-50 text-capitalize', 'address_client'],
                ],
                'Información de contacto': [
                  ['', 'email_client'],
                  ['text-black-50', 'phone_client'],
                ],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
