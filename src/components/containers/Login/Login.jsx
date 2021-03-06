import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { store } from "../../../context/store";
import CookieService from "../../../utils/services/cookie";
import { loginUser, verifyToken } from "../../../utils/services/database";
import Layout from "../Layout/Layout";
import CheckBox from "../../elements/CheckBox/CheckBox";

export default function Login() {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [validated, setValidated] = useState(false);
  const { dispatch } = useContext(store);

  async function handleSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === true) {
      e.stopPropagation();
      const res = await loginUser({ ...formData });

      if (res.type === "success") {
        if (formData.remember) {
          CookieService.set("access_token", res.user.token, { path: "/" });
        } else {
          const date = new Date();
          date.setTime(date.getTime() + 60 * 24 * 60 * 1000);

          CookieService.set("access_token", res.user.token, {
            path: "/",
            expires: date,
          });
        }

        dispatch({
          type: "SESSION_START",
          user: {
            id: res.user.id_user,
            name: res.user.name_user,
            email: res.user.email_user,
            level: res.user.level_user,
          },
        });
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
    document.title = "Iniciar sesi??n | Tractores del Norte";
    verifyToken().then((res) => {
      if (res.data) {
        dispatch({ type: "SESSION_START", user: res.data });
      }
    });
  }, []);

  return (
    <Layout>
      <Card>
        <Card.Header as="h5">Iniciar Sesi??n</Card.Header>

        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Correo electr??nico</Form.Label>

              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Escribe tu correo"
                value={formData.email}
                onChange={handleChange}
              />

              <Form.Control.Feedback type="invalid">
                Debes introducir un correo v??lido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contrase??a</Form.Label>

              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Escribe tu contrase??a"
                value={formData.password}
                onChange={handleChange}
              />

              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="remember">
              <CheckBox
                id="remember"
                label="Mantener sesi??n iniciada"
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
                    {alert.variant === "danger"
                      ? "Error al iniciar sesi??n"
                      : "????xito!"}
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
