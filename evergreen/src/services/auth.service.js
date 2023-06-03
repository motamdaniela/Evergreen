/*
The service provides three important methods with the help of FETCH 
for HTTP requests & reponses:
    login(): POST {username, password} & save JWT to Local Storage
    logout(): remove JWT from Local Storage
    register(): POST {username, email, password} 
*/

// import axios from 'axios';
// const API_URL = 'http://localhost:8080/api/';
import API_URL from './config.js'

export const AuthService = {
    authHeader() {
        // checks Local Storage for user item
        let token = JSON.parse(localStorage.getItem('loggedUser'));
    
        // if there is a logged in user with accessToken (JWT)
        if (token) {
            // return HTTP authorization header for Node.js Express back-end
            return {
                'Content-Type': 'application/json',
                'x-access-token': token
            };
        } else {
            return { 'Content-Type': 'application/json' }; //otherwise, return an empty object
        }
    },


    handleResponses(code) {
        let message = "";
        switch (code) {
            case 400:
                message = "Username already exists.";
                break;
            case 401:
                message = "Wrong credentials";
                break;
            case 404:
                message = "User not found";
                break;
            default:
                message = "Unkown message";
                break;
        }
        return message;
    }

}

export default AuthService;