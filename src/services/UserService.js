import instance from "./AxiosService";

const getUser = async (email) => {
    return await instance.get("/api/user/" + email).catch((error) => {
        return Promise.reject(error)
    });
}

const saveUserData = (data) => {
    localStorage.setItem("user_data", JSON.stringify(data))
}

const getUserData= () => {
    return JSON.parse(localStorage.getItem("user_data"));
}

const removeUserData =() => {
    localStorage.clear("user_data")
}

const getUsers = async (searchText) => {
    return await instance.get("/api/user/search",  {params: {
        searchText: searchText
    }}).catch((error) => {
        return Promise.reject(error)
    });
}

const getAllRoles = async () => {
    return await instance.get("/api/role/")
        .catch((error) => {
            return Promise.reject(error); // Obsługa błędów
        });
};

const changeRole = async (id, role) => {
    return await instance.post(`/api/user/changeRole/${id}/${role}`)
        .catch((error) => {
            return Promise.reject(error); // Error handling
        });
};


const UserService ={
    getUser,
    saveUserData,
    getUserData,
    removeUserData,
    getUsers,
    getAllRoles,
    changeRole
}

export default UserService