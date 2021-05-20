import React from 'react';
import { Container } from 'react-bootstrap';
import { Header, Footer } from '../../elements';

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <Container className="main">{children}</Container>

      <Footer />
    </>
  );
}
