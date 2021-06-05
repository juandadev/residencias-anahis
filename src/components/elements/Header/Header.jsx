import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <header className="header">
      <Navbar fixed="top">
        <Container>
          <Link to="/">
            <div className="navbar-brand">
              <img
                src="http://tractoresdelnorte.com/images/Logos/logoTNO.png"
                width={281.7}
                height={80}
                alt="Tractores del norte logo"
              />
            </div>
          </Link>
        </Container>
      </Navbar>
    </header>
  );
}
