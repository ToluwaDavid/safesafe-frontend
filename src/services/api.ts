import axios from "axios"; //Imports the axios client library, this is used to make HTTP calls easy, it is usually used for api calls backend and frontend


const API = axios.create({
     baseURL: "http://localhost:5000/api",
}); //create a configurable instance of the axios called the API

API.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
}); //So for every request add the new authorization to each request called Bearer Token 

export default API; //Export the API instance created so that other parts of the app can use it...