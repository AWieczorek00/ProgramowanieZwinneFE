import React from 'react';
import {Navigate} from "react-router-dom";
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export default function GuardedRoute({Component}) {
    const auth = UserService.getUserData() ? true : false
    return auth ? <Component /> : <Navigate to="/login" />
}