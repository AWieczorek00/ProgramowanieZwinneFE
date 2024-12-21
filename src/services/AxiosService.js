import axios from "axios";
import TokenService from "./TokenService";

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
    // async (err) => {
    //   const originalConfig = err.config;
    //   if (originalConfig.url !== "/auth/signin" && err.response) {
    //     if (err.response.status === 401 && !originalConfig._retry) {
    //       originalConfig._retry = true;
    //       try {
    //         let refreshToken = TokenService.getLocalRefreshToken()
    //         const rs = await instance.post("/auth/refreshtoken", {
    //           refreshToken: refreshToken,
    //         });
    //         const { accessToken } = rs.data;
    //         TokenService.updateLocalAccessToken(accessToken);
    //         return instance(originalConfig);
    //       } catch (_error) {
    //         AuthService.logout();
    //         store.dispatch({type: userActions.removeData()})
    //         window.location.href = "/Login";
    //         return Promise.reject(_error);
    //       }
    //     }
    //   }
    //   return Promise.reject(err);
    // }
  );
  export default instance;