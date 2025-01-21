import instance from './AxiosService';

const getAllGlobalChatMessages  = async () => {
    return await instance.get("/api/globalChat/").then(response => {
        return response.data
    }).catch((error) => {
        return Promise.reject(error)
    });
}

const GlobalChatService = {
    getAllGlobalChatMessages,
}

export default GlobalChatService