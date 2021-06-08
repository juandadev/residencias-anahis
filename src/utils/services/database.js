import axios from 'axios';
import CookieService from './cookie';

const ENDPOINT_URL = 'http://localhost:3000';

export const verifyToken = async () => {
  const token = CookieService.get('access_token');
  const decode = await axios
    .get(`${ENDPOINT_URL}/api/users/decode/${token}`)
    .then((res) => res.data);

  return decode;
};

export const loginUser = async (credentials) => {
  const url = `${ENDPOINT_URL}/api/users/`;
  const users = await axios.get(url).then(({ data }) => data.data);
  const userExists = users.filter(
    (user) => user.email_user === credentials.email
  );

  if (userExists.length !== 0) {
    const userAuthorized = await axios
      .post(`${ENDPOINT_URL}/api/users/verify/${userExists[0].id_user}`, {
        password: credentials.password,
      })
      .then(({ data }) => data.data);

    if (userAuthorized)
      return {
        type: 'success',
        message: '¡Inicio de sesión exitoso!',
        user: userAuthorized,
      };

    return {
      type: 'danger',
      message: 'La contraseña introducida es incorrecta',
    };
  }

  return {
    type: 'danger',
    message: 'No existe ningún usuario registrado con el correo proporcionado',
  };
};

export const getUser = async (id) => {
  const user = await axios
    .get(`${ENDPOINT_URL}/api/users/${id}`)
    .then((res) => res.data);

  return user.data[0];
};

// Clients
export const getClients = async () => {
  const clients = await axios
    .get(`${ENDPOINT_URL}/api/clients/`)
    .then((res) => res.data);

  return clients.data;
};
