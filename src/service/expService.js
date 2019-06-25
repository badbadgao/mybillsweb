import fetchApi from './fetchApi';

const EXP_HOST_NAME = "http://localhost:3003";

export const getAbout = () => fetchApi(EXP_HOST_NAME).get('/about');

export const sendEmailConfirmation = (bill) => fetchApi(EXP_HOST_NAME).post('/email', bill);