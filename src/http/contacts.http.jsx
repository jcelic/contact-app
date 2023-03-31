import axios from 'axios';
import { API_HOST } from 'constants/api.constants';

// GET ALL CONTACTS ON APP LOAD
export const getContacts = async () => {
  const { data } = await axios.get(`${API_HOST}/contacts`);

  return data;
};

// GET SINGLE CONTACT FOR VIEW PAGE
export const getSingleContact = async id => {
  const { data } = await axios.get(`${API_HOST}/contacts/${id}`);

  return data;
};

// DELETE CONTACT
export const deleteContact = async id => {
  await axios.delete(`${API_HOST}/contacts/${id}`);
};

// ADD CONTACT
export const addContact = async contact => {
  const { data } = await axios.post(`${API_HOST}/contacts/`, contact);

  return data;
};

// REPLACE CONTACT
export const replaceContact = async (id, contact) => {
  const { data } = await axios.put(`${API_HOST}/contacts/${id}`, contact);

  return data;
};

// UPDATE CONTACT
export const updateContact = async (id, field) => {
  const { data } = await axios.patch(`${API_HOST}/contacts/${id}`, field);

  return data;
};
