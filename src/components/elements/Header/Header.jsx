import React, { useContext, useEffect } from 'react';
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { store } from '../../../context/store';

export default function Header() {
  const { state } = useContext(store);
  const param = useParams();
  const { session, loading } = state;

  function splitUserName() {
    const separatedName = session.name.split(' ');

    return `${separatedName[0]} ${separatedName[1]}`;
  }

  useEffect(() => {
    document.title = `${param.tab || 'Inicio'} | Tractores del Norte`;
  }, [loading, param]);

  return (
    <header className="header">
      <Navbar fixed="top">
        <Container>
          <Navbar.Brand>
            <img
              src="http://tractoresdelnorte.com/images/Logos/logoTNO.png"
              width={281.7}
              height={80}
              alt="Tractores del norte logo"
            />
          </Navbar.Brand>

          {!loading && (
            <NavDropdown title={splitUserName()} id="session-menu">
              <NavDropdown.Divider />

              <NavDropdown.Item>
                <Button variant="primary">Cerrar sesión</Button>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Container>
      </Navbar>
    </header>
  );
}
