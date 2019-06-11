import fetchApi from './fetchApi';

const EXP_HOST_NAME = "http://localhost:3000";

export const getAbout = () => fetchApi(EXP_HOST_NAME).get('/about');