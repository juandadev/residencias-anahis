import React, { useState, useEffect } from 'react';

import { Form, Button, Card } from 'react-bootstrap';
import Layout from '../Layout/Layout';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const data = {};
    data[name] = value;

    const options = {
      email: () => setFormData((state) => ({ ...state, ...data })),
      password: () => setFormData((state) => ({ ...state, ...data })),
    };

    options[name]();
  }

  useEffect(() => {
    document.title = 'Iniciar sesión | Tractores del Norte';
  }, []);

  return (
    <Layout>
      <Card>
        <Card.Header as="h5">Iniciar Sesión</Card.Header>

        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Correo electrónico</Form.Label>

              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Escribe tu correo"
                value={formData.email}
                onChange={handleChange}
              />

              <Form.Control.Feedback type="invalid">
                Debes introducir un correo válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>

              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Escribe tu contraseña"
                value={formData.password}
                onChange={handleChange}
              />

              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}
