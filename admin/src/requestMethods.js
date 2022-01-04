import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/"; 
//we will fetch token from local storage 
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
//first we must jsonify the whole onject then jsonify again the specifc property in the object

export const publicRequest = axios.create({
    baseURL: BASE_URL,
}); 

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN} `},
});  