import axios from 'axios';

const Api = axios.create({ baseURL: 'http://192.168.0.109:3000' });

export default Api;
