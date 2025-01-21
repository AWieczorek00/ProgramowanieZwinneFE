import axios from "axios";
import TokenService from "./TokenService";
import AuthService from "./AuthService";

const instance = axios.create({
    baseURL: "http://localhost:8080", //tu potem można dać env variable
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token){
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
        if (err.config.url !== "/auth/signin" && err.response){
            if (err.response.status === 403 && !err.config._retry){
                err.config._retry = true;
                alert(err.response.data.description)
                AuthService.logout()
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        if (err.message.includes('Network Error') || err.code === 'ERR_CONNECTION_RESET'){
            return Promise.reject({
                'response':{
                    'data': {
                        'description': "Network Error"
                        }
                    }
                })
        }

        return Promise.reject(err)
    }
  );
  export default instance;