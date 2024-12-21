import instance from "./AxiosService";
import TokenService from "./TokenService";
import UserService from "./UserService";

const register = async (name, surname, email, password, indexNumber, stationary) => {
    return await instance.post("/auth/signup", {
        'name':name,
        'surname':surname,
        'email':email,
        'password':password,
        'indexNumber':indexNumber,
        'stationary':stationary,
        'role': "STUDENT"
    })
};

const login = async (email, password) => {
    return await instance
        .post("/auth/login", {
            'email': email,
            'password': password,
        })
        .then((response) => {
            if (response.data.token) {
                TokenService.setUser(response.data);
            }
            return response.data
        }).catch(error => {
            console.log(error)
        });
};

const logout = () => {
    TokenService.removeUser();
    UserService.removeUserData();
    window.location.reload();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;