import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:3000';

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
      return ['success', '¡Inicio de sesión exitoso!', userExists[0]];

    return ['danger', 'La contraseña introducida es incorrecta'];
  }

  return [
    'danger',
    'No existe ningún usuario registrado con el correo proporcionado',
  ];
};
