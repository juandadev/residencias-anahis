import React, { useEffect, useState, useContext } from 'react';
import { Col, Image, Jumbotron, Row } from 'react-bootstrap';
import { store } from '../../../context/store';
import { getUser } from '../../../utils/services/database';

export default function Profile() {
  const { state } = useContext(store);
  const { session } = state;
  const [profileData, setProfileData] = useState({
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    getUser(session.id).then((res) =>
      setProfileData({
        id: res.id_user,
        name: res.name_user,
        address: res.address_user,
        phone: res.phone_user,
        email: res.email_user,
      })
    );
  }, []);

  return (
    <>
      <h1>Perfil de usuario</h1>

      <Jumbotron>
        <Row>
          <Col
            md={9}
            xs={12}
            className="d-flex align-items-center justify-content-center justify-content-md-left"
          >
            <h2>Datos personales</h2>
          </Col>

          <Col
            md={3}
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Image
              width={100}
              height={100}
              src={
                profileData.image ||
                'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg'
              }
              alt={`Foto de perfil de ${profileData.name}`}
              roundedCircle
            />

            <p className="h5 text-center">{profileData.name}</p>
          </Col>
        </Row>

        <Row>
          <Col xs={3}>
            <p className="text-black-50">ID</p>
            <p className="text-black-50">Direccion</p>
            <p className="text-black-50">Teléfono</p>
            <p className="text-black-50">Correo electrónico</p>
          </Col>

          <Col xs={9}>
            <p className="text-left">{profileData.id}</p>
            <p className="text-left">{profileData.address}</p>
            <p className="text-left">{profileData.phone}</p>
            <p className="text-left">{profileData.email}</p>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
