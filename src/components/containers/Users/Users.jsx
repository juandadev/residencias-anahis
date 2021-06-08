import React, { useEffect, useState } from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { getUsers } from '../../../utils/services/database';
import { Actions, List } from '../../elements/index';

export default function users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  return (
    <>
      <h1>Administración de Usuarios</h1>

      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions module="usuario" />
          </Col>
        </Row>

        <Row>
          <Col>
            <List
              id="user"
              data={users}
              structure={{
                'Información personal': [
                  ['font-weight-bold text-capitalize', 'name_user'],
                  ['text-black-50 text-capitalize', 'address_user'],
                ],
                'Información de contacto': [
                  ['', 'email_user'],
                  ['text-black-50', 'phone_user'],
                ],
                Nivel: [['text-capitalize', 'level_user']],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
