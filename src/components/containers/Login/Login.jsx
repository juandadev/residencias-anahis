import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sessionStart } from '../../../context/actions';
import { loginUser } from '../../../utils/services/database';
import Layout from '../Layout/Layout';

function Login({ sessionStart }) {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: '',
  });
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === true) {
      e.stopPropagation();
      const res = await loginUser({ ...formData });

      if (res[0] === 'success') {
        sessionStart({
          id: res[2].id_user,
          name: res[2].name_user,
          email: res[2].email_user,
          level: res[2].level_user,
        });
      } else {
        setAlert({
          show: true,
          message: res[1],
          variant: res[0],
        });
      }
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

            <Form.Row>
              {alert.show && (
                <Alert
                  variant={alert.variant}
                  onClose={() =>
                    setAlert((state) => ({ ...state, show: false }))
                  }
                  dismissible
                >
                  <Alert.Heading>
                    {alert.variant === 'danger'
                      ? 'Error al iniciar sesión'
                      : '¡Éxito!'}
                  </Alert.Heading>

                  <p>{alert.message}</p>
                </Alert>
              )}
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

const mapDispatchToProps = { sessionStart };

export default connect(null, mapDispatchToProps)(Login);
