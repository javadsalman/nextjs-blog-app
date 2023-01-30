import axios from 'axios';

let baseURL = 'http://localhost:8000/api/';

// let baseURL;
// if (process.env.NODE_ENV === 'production') {
//     baseURL = 'https://mydomain.com/api/';
// } else {
//     baseURL = 'http://localhost:8000/api/';
// }

const iaxios = axios.create({
    baseURL,
});

export default iaxios;