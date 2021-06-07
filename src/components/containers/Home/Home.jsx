import React, { useContext } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { store } from '../../../context/store';
import Layout from '../Layout/Layout';

function Home() {
  const history = useHistory();
  const { state } = useContext(store);
  const { session } = state;

  function handleTabUrl(tab) {
    history.push(`/dashboard/${tab}`);
  }

  return (
    <Layout>
      <Tab.Container id="menu" defaultActiveKey="profile">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item onClick={() => handleTabUrl('Perfil')}>
                <Nav.Link eventKey="profile">
                  <i className="fas fa-user" /> Perfil
                </Nav.Link>
              </Nav.Item>

              <Nav.Item onClick={() => handleTabUrl('Clientes')}>
                <Nav.Link eventKey="clients">
                  <i className="fas fa-users" /> Clientes
                </Nav.Link>
              </Nav.Item>

              <Nav.Item onClick={() => handleTabUrl('Productos')}>
                <Nav.Link eventKey="products">
                  <i className="fas fa-box" /> Productos
                </Nav.Link>
              </Nav.Item>

              <Nav.Item onClick={() => handleTabUrl('Proveedores')}>
                <Nav.Link eventKey="vendors">
                  <i className="fas fa-shipping-fast" /> Proveedores
                </Nav.Link>
              </Nav.Item>

              {session.level === 'admin' && (
                <Nav.Item onClick={() => handleTabUrl('Usuarios')}>
                  <Nav.Link eventKey="users">
                    <i className="fas fa-users-cog" /> Usuarios
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">Perfil</Tab.Pane>

              <Tab.Pane eventKey="clients">Clientes</Tab.Pane>

              <Tab.Pane eventKey="products">Productos</Tab.Pane>

              <Tab.Pane eventKey="vendors">Proveedores</Tab.Pane>

              <Tab.Pane eventKey="users">Usuarios</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Layout>
  );
}

export default Home;
