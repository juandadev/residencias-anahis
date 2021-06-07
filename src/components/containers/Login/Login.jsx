import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { store } from '../../../context/store';
import CookieService from '../../../utils/services/cookie';
import { loginUser, verifyToken } from '../../../utils/services/database';
import Layout from '../Layout/Layout';

export default function Login() {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: '',
  });
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const { dispatch } = useContext(store);
  const history = useHistory();

  async function handleSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === true) {
      e.stopPropagation();
      const res = await loginUser({ ...formData });

      if (res.type === 'success') {
        if (formData.remember) {
          CookieService.set('access_token', res.user.token, { path: '/' });
        } else {
          const date = new Date();
          date.setTime(date.getTime() + 60 * 24 * 60 * 1000);

          CookieService.set('access_token', res.user.token, {
            path: '/',
            expires: date,
          });
        }

        dispatch({ type: 'SESSION_START', user: res.user });
        history.push('/');
      }

      setAlert({
        show: true,
        message: res.message,
        variant: res.type,
      });
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
      remember: () =>
        setFormData((state) => ({ ...state, remember: !state.remember })),
    };

    options[name]();
  }

  useEffect(() => {
    document.title = 'Iniciar sesión | Tractores del Norte';
    verifyToken().then((res) => {
      if (res.data) {
        dispatch({ type: 'SESSION_START', user: res.data });
      }
    });
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

            <Form.Group controlId="remember">
              <Form.Check
                type="checkbox"
                name="remember"
                label="Mantener sesión iniciada"
                onClick={handleChange}
              />
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
