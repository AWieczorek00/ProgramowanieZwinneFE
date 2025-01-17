import instance from "./AxiosService";

const getUser = async (email) => {
    return await instance.get("/api/user/" + email);
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

const getUsers = (searchText) => {
    return instance.get("/api/user/search",  {params: {
        searchText: searchText
    }})
}


const UserService ={
    getUser,
    saveUserData,
    getUserData,
    removeUserData,
    getUsers,
}

export default UserService