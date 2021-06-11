import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { store } from "../../../context/store";
import CookieService from "../../../utils/services/cookie";

export default function Header() {
  const [name, setName] = useState("");
  const { state, dispatch } = useContext(store);
  const param = useParams();
  const { session } = state;

  function splitUserName() {
    const separatedName = session.name.split(" ");

    return `${separatedName[0]} ${separatedName[1]}`;
  }

  function handleLogOut() {
    dispatch({ type: "SESSION_END" });
    CookieService.remove("access_token");
  }

  useEffect(() => {
    document.title = `${param.tab || "Inicio"} | Tractores del Norte`;
    if (session.isLoggedIn) setName(splitUserName());
  }, [param]);

  return (
    <header className="header">
      <Navbar fixed="top">
        <Container>
          <Navbar.Brand>
            <img
              src="https://imgur.com/qpd0Dv7.png"
              width={281.7}
              height={80}
              alt="Tractores del norte logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            {session.isLoggedIn && (
              <NavDropdown
                title={name}
                id="session-menu"
                className="text-capitalize"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  <Button variant="primary">Cerrar sesión</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
