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

export const insertClient = async (data) => {
  const client = await axios
    .post(`${ENDPOINT_URL}/api/clients/`, data)
    .then((res) => res.data);

  return client.data;
};

export const modifyClient = async (id, data) => {
  const client = await axios
    .put(`${ENDPOINT_URL}/api/clients/${id}`, data)
    .then((res) => res.data);

  return client.data;
};

export const removeClient = async (id) => {
  const client = await axios
    .delete(`${ENDPOINT_URL}/api/clients/${id}`)
    .then((res) => res.data);

  return client.data;
};

// Products
export const getProducts = async () => {
  const products = await axios
    .get(`${ENDPOINT_URL}/api/products/`)
    .then((res) => res.data);

  return products.data;
};

// Vendors
export const getVendors = async () => {
  const vendors = await axios
    .get(`${ENDPOINT_URL}/api/vendors/`)
    .then((res) => res.data);

  return vendors.data;
};

export const insertVendor = async (data) => {
  const vendor = await axios
    .post(`${ENDPOINT_URL}/api/vendors/`, data)
    .then((res) => res.data);

  return vendor.data;
};

export const modifyVendor = async (id, data) => {
  const vendor = await axios
    .put(`${ENDPOINT_URL}/api/vendors/${id}`, data)
    .then((res) => res.data);

  return vendor.data;
};

export const removeVendor = async (id) => {
  const vendor = await axios
    .delete(`${ENDPOINT_URL}/api/vendors/${id}`)
    .then((res) => res.data);

  return vendor.data;
};

// Users
export const getUsers = async () => {
  const users = await axios
    .get(`${ENDPOINT_URL}/api/users/`)
    .then((res) => res.data);

  return users.data;
};

export const insertUser = async (data) => {
  const user = await axios
    .post(`${ENDPOINT_URL}/api/users/`, data)
    .then((res) => res.data);

  return user.data;
};

export const modifyUser = async (id, data) => {
  const user = await axios
    .put(`${ENDPOINT_URL}/api/users/${id}`, data)
    .then((res) => res.data);

  return user.data;
};

export const removeUser = async (id) => {
  const user = await axios
    .delete(`${ENDPOINT_URL}/api/users/${id}`)
    .then((res) => res.data);

  return user.data;
};
