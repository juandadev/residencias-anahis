import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <header className="header">
      <Navbar fixed="top">
        <Container>
          <Link to="/">
            <div className="navbar-brand">Tractores del Norte</div>
          </Link>
        </Container>
      </Navbar>
    </header>
  );
}
